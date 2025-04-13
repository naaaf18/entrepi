require('dotenv').config();
const mongoose = require('mongoose');
const Lesson = require('./models/Lesson');

const sampleLessons = [
  {
    title: 'Introduction to Micro-Learning',
    content: 'Micro-learning is an approach to training that delivers content in short, focused chunks. This method helps learners retain information better and makes learning more manageable.',
    reflectiveQuestions: [
      { question: 'What aspects of micro-learning do you find most appealing?' },
      { question: 'How do you think micro-learning could benefit your learning journey?' }
    ]
  },
  {
    title: 'Effective Study Techniques',
    content: 'Discover proven study techniques that can help you learn more effectively. From spaced repetition to active recall, these methods can significantly improve your learning outcomes.',
    reflectiveQuestions: [
      { question: 'Which study technique do you think would work best for you?' },
      { question: 'How can you incorporate these techniques into your daily learning routine?' }
    ]
  },
  {
    title: 'Time Management for Learning',
    content: 'Learn how to effectively manage your time while learning new skills. This lesson covers scheduling, prioritization, and creating a balanced learning routine.',
    reflectiveQuestions: [
      { question: 'What are your biggest time management challenges when learning?' },
      { question: 'How can you better structure your learning time?' }
    ]
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing lessons
    await Lesson.deleteMany({});
    console.log('Cleared existing lessons');

    // Insert sample lessons
    await Lesson.insertMany(sampleLessons);
    console.log('Sample lessons inserted successfully');

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 