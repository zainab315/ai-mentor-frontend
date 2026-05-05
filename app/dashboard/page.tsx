'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Book, Brain, PenTool, Globe, PlayCircle, Award, Plus, TrendingUp, Users, Lock } from 'lucide-react'
import { useQuery } from '@apollo/client'
import { Get_Total_Agent_Count, Get_Total_Quiz_Count } from '@/lib/query'

const subjects = [
  { name: 'Math', icon: Brain, progress: 100 },
  { name: 'Science', icon: PenTool, progress: 100 },
  { name: 'Language Arts', icon: Book, progress: 100 },
  { name: 'Social Studies', icon: Globe, progress: 100 },
]

const recentLessons = [
  { name: 'Algebra Basics', subject: 'Math', duration: '15 min' },
  { name: 'Cell Structure', subject: 'Science', duration: '20 min' },
  { name: 'Essay Writing', subject: 'Language Arts', duration: '30 min' },
]



const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function Dashboard() {

  const { data: totalQuizData, loading: quizLoading, error: quizError } = useQuery(Get_Total_Quiz_Count(), {
    variables: { userId: "2313213213" } 
  }); 
  
  const { data: totalAgentData, loading: agentLoading, error: agentError } = useQuery(Get_Total_Agent_Count(), {
    variables: { userId: "12313213213" } 
  });
  
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800  to-black text-white p-4 md:p-12 space-y-8 font-sans">
      <motion.h1 
        className="text-4xl md:text-6xl font-extrabold mb-12 text-white"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Student Dashboard
      </motion.h1>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={{
          initial: { opacity: 0 },
          animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
        initial="initial"
        animate="animate"
      >
          <motion.div 
            className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white border-opacity-20 hover:bg-opacity-15 transition-all duration-300 transform hover:scale-105"
            variants={fadeInUp}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-medium text-gray-300">Subjects</p>
                <p className="text-4xl font-bold text-white mt-2">56</p>
              </div>
              <Award className="h-12 w-12 text-purple-400 opacity-80" />
            </div>
          </motion.div>

          <motion.div 
            className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white border-opacity-20 hover:bg-opacity-15 transition-all duration-300 transform hover:scale-105"
            variants={fadeInUp}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-medium text-gray-300">My Subjects</p>
                <p className="text-4xl font-bold text-white mt-2">{totalAgentData && totalAgentData.getTotalAgentCount}</p>
              </div>
              <TrendingUp className="h-12 w-12 text-purple-400 opacity-80" />
            </div>
          </motion.div>

          <motion.div 
            className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white border-opacity-20 hover:bg-opacity-15 transition-all duration-300 transform hover:scale-105"
            variants={fadeInUp}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-medium text-gray-300">Quizzes Taken</p>
                <p className="text-4xl font-bold text-white mt-2">{totalQuizData && totalQuizData.getTotalQuizCount}</p>
              </div>
              <Brain className="h-12 w-12 text-purple-400 opacity-80" />
            </div>
          </motion.div>

      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold mb-6 text-white">Progress Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {subjects.map((subject, index) => (
              <motion.div 
                key={index} 
                className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white border-opacity-20 hover:bg-opacity-15 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center mb-4">
                  <subject.icon className="h-8 w-8 mr-3 text-purple-400" />
                  <h3 className="font-bold text-xl text-white">{subject.name}</h3>
                </div>
                <div className="w-full bg-purple-900 bg-opacity-50 rounded-full h-3">
                  <motion.div
                    className="bg-gradient-to-r from-purple-400 to-pink-500 h-3 rounded-full"
                    style={{ width: `${subject.progress}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${subject.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  ></motion.div>
                </div>
                {/* <p className="text-sm font-medium text-gray-300 mt-2">{subject.progress}% Complete</p> */}
              </motion.div>
            ))}
          </div>

          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6 text-white">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Link href="/dashboard/subjects" className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-4 px-6 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center transform hover:scale-105 shadow-lg">
                <Book className="mr-3 h-6 w-6" />
                Explore Subjects
              </Link>
              <Link href="/dashboard/quiz/new" className="bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold py-4 px-6 rounded-xl hover:from-pink-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center transform hover:scale-105 shadow-lg">
                <Brain className="mr-3 h-6 w-6" />
                Start a Quiz
              </Link>
              <Link href="/dashboard/create-agent" className="bg-gradient-to-r from-green-600 to-teal-600 text-white font-bold py-4 px-6 rounded-xl hover:from-green-700 hover:to-teal-700 transition-all duration-300 flex items-center justify-center transform hover:scale-105 shadow-lg">
                <Plus className="mr-3 h-6 w-6" />
                Create Custom Agent
              </Link>
              <Link href="/dashboard/my-subjects" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center transform hover:scale-105 shadow-lg">
                <TrendingUp className="mr-3 h-6 w-6" />
                My Subjects
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold mb-6 text-white">Recent Lessons</h2>
          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl border border-white border-opacity-20 overflow-hidden">
            {recentLessons.map((lesson, index) => (
              <motion.div 
                key={index} 
                className="p-6 flex justify-between items-center border-b border-white border-opacity-20 last:border-b-0 hover:bg-white hover:bg-opacity-5 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div>
                  <h3 className="font-bold text-xl text-white">{lesson.name}</h3>
                  <p className="text-sm font-medium text-gray-300 mt-1">{lesson.subject} - {lesson.duration}</p>
                </div>
                {/* <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-110 shadow-lg">
                  <PlayCircle className="h-6 w-6" />
                </button> */}
              </motion.div>
            ))}
          </div>

          {/* <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6 text-white">Study Buddies</h2>
            <motion.div 
              className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl border border-white border-opacity-20 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <p className="text-xl font-bold text-white">Online Now</p>
                <Users className="h-6 w-6 text-green-400" />
              </div>
              <div className="flex flex-wrap gap-6 mb-6">
                {['Alice', 'Bob', 'Charlie', 'Diana'].map((name, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold text-lg mr-3 shadow-lg">
                      {name[0]}
                    </div>
                    <span className="text-lg font-medium text-white">{name}</span>
                  </motion.div>
                ))}
              </div>
              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg">
                Start Group Study
              </button>
            </motion.div>
          </div> */}
          <div className="mt-12">
  <h2 className="text-3xl font-bold mb-6 text-white">Study Buddies</h2>
  <motion.div 
    className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl border border-white border-opacity-20 p-6 opacity-50 cursor-not-allowed"
  >
    <div className="flex items-center justify-between mb-6">
      <p className="text-xl flex font-bold text-white">Online Now <Lock className='ml-2' /></p>
      <Users className="h-6 w-6 text-green-400" />
    </div>
    <div className="flex flex-wrap gap-6 mb-6">
      {['Alice', 'Bob', 'Charlie', 'Diana'].map((name, index) => (
        <motion.div 
          key={index} 
          className="flex items-center"
          whileHover={{ scale: 1.1 }}
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold text-lg mr-3 shadow-lg">
            {name[0]}
          </div>
          <span className="text-lg font-medium text-white">{name}</span>
        </motion.div>
      ))}
    </div>
    <button 
      className="w-full bg-gradient-to-r from-gray-500 to-gray-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg opacity-50 cursor-not-allowed"
      disabled
    >
      Upcoming Feature 
    </button>
    
  </motion.div>
</div>
        </motion.div>
      </div>
    </div>
  )
}

