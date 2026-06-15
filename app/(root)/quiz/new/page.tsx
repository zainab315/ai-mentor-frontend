'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Book, Clock, PlayCircle } from 'lucide-react'

const subjects = [
  { name: 'Mathematics', icon: '🧮' },
  { name: 'Science', icon: '🔬' },
  { name: 'Language Arts', icon: '📚' },
  { name: 'Social Studies', icon: '🌍' },
]

const difficultyLevels = ['Easy', 'Medium', 'Hard']

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function NewQuiz() {
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('')
  const [duration, setDuration] = useState(15)

  const handleStartQuiz = () => {
    console.log('Starting quiz with:', { selectedSubject, selectedDifficulty, duration })
    alert(`Starting ${selectedDifficulty} ${selectedSubject} quiz for ${duration} minutes`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800  to-black text-white p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/dashboard" className="text-purple-300 hover:text-purple-200 p-2 flex items-center transition-colors duration-300">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </Link>
        </motion.div>

        <motion.h1 
          className="text-5xl font-extrabold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-white"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Start a New Quiz
        </motion.h1>

        <div className="space-y-8 mb-8">
          <motion.div 
            className="bg-gradient-to-br from-purple-800 to-indigo-900 rounded-2xl p-8 shadow-xl"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <h2 className="text-2xl font-bold mb-6 text-white">Select Subject</h2>
            <div className="grid grid-cols-2 gap-4">
              {subjects.map((subject) => (
                <motion.button
                  key={subject.name}
                  onClick={() => setSelectedSubject(subject.name)}
                  className={`p-4 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    selectedSubject === subject.name
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-white bg-opacity-10 text-gray-200 hover:bg-opacity-20'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-2xl mr-3">{subject.icon}</span>
                  <span className="text-lg font-semibold">{subject.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-br from-indigo-900 to-purple-800 rounded-2xl p-8 shadow-xl"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <h2 className="text-2xl font-bold mb-6 text-white">Select Difficulty</h2>
            <div className="flex gap-4">
              {difficultyLevels.map((level) => (
                <motion.button
                  key={level}
                  onClick={() => setSelectedDifficulty(level)}
                  className={`flex-1 py-3 rounded-xl transition-all duration-300 ${
                    selectedDifficulty === level
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-white bg-opacity-10 text-gray-200 hover:bg-opacity-20'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-lg font-semibold">{level}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-br from-purple-800 to-indigo-900 rounded-2xl p-8 shadow-xl"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <h2 className="text-2xl font-bold mb-6 text-white">Quiz Duration</h2>
            <div className="flex items-center">
              <input
                type="range"
                min="5"
                max="60"
                step="5"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="flex-1 mr-4 appearance-none h-3 bg-purple-900 rounded-full outline-none"
                style={{
                  background: `linear-gradient(to right, #8B5CF6 0%, #8B5CF6 ${(duration - 5) / 55 * 100}%, #4B5563 ${(duration - 5) / 55 * 100}%, #4B5563 100%)`
                }}
              />
              <span className="text-lg font-semibold flex items-center text-white">
                <Clock className="h-5 w-5 mr-2 text-purple-300" />
                {duration} minutes
              </span>
            </div>
          </motion.div>
        </div>

        <motion.button
          onClick={handleStartQuiz}
          disabled={!selectedSubject || !selectedDifficulty}
          className={`w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center ${
            (!selectedSubject || !selectedDifficulty) ? 'opacity-50 cursor-not-allowed' : 'hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 shadow-lg'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <PlayCircle className="h-6 w-6 mr-3" />
          Start Quiz
        </motion.button>
      </div>
    </div>
  )
}

