const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reviewer',
    required: true
  },
  content: {
    type: String,
    maxlength: 140,
    required: true,
  },
  film: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

module.exports = mongoose.model('Review', schema);
