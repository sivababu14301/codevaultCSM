const Snippet = require('../models/Snippet');
const Report = require('../models/Report');

// @desc    Get public community snippets
// @route   GET /api/community/snippets
// @access  Public (or Private if authentication required)
const getCommunitySnippets = async (req, res) => {
  try {
    const { language, category, search, sort = 'newest' } = req.query;
    
    // Base query: only public snippets
    let query = { isPublic: true };

    if (language) query.language = language;
    if (category) query.category = category;
    if (search) {
      // Find matching users (author search)
      let authorQuery = { $or: [
        { username: { $regex: search, $options: 'i' } },
        { name: { $regex: search, $options: 'i' } }
      ]};
      
      const mongoose = require('mongoose');
      if (mongoose.isValidObjectId(search)) {
        authorQuery.$or.push({ _id: search });
      }

      const User = require('../models/User');
      const matchedUsers = await User.find(authorQuery).select('_id');
      const matchedUserIds = matchedUsers.map(u => u._id);

      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
        { author: { $in: matchedUserIds } }
      ];
    }

    // Determine sorting logic
    let sortOptions = { createdAt: -1 }; // newest by default
    if (sort === 'views') {
      sortOptions = { viewsCount: -1, createdAt: -1 };
    } else if (sort === 'likes') {
      sortOptions = { favoritesCount: -1, createdAt: -1 };
    } else if (sort === 'shares') {
      sortOptions = { sharesCount: -1, createdAt: -1 };
    }

    const snippets = await Snippet.find(query)
      .sort(sortOptions)
      .populate('author', 'name email username avatarUrl');
      
    res.status(200).json(snippets);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Increment view count
// @route   POST /api/community/snippets/:id/view
// @access  Private
const incrementView = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);
    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }
    
    if (!snippet.isPublic && snippet.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to view this snippet' });
    }

    snippet.viewsCount += 1;
    await snippet.save();
    
    res.status(200).json({ viewsCount: snippet.viewsCount });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Increment share count
// @route   POST /api/community/snippets/:id/share
// @access  Private
const incrementShare = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);
    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }
    
    if (!snippet.isPublic && snippet.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to share this snippet' });
    }

    snippet.sharesCount = (snippet.sharesCount || 0) + 1;
    await snippet.save();
    
    res.status(200).json({ sharesCount: snippet.sharesCount });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Report a snippet
// @route   POST /api/community/snippets/:id/report
// @access  Private
const reportSnippet = async (req, res) => {
  try {
    const { reason } = req.body;
    if (!reason) {
      return res.status(400).json({ message: 'Reason is required' });
    }

    const snippet = await Snippet.findById(req.params.id);
    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }

    const report = await Report.create({
      snippetId: snippet._id,
      reportedBy: req.user._id,
      reason
    });

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getCommunitySnippets,
  incrementView,
  incrementShare,
  reportSnippet
};
