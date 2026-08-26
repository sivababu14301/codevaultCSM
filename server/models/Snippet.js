const mongoose = require('mongoose');

const snippetSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    description: {
      type: String,
      default: '',
    },
    code: {
      type: String,
      required: [true, 'Please add the code snippet'],
    },
    language: {
      type: String,
      required: true,
      default: 'javascript',
    },
    tags: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      default: 'General',
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    favoritesCount: {
      type: Number,
      default: 0,
    },
    viewsCount: {
      type: Number,
      default: 1,
    },
    forksCount: {
      type: Number,
      default: 0,
    },
    isFavorited: {
      type: Boolean,
      default: false,
    },
    sharesCount: {
      type: Number,
      default: 0,
    },
    currentVersion: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Snippet', snippetSchema);
