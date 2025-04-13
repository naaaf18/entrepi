import axios from 'axios';

// Base URL for the API - update this with your backend URL
const API_URL = 'http://localhost:5000/api';

// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API functions
export const fetchLessons = async () => {
  try {
    console.log('Fetching all lessons...');
    const response = await api.get('/lessons');
    console.log('Lessons fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching lessons:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
};

export const fetchLessonById = async (lessonId) => {
  try {
    // Validate lessonId
    if (!lessonId) {
      throw new Error('Lesson ID is required');
    }
    
    console.log(`Fetching lesson with ID: ${lessonId}...`);
    const response = await api.get(`/lessons/${lessonId}`);
    console.log('Lesson fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching lesson ${lessonId}:`, error);
    if (error.response) {
      
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
};

export const saveUserResponse = async (responseData) => {
  try {
    console.log('Saving user response:', responseData);
    const response = await api.post('/responses', responseData);
    console.log('Response saved successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error saving response:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
};

export const fetchUserResponses = async () => {
  try {
    console.log('Fetching user responses...');
    const response = await api.get('/responses');
    console.log('User responses fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching user responses:', error);
    if (error.response) {
   
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
}; 