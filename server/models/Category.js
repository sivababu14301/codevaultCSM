const mongoose = require('mongoose');

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a category name'],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Please add a slug'],
      unique: true,
    },
    description: {
      type: String,
      default: '',
    },
    iconName: {
      type: String,
      default: 'FileCode',
    },
    color: {
      type: String,
      default: '#3B82F6',
    },
    bgColor: {
      type: String,
      default: '#EFF6FF',
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    type: {
      type: String,
      default: 'other',
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Category', categorySchema);
