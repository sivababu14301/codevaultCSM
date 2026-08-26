const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a collection name'],
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters']
    },
    description: {
      type: String,
      maxlength: [500, 'Description cannot be more than 500 characters']
    },
    isPublic: {
      type: Boolean,
      default: false
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
    snippets: [{
      type: mongoose.Schema.ObjectId,
      ref: 'Snippet'
    }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Collection', collectionSchema);
