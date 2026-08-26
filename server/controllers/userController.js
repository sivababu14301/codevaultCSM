const User = require('../models/User');
const Snippet = require('../models/Snippet');

// @desc    Get author public profile
// @route   GET /api/users/:id
// @access  Public
const getAuthorProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password -email -role');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Aggregate stats for public snippets
    const publicSnippets = await Snippet.find({ author: user._id, isPublic: true });
    
    const stats = {
      totalSnippets: publicSnippets.length,
      totalViews: publicSnippets.reduce((sum, s) => sum + (s.viewsCount || 0), 0),
      totalShares: publicSnippets.reduce((sum, s) => sum + (s.sharesCount || 0), 0),
      totalLikes: publicSnippets.reduce((sum, s) => sum + (s.favoritesCount || 0), 0),
    };

    res.json({
      _id: user._id,
      name: user.name,
      username: user.username,
      bio: user.bio,
      location: user.location,
      website: user.website,
      avatarUrl: user.avatarUrl,
      skills: user.skills,
      createdAt: user.createdAt,
      stats
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get author public snippets
// @route   GET /api/users/:id/snippets
// @access  Public
const getAuthorSnippets = async (req, res) => {
  try {
    const snippets = await Snippet.find({ author: req.params.id, isPublic: true })
      .sort({ createdAt: -1 })
      .populate('author', 'name username avatarUrl');

    res.json(snippets);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Toggle pin snippet for user
// @route   POST /api/users/pin/:id
// @access  Private
const togglePinSnippet = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const snippetId = req.params.id;
    const isPinned = user.pinnedSnippets.includes(snippetId);

    if (isPinned) {
      user.pinnedSnippets = user.pinnedSnippets.filter(id => id.toString() !== snippetId);
    } else {
      user.pinnedSnippets.push(snippetId);
    }

    await user.save();
    res.json({ pinnedSnippets: user.pinnedSnippets });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAuthorProfile,
  getAuthorSnippets,
  togglePinSnippet,
};
