const express = require('express');
const router = express.Router();
const Response = require('../models/Response');

// Save a new response
router.post('/', async (req, res) => {
  const response = new Response({
    lessonId: req.body.lessonId,
    questionId: req.body.questionId,
    answer: req.body.answer
  });

  try {
    const newResponse = await response.save();
    res.status(201).json(newResponse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all responses with optional filtering
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.lessonId) {
      filter.lessonId = req.query.lessonId;
    }
    
    const responses = await Response.find(filter).populate('lessonId');
    res.json(responses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 