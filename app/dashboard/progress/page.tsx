'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Book, Brain, PenTool, Globe, Award } from 'lucide-react'

const subjects = [
  { name: 'Math', icon: Brain, progress: 60 },
  { name: 'Science', icon: PenTool, progress: 45 },
  { name: 'Language Arts', icon: Book, progress: 75 },
  { name: 'Social Studies', icon: Globe, progress: 30 },
]

const achievements = [
  { name: 'Math Master', description: 'Completed all math modules', icon: '🧮' },
  { name: 'Science Whiz', description: 'Aced 5 science quizzes in a row', icon: '🔬' },
  { name: 'Bookworm', description: 'Read 10 books this month', icon: '📚' },
  { name: 'History Buff', description: 'Completed world history course', icon: '🌍' },
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function Progress() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-black text-white p-8 space-y-8 font-sans">
      <motion.h1 
        className="text-5xl font-extrabold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-indigo-500"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Your Progress
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div 
          className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white border-opacity-20"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <h2 className="text-3xl font-bold mb-6 text-white">Subject Progress</h2>
          <div className="space-y-6">
            {subjects.map((subject, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex justify-between mb-2">
                  <Link href={`/subjects/${subject.name.toLowerCase().replace(' ', '-')}`} className="hover:text-pink-400 transition-colors duration-300 flex items-center">
                    <subject.icon className="h-6 w-6 mr-3 text-purple-400" />
                    <span className="text-lg font-semibold">{subject.name}</span>
                  </Link>
                  <span className="text-lg font-semibold">{subject.progress}%</span>
                </div>
                <div className="w-full bg-purple-900 bg-opacity-50 rounded-full h-3">
                  <motion.div 
                    className="bg-gradient-to-r from-purple-400 to-pink-500 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${subject.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div 
          className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white border-opacity-20"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <h2 className="text-3xl font-bold mb-6 text-white">Recent Achievements</h2>
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <motion.div 
                key={index} 
                className="flex items-center space-x-4 p-4 bg-white bg-opacity-5 rounded-xl backdrop-filter backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <div className="text-4xl">{achievement.icon}</div>
                <div>
                  <h3 className="font-semibold text-lg text-white">{achievement.name}</h3>
                  <p className="text-sm text-gray-300">{achievement.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      {/* <motion.div 
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Link 
          href="/dashboard" 
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 inline-flex items-center transform hover:scale-105 shadow-lg"
        >
          <Award className="h-5 w-5 mr-2" />
          View All Achievements
        </Link>
      </motion.div> */}
    </div>
  )
}

