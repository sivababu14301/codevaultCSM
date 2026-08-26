const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const normalizedEmail = email.trim().toLowerCase();
    
    // Validate that someone isn't trying to register the admin email
    if (normalizedEmail === 'codevaultadmin@gmail.com') {
      return res.status(400).json({ message: 'Cannot register with this email' });
    }

    const userExists = await User.findOne({ email: new RegExp(`^${normalizedEmail}$`, 'i') });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email: normalizedEmail,
      password,
      role: 'user', // Always default to user, never admin
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
        token: generateToken(user._id, user.email, user.role),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    if (error.name === 'MongoNetworkError' || error.name === 'MongoServerSelectionError') {
      return res.status(500).json({ message: 'Unable to connect to server. Please try again.' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
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

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateUserProfile,
};
