# Micro-Learning Platform - Frontend

A modern React frontend for a micro-learning platform with reflective questions and personal journaling capabilities.

## Project Overview

This frontend application allows users to:
- Browse and access bite-sized lessons
- Answer reflective questions for each lesson
- Save their responses in a personal journal
- Review their learning journey over time

## Tech Stack

- **Frontend**: React.js with Tailwind CSS
- **API Communication**: Axios for HTTP requests
- **Routing**: React Router for navigation

## Project Structure

```
client/
├── public/
├── src/
│   ├── components/
│   │   ├── HomePage.js       # Landing page with lesson list
│   │   ├── LessonPage.js     # Individual lesson with questions
│   │   ├── Navbar.js         # Navigation component
│   │   └── ProfilePage.js    # User's journal with saved responses
│   ├── services/
│   │   └── api.js            # API service for backend communication
│   ├── App.js                # Main application with routing
│   └── index.js              # Entry point
└── package.json
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd micro-learning-platform
   ```

2. Install dependencies:
   ```
   cd client
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the client directory with:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```
   npm start
   ```

## Features

### Home Page
- Displays a list of available lessons
- Each lesson card shows title, content preview, and number of reflective questions
- Responsive grid layout for different screen sizes
- Dark theme with black as primary color and white, #757575, #E0E0E0 as secondary colors

### Lesson Page
- Displays lesson content
- Shows reflective questions with text areas for responses
- Allows users to save their responses to their personal journal
- Provides feedback on successful saves
- Error handling for API failures

### Profile/Journal Page
- Shows all saved responses grouped by lesson
- Displays question text, user's answer, and timestamp
- Provides a clean interface for reviewing past learning
- Handles empty states and loading states

## API Integration

The frontend expects the following API endpoints from the backend:

- `GET /api/lessons` - Fetch all lessons
- `GET /api/lessons/:id` - Fetch a specific lesson by ID
- `POST /api/responses` - Save a user's response
- `GET /api/responses` - Fetch all user responses

### Expected Data Structures
