# Micro-Learning Backend

A Node.js backend for a micro-learning web application that allows users to complete lessons and answer reflective questions.

## Features

- Lesson management (create, read)
- Response submission and retrieval
- MongoDB integration
- RESTful API endpoints

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or a remote instance)
- npm (Node Package Manager)

## Project Setup

### 1. Clone the Repository



### 2. Install Dependencies

```bash
npm install
```

This will install all the required dependencies listed in the package.json file:
- express: Web framework for Node.js
- mongoose: MongoDB object modeling tool
- dotenv: Environment variable management
- cors: Cross-Origin Resource Sharing middleware
- nodemon: Development tool for auto-restarting the server (dev dependency)

### 3. Environment Configuration

Create a `.env` file in the root directory with the following content:


You can modify these values according to your setup:
- `MONGODB_URI`: The connection string for your MongoDB instance
- `PORT`: The port on which the server will run

## MongoDB Setup

### Local MongoDB Installation

#### Windows
1. Download MongoDB Community Server from the [official website](https://www.mongodb.com/try/download/community)
2. Run the installer and follow the installation wizard
3. MongoDB will be installed as a service and will start automatically
4. The default data directory will be `C:\Program Files\MongoDB\Server\<version>\data`

#### macOS
Using Homebrew:
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### Linux (Ubuntu)
```bash
sudo apt update
sudo apt install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

### Verify MongoDB Installation

To verify that MongoDB is running correctly:

```bash
mongo
# or
mongosh
```

You should see a MongoDB shell prompt if the installation was successful.

## Running the Application

### 1. Start the Server

For development with auto-restart:
```bash
npm run dev
```

For production:
```bash
npm start
```

The server will start on the port specified in your `.env` file (default: 5000).

### 2. Seed the Database with Sample Data

To populate the database with sample lessons and questions:

```bash
npm run seed
```

This will:
- Connect to your MongoDB database
- Clear any existing lessons
- Insert sample lessons with reflective questions
- Disconnect from the database

## API Endpoints

### Lessons
- GET `/api/lessons` - Get all lessons
- GET `/api/lessons/:id` - Get a single lesson by ID

### Responses
- POST `/api/responses` - Submit a new response
- GET `/api/responses` - Get all responses (can be filtered by lessonId)


