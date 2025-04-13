const express = require('express');
const router = express.Router();
const Lesson = require('../models/Lesson');

// Get all lessons
router.get('/', async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single lesson by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const lesson = await Lesson.findById(id);

    if (!lesson) {
      return res.status(404).json({ success: false, message: "Lesson not found" });
    }

    res.status(200).json({ success: true, data: lesson });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
});

module.exports = router; 