'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Book, Brain, PenTool, Globe, Palette, Dumbbell, Music } from 'lucide-react'
import { useQuery } from '@apollo/client'
import { Get_Custom_Agents } from '@/lib/query'
import { useRouter } from 'next/navigation'
import IconBody from '../components/Icons'  
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import { useAppDispatch } from '@/redux/hooks'
import { setter } from '@/redux/features/dto/dataTransferSlice'



const subjectData = {
  elementary: [
    { name: 'OOP', icon: Book, progress: 75 },
    { name: 'DSA', icon: Brain, progress: 60 },
    { name: 'Networking', icon: PenTool, progress: 45 },
    { name: 'Cybersecurity', icon: Globe, progress: 30 },
    { name: 'Web Development', icon: Palette, progress: 90 },
    { name: 'App Development', icon: Dumbbell, progress: 80 },
    { name: 'ML/AI', icon: Music, progress: 5 },
  ]

}

// All categories in one list for navbar
const categories = [
  { id: 'elementary', label: 'Create Subject +' }
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function Subjects() {
  const router = useRouter(); 
  const {user} = useUser(); 
  const userID = user?.id;
  const [activeCategory, setActiveCategory] = useState(categories[0].id)
  const subjects = subjectData[activeCategory as keyof typeof subjectData] 
  const dispatch = useAppDispatch();

  const { data, loading, error , refetch } = useQuery(Get_Custom_Agents(), {
    variables: { userId:userID } 
  }); 



  const handleDelete = async (_id: string): Promise<void> => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_AI4ALL_SERVER}agent/${_id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      console.log(response)
      if (response) {
        refetch()
        return response.data
      } else {
        console.log("Failed to delete file")
      }
    } catch (error) {
      console.log("Error deleting file:", error)
    }
  } 
  const formatText = (text) => {
    return text.toLowerCase().replace(/\s+/g, "-");
  };





  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800  to-black text-white p-8 space-y-8 font-sans">
      <motion.h1 
        className="text-5xl font-extrabold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-200 to-indigo-200"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Explore Your Subjects
      </motion.h1>

      <motion.nav 
        className="flex gap-4 mb-12 flex-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {categories.map((cat) => (
          <motion.button
            key={cat.id}
            onClick={()=>router.push('/dashboard/create-agent')}
            className={`
              px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300
              ${activeCategory === cat.id
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {cat.label}
          </motion.button>
        ))}
      </motion.nav>

      <motion.h2 
        className="text-3xl font-bold mb-8 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Your Subjects Level 
      </motion.h2>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={{
          initial: { opacity: 0 },
          animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
        initial="initial"
        animate="animate"
      >
        {data && data.getCustomAgents.map((subject: any, index: number) => {
  return (
    <motion.div 
      key={index} 
      className="relative bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-white border-opacity-20 hover:bg-opacity-15 transition-all duration-300"
      variants={fadeInUp}
    >
      {/* Delete Button */}
      <button 
        onClick={() => handleDelete(subject._id)}
        className="absolute top-3 right-3 text-white hover:text-red-500 transition"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-5 h-5" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6m5 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
      </button>

      <div className="flex items-center mb-4">
        <IconBody iconName={subject.icon} />
        <h3 className="text-2xl font-bold text-white">{subject.agentName} ({subject.subjectName})</h3>
      </div>

      <div className="mb-6">
        <div className="w-full bg-purple-900 bg-opacity-50 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-purple-400 to-pink-500 h-3 rounded-full"
            style={{ width: `${subject.progress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${subject.progress}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          ></motion.div>
        </div>
        <p className="text-sm text-gray-300 mt-2">
          Progress: {Math.ceil(subject.progress)}%
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
        <div
          onClick={() => {
            dispatch(setter({ custom: true, docId: subject._id }));
            router.push(`/dashboard/subjects/${subject.agentName}?id=${subject._id}&custom=true`);
          }}
          className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold p-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg text-center cursor-pointer"
        >
          Start  
        </div>
      </div>
    </motion.div>
  );
})}
      </motion.div>
    </div>
  )
}