const Collection = require('../models/Collection');

// @desc    Get all collections for the logged-in user
// @route   GET /api/collections
// @access  Private
const getCollections = async (req, res) => {
  try {
    const collections = await Collection.find({ user: req.user._id })
      .populate({
        path: 'snippets',
        select: 'title language description isPublic tags category createdAt'
      })
      .sort('-createdAt');
    res.status(200).json(collections);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a collection
// @route   POST /api/collections
// @access  Private
const createCollection = async (req, res) => {
  try {
    const { name, description, isPublic } = req.body;

    const collection = await Collection.create({
      name,
      description,
      isPublic,
      user: req.user._id
    });

    res.status(201).json(collection);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update a collection
// @route   PUT /api/collections/:id
// @access  Private
const updateCollection = async (req, res) => {
  try {
    let collection = await Collection.findById(req.params.id);

    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    if (collection.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    collection = await Collection.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json(collection);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete a collection
// @route   DELETE /api/collections/:id
// @access  Private
const deleteCollection = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);

    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    if (collection.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await collection.deleteOne();

    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Add snippet to collection
// @route   POST /api/collections/:id/snippets/:snippetId
// @access  Private
const addSnippetToCollection = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);

    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    if (collection.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    if (!collection.snippets.includes(req.params.snippetId)) {
      collection.snippets.unshift(req.params.snippetId);
      await collection.save();
    }

    res.status(200).json(collection);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Remove snippet from collection
// @route   DELETE /api/collections/:id/snippets/:snippetId
// @access  Private
const removeSnippetFromCollection = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);

    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    if (collection.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    collection.snippets = collection.snippets.filter(
      (id) => id.toString() !== req.params.snippetId
    );
    await collection.save();

    res.status(200).json(collection);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getCollections,
  createCollection,
  updateCollection,
  deleteCollection,
  addSnippetToCollection,
  removeSnippetFromCollection
};
