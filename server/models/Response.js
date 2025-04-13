const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question', 
    required: true
  },
  answer: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Response', responseSchema);
