const mongoose = require('mongoose');

const reportSchema = mongoose.Schema(
  {
    snippetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Snippet',
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    reason: {
      type: String,
      required: [true, 'Please provide a reason for reporting'],
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'resolved', 'dismissed'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Report', reportSchema);
