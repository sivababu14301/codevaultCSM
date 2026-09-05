const mongoose = require('mongoose');

const favoriteSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    snippetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Snippet',
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate favorites for a single user/snippet combination
favoriteSchema.index({ userId: 1, snippetId: 1 }, { unique: true });

module.exports = mongoose.model('Favorite', favoriteSchema);
