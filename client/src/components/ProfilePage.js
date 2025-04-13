import React, { useState, useEffect } from 'react';
import { fetchUserResponses } from '../services/api';

const ProfilePage = () => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadResponses = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Loading user responses...');
        const userResponses = await fetchUserResponses();
        console.log('User responses loaded successfully:', userResponses);
        
        // Validate responses data
        if (!userResponses || !Array.isArray(userResponses)) {
          setError('Failed to load responses. Please try again later.');
          setResponses([]);
        } else {
          setResponses(userResponses);
        }
      } catch (err) {
        console.error('Error in loadResponses:', err);
        setError('Failed to load your responses. Please try again later.');
        setResponses([]);
      } finally {
        setLoading(false);
      }
    };

    loadResponses();
  }, []);

  // Group responses by lesson and include lesson title and question text
  const groupResponsesByLessonAndQuestion = (responses) => {
    const grouped = {};

    responses.forEach(response => {
      if (!response.lessonId || !response.questionId) return;
      
      // Initialize lesson if it doesn't exist
      if (!grouped[response.lessonId._id]) {
        grouped[response.lessonId._id] = {
          title: response.lessonId.title,
          questions: {}
        };
      }

      // Use question ID as the key
      const questionKey = response.questionId || 'unknown';
      
      // Initialize question array if it doesn't exist
      if (!grouped[response.lessonId._id].questions[questionKey]) {
        grouped[response.lessonId._id].questions[questionKey] = {
          questionText: response.lessonId.reflectiveQuestions.find(q => q._id === questionKey)?.question,
          responses: []
        };
      }

      // Add response to the appropriate question group
      grouped[response.lessonId._id].questions[questionKey].responses.push(response);
    });

    return grouped;
  };

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

  // Group responses by lesson and question
  const groupedResponses = groupResponsesByLessonAndQuestion(responses);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Your Learning Journal</h1>
      
      {responses.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded relative" role="alert">
          <p className="font-medium">No responses yet</p>
          <p className="text-sm">Complete lessons and answer reflective questions to build your learning journal.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedResponses).map(([lessonId, lessonData]) => (
            <div key={lessonId} className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">{lessonData.title}</h2>
              
              <div className="space-y-6">
                {Object.entries(lessonData.questions).map(([questionId, questionData]) => (
                  <div key={questionId} className="border rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-medium text-gray-700 mb-3">
                      {questionData.questionText || `Question ${questionId}`}
                    </h3>
                    
                    {questionData.responses.map((response, index) => (
                      <div key={`${response._id}-${index}`} className="bg-white p-3 rounded mb-2 last:mb-0">
                        <p className="text-gray-600 whitespace-pre-line">{response.answer}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
