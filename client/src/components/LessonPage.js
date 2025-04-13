"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { fetchLessonById, saveUserResponse } from "../services/api"

const LessonPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [lesson, setLesson] = useState(null)
  const [responses, setResponses] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [debugInfo, setDebugInfo] = useState(null) // Add debug state
  const [refreshing, setRefreshing] = useState(false)

  // Move the loadLesson function outside of useEffect so it can be called again
  const loadLesson = async () => {
    try {
      setLoading(true)
      setError(null)

      // Validate id parameter
      if (!id) {
        setError("Invalid lesson ID")
        setLoading(false)
        return
      }

      console.log(`Loading lesson with ID: ${id}`)
      const response = await fetchLessonById(id)
      console.log("Raw API response:", response)

      // Debug output to understand the structure
      const debugData = {
        hasData: !!response,
        dataType: typeof response,
        hasNestedData: response && typeof response === "object" && !!response.data,
        lessonStructure: response && typeof response === "object" ? Object.keys(response).join(", ") : "N/A",
        questionsExist: false,
        questionsArray: false,
        questionsLength: 0,
      }

      // Extract the actual lesson data - handle both direct and nested responses
      const lessonData = response && response.data ? response.data : response

      if (!lessonData) {
        setError("Lesson data is not available")
        setLoading(false)
        setDebugInfo(debugData)
        return
      }

      // Update debug info with questions data
      if (lessonData.reflectiveQuestions) {
        debugData.questionsExist = true
        debugData.questionsArray = Array.isArray(lessonData.reflectiveQuestions)
        debugData.questionsLength = Array.isArray(lessonData.reflectiveQuestions)
          ? lessonData.reflectiveQuestions.length
          : "not an array"
        debugData.firstQuestionStructure =
          Array.isArray(lessonData.reflectiveQuestions) && lessonData.reflectiveQuestions.length > 0
            ? Object.keys(lessonData.reflectiveQuestions[0]).join(", ")
            : "N/A"
      }

      setDebugInfo(debugData)

      // Check if reflective questions exist
      if (
        !lessonData.reflectiveQuestions ||
        !Array.isArray(lessonData.reflectiveQuestions) ||
        lessonData.reflectiveQuestions.length === 0
      ) {
        setError("No reflective questions found for this lesson")
        setLoading(false)
        return
      }

      console.log("Lesson data loaded successfully:", lessonData)
      setLesson(lessonData)

      // Initialize responses object with empty strings
      const initialResponses = {}
      lessonData.reflectiveQuestions.forEach((question) => {
        // Try to use _id or id, whatever is available
        const questionId = question._id || question.id
        if (questionId) {
          initialResponses[questionId] = ""
        } else {
          console.error("Question missing ID:", question)
        }
      })
      setResponses(initialResponses)
    } catch (err) {
      console.error("Error in loadLesson:", err)
      setError(`Failed to load lesson: ${err.message}`)
      setDebugInfo({ error: err.message, stack: err.stack })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadLesson()
  }, [id]) // Only re-run if the id changes

  const handleResponseChange = (questionId, value) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const handleSaveResponses = async () => {
    try {
      setSaving(true)
      setSaveSuccess(false)

      // Save each response
      for (const [questionId, answer] of Object.entries(responses)) {
        if (answer.trim()) {
          console.log(`Saving response for question ${questionId}:`, answer)

          // Find the question, support both id and _id
          const question = lesson.reflectiveQuestions.find(
            (q) => (q._id && q._id === questionId) || (q.id && q.id === questionId),
          )

          if (!question) {
            console.error(`Question not found for ID: ${questionId}`)
            continue
          }

          await saveUserResponse({
            lessonId: id,
            questionId: questionId,
            answer,
            question: question.question,
          })
        }
      }

      setSaveSuccess(true)
      setRefreshing(true)

      // Refresh the page after a short delay to show the success message
      setTimeout(() => {
        // Reset the success message
        setSaveSuccess(false)
        // Reload the current lesson data
        loadLesson()
        // Reset the refreshing state when done
        setRefreshing(false)
      }, 2000)
    } catch (err) {
      console.error("Error in handleSaveResponses:", err)
      setError("Failed to save responses. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  // Show debug info if requested
  if (debugInfo) {
    console.log("Debug info:", debugInfo)
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>

          {debugInfo && (
            <div className="mt-2 text-sm border-t border-red-300 pt-2">
              <p>
                <strong>Debug Info:</strong>
              </p>
              <pre className="overflow-auto max-h-40 mt-1 p-2 bg-red-50 rounded">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </div>
          )}
        </div>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go Back to Lessons
        </button>
      </div>
    )
  }

  if (!lesson) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Not Found!</strong>
          <span className="block sm:inline"> The lesson you're looking for doesn't exist.</span>
        </div>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go Home
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">{lesson.title}</h1>
        <p className="text-white">{lesson.content}</p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Reflective Questions</h2>

        {lesson.reflectiveQuestions.map((question) => {
          const questionId = question._id || question.id
          return (
            <div key={questionId} className="mb-8">
              <p className="text-lg font-medium text-gray-700 mb-2">{question.question}</p>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                placeholder="Type your response here..."
                value={responses[questionId] || ""}
                onChange={(e) => handleResponseChange(questionId, e.target.value)}
              ></textarea>
            </div>
          )
        })}

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handleSaveResponses}
            disabled={saving}
            className={`${
              saving ? "bg-gray-400" : "bg-[#757575] hover:bg-black "
            } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          >
            {saving ? "Saving..." : "Save Responses"}
          </button>

          {saveSuccess && (
            <div className="text-green-600 font-medium">
              {refreshing ? "Saving Data..." : "Responses saved successfully!"}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LessonPage
