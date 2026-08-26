const mongoose = require('mongoose');

const snippetVersionSchema = mongoose.Schema(
  {
    snippetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Snippet',
    },
    versionNumber: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    changeDescription: {
      type: String,
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('SnippetVersion', snippetVersionSchema);
