'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Clock, PlayCircle, Mic, ImageIcon, CheckCircle2, Circle, RotateCw } from 'lucide-react'

// Example data structure with subtopics, statuses, and some sample questions.
// Status can be: "completed", "in-progress", or "remaining".
const lessons = [
  {
    title: 'Introduction',
    duration: '15 min',
    subtopics: [
      { title: 'Topic 1: Overview', status: 'completed' },
      { title: 'Topic 2: Getting Started', status: 'in-progress' },
      { title: 'Topic 3: Key Terminology', status: 'remaining' },
    ],
    questions: [
      'What does “introduction” mean in this subject?',
      'List two key terms from Topic 2.',
    ],
  },
  {
    title: 'Basic Concepts',
    duration: '30 min',
    subtopics: [
      { title: 'Topic 1: Definitions', status: 'completed' },
      { title: 'Topic 2: Examples', status: 'remaining' },
      { title: 'Topic 3: Practice Questions', status: 'remaining' },
    ],
    questions: [
      'Give an example of a basic concept mentioned in Topic 1.',
      'How do these basic concepts apply in real life?',
    ],
  },
  {
    title: 'Advanced Topics',
    duration: '45 min',
    subtopics: [
      { title: 'Topic 1: Deep Dive', status: 'remaining' },
      { title: 'Topic 2: Complex Scenarios', status: 'remaining' },
    ],
    questions: [
      'What makes a topic “advanced” in this subject?',
      'Describe a complex scenario from Topic 2.',
    ],
  },
  {
    title: 'Practice Problems',
    duration: '60 min',
    subtopics: [
      { title: 'Topic 1: Timed Quiz', status: 'remaining' },
      { title: 'Topic 2: Mixed Difficulty', status: 'remaining' },
    ],
    questions: [
      'Try solving a timed quiz problem.',
      'What is the benefit of practicing mixed difficulty problems?',
    ],
  },
]

export default function SubjectPage({ params }: { params: { subject: string } }) {
  // Convert slug (e.g., "math-subject") to display format (e.g., "math subject")
  const subject = params.subject.replace('-', ' ')

  // State for the chat section
  const [userInput, setUserInput] = useState('')
  const [messages, setMessages] = useState<string[]>([])
  const [difficulty, setDifficulty] = useState('normal') // "easy", "normal", "advanced", etc.

  // Track which lesson’s quiz is currently active
  const [activeLessonIndex, setActiveLessonIndex] = useState<number | null>(null)

  // Handle sending a message to the AI (mock logic)
  const handleSend = () => {
    if (!userInput.trim()) return

    // Append user message
    setMessages((prev) => [...prev, `User: ${userInput}`])
    // Mock AI response
    setMessages((prev) => [
      ...prev,
      `User: ${userInput}`,
      `AI: This is a mock answer for "${userInput}".`
    ])
    setUserInput('')
  }

  // Placeholder for voice input
  const handleVoiceInput = () => {
    // Integrate voice recognition logic here
    alert('Voice input feature not implemented yet.')
  }

  // Placeholder for image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Integrate actual image analysis or upload logic
      alert(`Image "${file.name}" selected for analysis (not yet implemented).`)
    }
  }

  // Helper function to render subtopic status with icons
  const renderStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <div className="flex items-center gap-1 text-green-600">
            <CheckCircle2 className="h-4 w-4" />
            <span>Completed</span>
          </div>
        )
      case 'in-progress':
        return (
          <div className="flex items-center gap-1 text-blue-600">
            <RotateCw className="h-4 w-4 animate-spin" />
            <span>In Progress</span>
          </div>
        )
      default:
        return (
          <div className="flex items-center gap-1 text-gray-500">
            <Circle className="h-4 w-4" />
            <span>Remaining</span>
          </div>
        )
    }
  }

  // When user clicks "Start Quiz"
  const handleStartQuiz = (index: number) => {
    console.log(`Starting quiz for lesson: ${lessons[index].title}`)
    setActiveLessonIndex(index)
  }

  return (
    <>
      {/* Back Link */}
      <div className="mb-4">
        <Link href="/subjects" className="text-blue-600 hover:text-blue-800">
          &larr; Back to Subjects
        </Link>
      </div>

      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-4 capitalize">
        {subject} Outline & AI Mentor
      </h1>

      {/* Main Layout: Outline/Quizzes on the left, AI Chat on the right */}
      {/* We changed the sidebar to 1/4 (md:w-1/4) so it’s smaller. The AI Mentor is md:w-3/4. */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Course Outline + Quiz Section */}
        <div className="md:w-1/4 space-y-6">
          <h2 className="text-2xl font-semibold mb-2">Short Outline</h2>
          {lessons.map((lesson, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg shadow-sm bg-white"
            >
              <div className="flex justify-between items-center">
                {/* Lesson Title & Duration */}
                <div>
                  <h3 className="text-xl font-semibold">{lesson.title}</h3>
                  <p className="text-gray-600 flex items-center mt-1">
                    <Clock className="h-4 w-4 mr-1" />
                    Duration: {lesson.duration}
                  </p>
                </div>
                {/* Button to start quiz */}
                <button
                  onClick={() => handleStartQuiz(index)}
                  className="flex items-center bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
                >
                  <PlayCircle className="h-5 w-5 mr-2" />
                  Start Quiz
                </button>
              </div>
              {/* Subtopics */}
              <div className="mt-4 space-y-2">
                {lesson.subtopics.map((subtopic, subIndex) => (
                  <div
                    key={subIndex}
                    className="flex justify-between items-center px-2 py-1 border-b last:border-none"
                  >
                    <span className="text-gray-800">{subtopic.title}</span>
                    {renderStatusIcon(subtopic.status)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* AI Mentor Interaction + (Optional) Quiz Questions */}
        <div className="md:w-3/4 flex flex-col">
          <h2 className="text-2xl font-semibold mb-2">Ask the AI Mentor</h2>

          {/* If a lesson is active, show its questions above the chat area */}
          {activeLessonIndex !== null && (
            <div className="mb-4 p-4 bg-white border rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">
                Quiz Questions: {lessons[activeLessonIndex].title}
              </h3>
              <ul className="list-disc list-inside space-y-1">
                {lessons[activeLessonIndex].questions.map((q, i) => (
                  <li key={i} className="text-gray-800">
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* AI Mentor Toolbar (Difficulty, etc.) */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <label className="block font-medium">
              Difficulty:
              <select
                className="ml-2 px-2 py-1 border rounded"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="easy">Easy</option>
                <option value="normal">Normal</option>
                <option value="advanced">Advanced</option>
              </select>
            </label>

            {/* Voice Input Button */}
            <button
              onClick={handleVoiceInput}
              className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded"
            >
              <Mic className="h-5 w-5" />
              Voice
            </button>

            {/* Image Upload */}
            <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700">
              <ImageIcon className="h-5 w-5" />
              <span>Upload Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Chat Window */}
          <div className="border border-gray-300 rounded-lg flex-1 flex flex-col p-4 mb-4 bg-white shadow-sm overflow-y-auto">
            {messages.length === 0 ? (
              <p className="text-gray-500 italic">
                No messages yet. Ask something!
              </p>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className="mb-2">
                  <span
                    className={
                      msg.startsWith('AI:')
                        ? 'block bg-gray-100 p-2 rounded text-gray-800'
                        : 'block bg-blue-100 p-2 rounded text-blue-800'
                    }
                  >
                    {msg}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Input Field */}
          <div className="flex">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none"
              placeholder="Type your question..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

