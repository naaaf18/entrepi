import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchLessons } from '../services/api';

const HomePage = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLessons = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Loading lessons...');
        const lessonsData = await fetchLessons();
        console.log('Lessons loaded successfully:', lessonsData);
        
        // Validate lessons data
        if (!lessonsData || !Array.isArray(lessonsData) || lessonsData.length === 0) {
          setError('No lessons available at the moment.');
          setLessons([]);
        } else {
          setLessons(lessonsData);
        }
      } catch (err) {
        console.error('Error in loadLessons:', err);
        setError('Failed to load lessons. Please try again later.');
        setLessons([]);
      } finally {
        setLoading(false);
      }
    };

    loadLessons();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Micro-Learning Platform</h1>
        <Link 
          to="/profile" 
          className="bg-[#757575] hover:bg-[#e0e0e0] text-white font-bold py-2 px-4 rounded"
        >
          View My Journal
        </Link>
      </div>

      {lessons.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded relative" role="alert">
          <p className="font-medium">No lessons available</p>
          <p className="text-sm">Please check back later for new lessons.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson, index) => {
            const lessonId = lesson.id || lesson._id; // fallback to _id if id is undefined
            console.log(`Rendering lesson at index ${index} with id:`, lessonId);
            return (
              <div key={lessonId} className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{lesson.title}</h2>
                  <p className="text-gray-600 mb-4">{lesson.content}</p>
                  <div className="mb-4">
                    <span className="text-sm text-gray-500">
                      {lesson.reflectiveQuestions?.length || 0} reflective {lesson.reflectiveQuestions?.length === 1 ? 'question' : 'questions'}
                    </span>
                  </div>
                  <Link 
                    to={`/lessons/${lessonId}`} 
                    className="inline-block bg-[#757575] hover:bg-black text-white font-bold py-2 px-4 rounded"
                  >
                    Start Lesson
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HomePage;
