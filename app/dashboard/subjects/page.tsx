'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { subjectData } from '@/lib/subjects'
import { useDispatch } from 'react-redux'
import { setter } from '@/redux/features/dto/dataTransferSlice'
import { useRouter } from 'next/navigation'


// All categories in one list for navbar
const categories = [
  { id: 'elementary', label: 'Elementary' },
  { id: 'middle', label: 'Middle' },
  { id: 'high', label: 'High' },
  { id: 'undergraduate', label: 'Undergraduate' },
  { id: 'graduate', label: 'Graduate' }, 
  { id: 'international', label: 'International' },
  {id: 'nonStudent' , label:'Non Student'}
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function Subjects() { 

  const [activeCategory, setActiveCategory] = useState(categories[0].id)
  const subjects = subjectData[activeCategory as keyof typeof subjectData]

  const router = useRouter()
  const dispatch = useDispatch() 
  function convertString(str : string) {
    return str.toUpperCase().replace(/ /g, "_");
}
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800  to-black text-white p-8 space-y-8 font-sans">
      <motion.h1 
        className="text-5xl font-extrabold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-200 to-indigo-200"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Explore All Subjects
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
            onClick={() => setActiveCategory(cat.id)}
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
        {categories.find((cat) => cat.id === activeCategory)?.label} Level
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
        {subjects.map((subject, index) => {
          const Icon = subject.icon
          const slug = subject.name.toLowerCase().replace(/\s+/g, '-')

          return (
            <motion.div 
              key={index} 
              className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-white border-opacity-20 hover:bg-opacity-15 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="flex items-center mb-4">
                <Icon className="h-10 w-10 mr-4 text-purple-400" />
                <h3 className="text-2xl font-bold text-white">{subject.name}</h3> 

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
                {/* <p className="text-sm text-gray-300 mt-2">
                  Progress: {subject.progress}%
                </p> */}
              </div>

              <div className="flex cursor-pointer flex-col sm:flex-row justify-between items-center gap-2">
                <div
                onClick={()=>{
                  router.push(`/dashboard/subjects/${slug}?category=${activeCategory}`)
                  dispatch(setter({custom:false,docId:null}))
                }}
                  className="w-full sm:w-auto px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold p-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
                >
                 Start
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}

