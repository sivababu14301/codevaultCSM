const User = require('../models/User');
const Setting = require('../models/Setting');
const generateToken = require('../utils/generateToken');
const crypto = require('crypto');
const mongoose = require('mongoose');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(500).json({ message: 'Database connection failed. Please verify MONGO_URI credentials in server/.env' });
  }

  const { name, email, password, rememberAccessKey } = req.body;

  if (!name || !email || !password || !rememberAccessKey) {
    return res.status(400).json({ message: 'Please provide name, email, password, and remember access key' });
  }

  try {
    const normalizedEmail = email.trim().toLowerCase();
    
    // Validate that someone isn't trying to register the admin email

    if (normalizedEmail === 'codevaultadmin@gmail.com') {
      return res.status(400).json({ message: 'Cannot register with this email' });
    }

    const userExists = await User.findOne({ email: new RegExp(`^${normalizedEmail}$`, 'i') });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    let baseUsername = (name ? name.toLowerCase().replace(/[^a-z0-9]/g, '') : '') || normalizedEmail.split('@')[0].replace(/[^a-z0-9]/g, '') || 'user';
    let username = baseUsername;
    let count = 1;
    while (await User.findOne({ username })) {
      username = `${baseUsername}${Math.floor(100 + Math.random() * 900)}`;
      count++;
      if (count > 5) {
        username = `${baseUsername}_${Date.now().toString().slice(-4)}`;
        break;
      }
    }

    // Get Global Admin Defaults
    let defaultLanguage = 'javascript';
    let defaultTheme = 'light';
    
    const settings = await Setting.find({});
    const langSetting = settings.find(s => s.key === 'defaultProgrammingLanguage');
    const themeSetting = settings.find(s => s.key === 'defaultTheme');
    
    if (langSetting) {
      defaultLanguage = langSetting.value;
    }
    if (themeSetting) {
      defaultTheme = themeSetting.value;
    }

    const user = await User.create({
      name,
      email: normalizedEmail,
      username,
      password,
      role: 'user', // Always default to user, never admin
      defaultProgrammingLanguage: defaultLanguage,
      defaultTheme: defaultTheme,
      rememberAccessKey: crypto.createHash('sha256').update(rememberAccessKey).digest('hex'),
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        bio: user.bio,
        location: user.location,
        website: user.website,
        avatarUrl: user.avatarUrl,
        skills: user.skills,
        pinnedSnippets: user.pinnedSnippets,
        role: user.role,
        status: user.status,
        defaultProgrammingLanguage: user.defaultProgrammingLanguage,
        defaultTheme: user.defaultTheme,
        token: generateToken(user._id, user.email, user.role),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Registration error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email or username already exists' });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    if (error.name === 'MongoNetworkError' || error.name === 'MongoServerSelectionError') {
      return res.status(500).json({ message: 'Unable to connect to database. Please check connection.' });
    }
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const normalizedEmail = email.trim().toLowerCase();

    // Admin login bypass check
    if (normalizedEmail === 'codevaultadmin@gmail.com') {
      if (password === 'admin123') {
        let adminUser = await User.findOne({ email: new RegExp(`^${normalizedEmail}$`, 'i') });
        
        if (!adminUser) {
          adminUser = await User.create({
            name: 'Admin',
            email: 'codevaultadmin@gmail.com',
            password: 'admin123',
            role: 'admin'
          });
        } else if (adminUser.role !== 'admin') {
          adminUser.role = 'admin';
          await adminUser.save();
        }

        return res.json({
          _id: adminUser._id,
          name: adminUser.name,
          email: adminUser.email,
          username: adminUser.username,
          bio: adminUser.bio,
          location: adminUser.location,
          website: adminUser.website,
          avatarUrl: adminUser.avatarUrl,
          skills: adminUser.skills,
          pinnedSnippets: adminUser.pinnedSnippets,
          role: 'admin',
          status: adminUser.status,
          defaultProgrammingLanguage: adminUser.defaultProgrammingLanguage,
          defaultTheme: adminUser.defaultTheme,
          token: generateToken(adminUser._id, adminUser.email, 'admin'),
        });
      } else {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
    }

    const user = await User.findOne({ email: new RegExp(`^${normalizedEmail}$`, 'i') }).select('+password');

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        bio: user.bio,
        location: user.location,
        website: user.website,
        avatarUrl: user.avatarUrl,
        skills: user.skills,
        pinnedSnippets: user.pinnedSnippets,
        role: user.role,
        status: user.status,
        defaultProgrammingLanguage: user.defaultProgrammingLanguage,
        defaultTheme: user.defaultTheme,
        token: generateToken(user._id, user.email, user.role),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    if (error.name === 'MongoNetworkError' || error.name === 'MongoServerSelectionError') {
      return res.status(500).json({ message: 'Unable to connect to server. Please try again.' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        bio: user.bio,
        location: user.location,
        website: user.website,
        avatarUrl: user.avatarUrl,
        skills: user.skills,
        pinnedSnippets: user.pinnedSnippets,
        role: user.role,
        status: user.status,
        defaultProgrammingLanguage: user.defaultProgrammingLanguage,
        defaultTheme: user.defaultTheme,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      
      if (req.body.username !== undefined) user.username = req.body.username;
      if (req.body.bio !== undefined) user.bio = req.body.bio;
      if (req.body.location !== undefined) user.location = req.body.location;
      if (req.body.website !== undefined) user.website = req.body.website;
      if (req.body.avatarUrl !== undefined) user.avatarUrl = req.body.avatarUrl;
      if (req.body.skills !== undefined) user.skills = req.body.skills;
      if (req.body.defaultProgrammingLanguage !== undefined) user.defaultProgrammingLanguage = req.body.defaultProgrammingLanguage;
      if (req.body.defaultTheme !== undefined) user.defaultTheme = req.body.defaultTheme;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        username: updatedUser.username,
        bio: updatedUser.bio,
        location: updatedUser.location,
        website: updatedUser.website,
        avatarUrl: updatedUser.avatarUrl,
        skills: updatedUser.skills,
        pinnedSnippets: updatedUser.pinnedSnippets,
        role: updatedUser.role,
        status: updatedUser.status,
        defaultProgrammingLanguage: updatedUser.defaultProgrammingLanguage,
        defaultTheme: updatedUser.defaultTheme,
        token: generateToken(updatedUser._id, updatedUser.email, updatedUser.role),
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Username or email already taken' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Verify Remember Access Key
// @route   POST /api/auth/verify-reset-access
// @access  Public
const verifyResetAccess = async (req, res) => {
  const { rememberAccessKey } = req.body;
  if (!rememberAccessKey) {
    return res.status(400).json({ message: 'Please provide your Remember Access key' });
  }

  try {
    const hashedKey = crypto.createHash('sha256').update(rememberAccessKey).digest('hex');
    const user = await User.findOne({ rememberAccessKey: hashedKey });

    if (!user) {
      return res.status(404).json({ message: 'Invalid Remember Access key.' });
    }

    // Generate short-lived reset authorization token
    const resetToken = crypto.randomBytes(20).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    user.resetAuthToken = hashedToken;
    user.resetAuthExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    res.status(200).json({
      message: 'Access verified',
      resetAuthToken: resetToken
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Reset Password with Auth Token
// @route   POST /api/auth/reset-password
// @access  Public
const resetPassword = async (req, res) => {
  const { resetAuthToken, newPassword } = req.body;
  
  if (!resetAuthToken || !newPassword) {
    return res.status(400).json({ message: 'Missing token or password' });
  }

  try {
    const hashedToken = crypto.createHash('sha256').update(resetAuthToken).digest('hex');

    const user = await User.findOne({
      resetAuthToken: hashedToken,
      resetAuthExpire: { $gt: Date.now() },
    }).select('+password');

    if (!user) {
      return res.status(400).json({ message: 'Reset session expired. Please start again.' });
    }

    // Ensure password length
    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Set new password (pre-save hook will hash it)
    user.password = newPassword;
    user.resetAuthToken = undefined;
    user.resetAuthExpire = undefined;
    
    // Also clear legacy tokens if they exist
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      message: 'Password reset successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to reset password. Please try again.' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateUserProfile,
  verifyResetAccess,
  resetPassword,
};
