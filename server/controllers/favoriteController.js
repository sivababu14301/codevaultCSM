const Favorite = require('../models/Favorite');
const Snippet = require('../models/Snippet');

// @desc    Get favorites for logged in user
// @route   GET /api/favorites
// @access  Private
const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.user._id })
      .populate({
        path: 'snippetId',
        populate: {
          path: 'author',
          select: 'name email username avatarUrl'
        }
      });
    
    // We can just return the populated snippets if the frontend expects a list of snippets,
    // or return the favorites objects. The user expects an array of favorites with snippetId.
    // Let's return the whole favorite objects.
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Add a snippet to favorites
// @route   POST /api/favorites/:snippetId
// @access  Private
const addFavorite = async (req, res) => {
  try {
    const { snippetId } = req.params;
    const userId = req.user._id;

    // Check if snippet exists
    const snippet = await Snippet.findById(snippetId);
    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }

    // Check if already favorited
    const existingFavorite = await Favorite.findOne({ userId, snippetId });
    if (existingFavorite) {
      return res.status(400).json({ message: 'Snippet already favorited' });
    }

    // Create favorite
    const favorite = await Favorite.create({
      userId,
      snippetId
    });

    // Increment favoritesCount on the Snippet
    snippet.favoritesCount += 1;
    await snippet.save();

    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Remove a snippet from favorites
// @route   DELETE /api/favorites/:snippetId
// @access  Private
const removeFavorite = async (req, res) => {
  try {
    const { snippetId } = req.params;
    const userId = req.user._id;

    // Check if favorite exists
    const favorite = await Favorite.findOne({ userId, snippetId });
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    // Remove favorite
    await favorite.deleteOne();

    // Decrement favoritesCount on the Snippet
    const snippet = await Snippet.findById(snippetId);
    if (snippet) {
      snippet.favoritesCount = Math.max(0, snippet.favoritesCount - 1);
      await snippet.save();
    }

    res.status(200).json({ message: 'Favorite removed', snippetId });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite
};
