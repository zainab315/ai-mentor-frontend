'use client'
import { ArrowLeft, Download, Trophy } from 'lucide-react'
import React from 'react'
import { QuizResultsTable } from './component/QuizResultsTable'
import { motion } from 'framer-motion'
import Link from 'next/link'

export const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800  to-black text-white p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg rounded-3xl p-8 shadow-2xl">

      <motion.div 
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          >
        <div className='flex justify-between items-center'>
          <Link href="/dashboard" className="text-purple-300 hover:text-purple-200 p-2 flex  items-center transition-colors duration-300">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Start New Quiz
          </Link>
          {/* <Download className="h-5 w-5 mr-2 text-purple-300 hover:text-purple-200 cursor-pointer flex  items-center transition-colors duration-300" /> */}
        </div>


        </motion.div>

    
    <div className=" bg-background/95 p-8 bg-gradient-to-br from-background to-primary/10">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3 mb-8">
          <Trophy className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-primary">Student Results</h1>
        </div>
        <QuizResultsTable />
      </div>
    </div>
    </div>
    </div>
  )
}


export default page