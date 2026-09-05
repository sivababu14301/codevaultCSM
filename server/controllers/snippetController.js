const Snippet = require('../models/Snippet');
const SnippetVersion = require('../models/SnippetVersion');
const User = require('../models/User');
const mongoose = require('mongoose');

// @desc    Get snippets for the logged-in user and public snippets
// @route   GET /api/snippets
// @access  Private
const getSnippets = async (req, res) => {
  try {
    const { visibility, search } = req.query;
    
    // Base query for visibility
    let query = {};
    
    if (req.user.role === 'admin') {
      // Admin sees everything by default
      if (visibility === 'public') {
        query.isPublic = true;
      } else if (visibility === 'private') {
        query.isPublic = false;
      }
    } else {
      // Normal user visibility rules
      if (visibility === 'public') {
        query.isPublic = true;
      } else if (visibility === 'private') {
        query = { author: req.user._id, isPublic: false };
      } else {
        query = { $or: [{ author: req.user._id }, { isPublic: true }] };
      }
    }

    if (search) {
      // Find matching users (author search)
      let authorQuery = { $or: [
        { username: { $regex: search, $options: 'i' } },
        { name: { $regex: search, $options: 'i' } }
      ]};
      
      if (mongoose.isValidObjectId(search)) {
        authorQuery.$or.push({ _id: search });
      }

      const matchedUsers = await User.find(authorQuery).select('_id');
      const matchedUserIds = matchedUsers.map(u => u._id);

      // Add text search conditions
      const searchConditions = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { language: { $regex: search, $options: 'i' } },
          { category: { $regex: search, $options: 'i' } },
          { author: { $in: matchedUserIds } }
        ]
      };

      if (Object.keys(query).length > 0) {
        query = { $and: [query, searchConditions] };
      } else {
        query = searchConditions;
      }
    }

    const snippets = await Snippet.find(query).populate('author', 'name email username');
    res.status(200).json(snippets);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create snippet
// @route   POST /api/snippets
// @access  Private
const createSnippet = async (req, res) => {
  try {
    const { title, description, code, language, tags, category, categoryId, isPublic } = req.body;
    
    if (!title || !code) {
      return res.status(400).json({ message: 'Please provide title and code' });
    }

    const snippet = await Snippet.create({
      title,
      description,
      code,
      language,
      tags: tags || [],
      category: category || 'General',
      categoryId,
      isPublic: isPublic !== undefined ? isPublic : true,
      author: req.user._id,
      currentVersion: 1
    });

    await SnippetVersion.create({
      snippetId: snippet._id,
      versionNumber: 1,
      title: snippet.title,
      description: snippet.description,
      code: snippet.code,
      language: snippet.language,
      changeDescription: 'Initial version',
      updatedBy: req.user._id
    });

    const populatedSnippet = await Snippet.findById(snippet._id).populate('author', 'name email');
    res.status(201).json(populatedSnippet);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update snippet
// @route   PUT /api/snippets/:id
// @access  Private
const updateSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);
    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }
    
    // Check for user
    if (snippet.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'User not authorized' });
    }

    const nextVersion = (snippet.currentVersion || 1) + 1;
    
    const updateData = { ...req.body, currentVersion: nextVersion };
    delete updateData.author;

    const updatedSnippet = await Snippet.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    }).populate('author', 'name email');

    // Default change description logic
    let changeDescription = req.body.changeDescription || 'Updated snippet';
    if (!req.body.changeDescription) {
      if (req.body.code && req.body.code !== snippet.code) changeDescription = 'Updated code logic';
      else if (req.body.title && req.body.title !== snippet.title) changeDescription = 'Updated title';
    }

    await SnippetVersion.create({
      snippetId: updatedSnippet._id,
      versionNumber: nextVersion,
      title: updatedSnippet.title,
      description: updatedSnippet.description,
      code: updatedSnippet.code,
      language: updatedSnippet.language,
      changeDescription: changeDescription,
      updatedBy: req.user._id
    });

    res.status(200).json(updatedSnippet);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete snippet
// @route   DELETE /api/snippets/:id
// @access  Private
const deleteSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);
    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }

    // Check for user
    if (snippet.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'User not authorized' });
    }

    await snippet.deleteOne();
    res.status(200).json({ _id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};



// @desc    Get snippet by ID
// @route   GET /api/snippets/:id
// @access  Private
const getSnippetById = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id).populate('author', 'name email username');
    
    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }

    if (!snippet.isPublic && snippet.author._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized to view this snippet' });
    }

    res.status(200).json(snippet);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get snippet versions
// @route   GET /api/snippets/:id/versions
// @access  Private
const getSnippetVersions = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);
    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }

    // Check visibility / ownership
    if (!snippet.isPublic && snippet.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'User not authorized to view versions' });
    }

    const versions = await SnippetVersion.find({ snippetId: req.params.id })
      .sort({ versionNumber: -1 })
      .populate('updatedBy', 'name email username');

    res.status(200).json(versions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Restore snippet version
// @route   POST /api/snippets/:id/versions/:versionId/restore
// @access  Private
const restoreSnippetVersion = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);
    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }

    if (snippet.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'User not authorized to restore versions' });
    }

    const versionToRestore = await SnippetVersion.findById(req.params.versionId);
    if (!versionToRestore) {
      return res.status(404).json({ message: 'Version not found' });
    }

    const nextVersion = (snippet.currentVersion || 1) + 1;

    const updatedSnippet = await Snippet.findByIdAndUpdate(req.params.id, {
      title: versionToRestore.title,
      description: versionToRestore.description,
      code: versionToRestore.code,
      language: versionToRestore.language,
      currentVersion: nextVersion
    }, { new: true }).populate('author', 'name email username');

    await SnippetVersion.create({
      snippetId: updatedSnippet._id,
      versionNumber: nextVersion,
      title: updatedSnippet.title,
      description: updatedSnippet.description,
      code: updatedSnippet.code,
      language: updatedSnippet.language,
      changeDescription: `Restored from v${versionToRestore.versionNumber}`,
      updatedBy: req.user._id
    });

    res.status(200).json(updatedSnippet);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Duplicate snippet
// @route   POST /api/snippets/:id/duplicate
// @access  Private
const duplicateSnippet = async (req, res) => {
  try {
    const originalSnippet = await Snippet.findById(req.params.id);
    if (!originalSnippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }

    // Check if the user is authorized to duplicate (owner only)
    if (originalSnippet.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Only the owner can duplicate this snippet' });
    }

    // Create duplicate
    const newSnippet = await Snippet.create({
      title: `${originalSnippet.title} (Copy)`,
      description: originalSnippet.description,
      code: originalSnippet.code,
      language: originalSnippet.language,
      tags: originalSnippet.tags || [],
      category: originalSnippet.category || 'General',
      isPublic: false, // Default duplicated snippets to private
      author: req.user._id,
      currentVersion: 1
    });

    // Create initial version for the duplicate
    await SnippetVersion.create({
      snippetId: newSnippet._id,
      versionNumber: 1,
      title: newSnippet.title,
      description: newSnippet.description,
      code: newSnippet.code,
      language: newSnippet.language,
      changeDescription: 'Initial duplicated version',
      updatedBy: req.user._id
    });

    const populatedSnippet = await Snippet.findById(newSnippet._id).populate('author', 'name email username avatarUrl');
    res.status(201).json(populatedSnippet);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const getSharedSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id).populate('author', 'name email username avatarUrl');
    
    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }

    res.status(200).json(snippet);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getSnippets,
  getSnippetById,
  createSnippet,
  updateSnippet,
  deleteSnippet,
  getSnippetVersions,
  restoreSnippetVersion,
  duplicateSnippet,
  getSharedSnippet
};
