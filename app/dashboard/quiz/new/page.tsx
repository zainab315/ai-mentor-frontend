"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Clock, PlayCircle, ScrollText } from "lucide-react"
import { useRouter } from "next/navigation"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import "react-toastify/dist/ReactToastify.css"
import { toast } from "react-toastify"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { difficultyLevels, formattedSelectedSubject, sub_branch_subjects, subjects, usStates } from "@/lib/methods"
import { useAppDispatch } from "@/redux/hooks"
import { setter } from "@/redux/features/dto/dataTransferSlice"
import { useQuery } from "@apollo/client"
import { Get_User } from "@/lib/query"
import { useUser } from "@clerk/nextjs"

type SubjectKey = (typeof subjects)[number]["name"]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

// Custom toast styles
const toastStyles = {
  success: {
    style: {
      background: "linear-gradient(135deg, #2d3748 0%, #4a5568 100%)",
      borderRadius: "8px",
      color: "white",
      padding: "16px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      border: "1px solid #4a5568",
    },
    iconTheme: {
      primary: "white",
      secondary: "#48bb78",
    },
  },
  error: {
    style: {
      background: "linear-gradient(135deg, #2d3748 0%, #4a5568 100%)",
      borderRadius: "8px",
      color: "white",
      padding: "16px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      border: "1px solid #4a5568",
    },
    iconTheme: {
      primary: "white",
      secondary: "#f56565",
    },
  },
}

export default function NewQuiz() {
  const router = useRouter()
  const [selectedSubject, setSelectedSubject] = useState<SubjectKey | null>(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState({
    type: "",
    value: "",
  })
  const dispatch = useAppDispatch()
  const [duration, setDuration] = useState(1)
  const [isCitizen, setIsCitizen] = useState<string | null>(null)
  const [state, setState] = useState<string>("")
  const [level, setLevel] = useState<string>("")
  const [subBranch, setSubBranch] = useState<string>("")
  const [topic, setTopic] = useState("")
  const user = useUser()

  const { refetch } = useQuery(Get_User, {
    skip: true,
    variables: { descopeId: user?.user?.id },
  })

  const handleStartQuiz = async () => {
    console.log("Starting quiz with settings:", {
      selectedSubject,
      selectedDifficulty,
      duration,
      isCitizen,
      state,
      level,
      subBranch,
      topic,
    })
    const { data: getUser } = await refetch()
    console.log("User data fetched for quiz start:", getUser)
    // const tokens = getUser.getUser.credits
    const tokens = getUser?.getUser?.credits ?? 0
    console.log(tokens,'User Tokens')
    if (duration < 1 || duration > 20) return
    if (!selectedDifficulty) return
    if (!selectedSubject) return
    if (!subBranch) return
    if (!level) return
    if (!isCitizen) return
    if (isCitizen == "yes" && !state) return
    if (tokens < 500) return toast.error("Insufficent credits", toastStyles.error)

    const data = {
      subject: selectedSubject,
      totalQuestions: duration,
      difficulty: selectedDifficulty.value,
      type: selectedDifficulty.type,
      isCitizen,
      subBranch,
      state,
      topic,
      level,
      userId:user.user?.id
    }

    console.log(data,'Quiz Data')

    if (!user?.user?.id) return

    dispatch(setter(data))
    router.push(`/dashboard/quiz/new/startQuiz`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-black text-white p-4 sm:p-6 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl">
        <motion.div
          className="mb-6 md:mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
            <Link
              href="/dashboard"
              className="text-purple-300 hover:text-purple-200 p-2 flex items-center transition-colors duration-300"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
            </Link>
            <Link
              href="/dashboard/quiz/result"
              className="text-purple-300 hover:text-purple-200 p-2 flex items-center transition-colors duration-300"
            >
              <ScrollText className="h-5 w-5 mr-2" />
              Result
            </Link>
          </div>
        </motion.div>

        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Start a New Quiz
        </motion.h1>

        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="space-y-3">
            <Label className="text-lg font-semibold">Are you a US citizen or not?</Label>
            <RadioGroup onValueChange={(value) => setIsCitizen(value)} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no" />
                <Label htmlFor="no">No</Label>
              </div>
            </RadioGroup>
          </div>
        </motion.div>

        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* State Selection (only if US citizen) */}
          {isCitizen === "yes" && (
            <div className="space-y-2">
              <Label className="text-lg font-semibold">Select your state</Label>
              <Select onValueChange={setState} value={state}>
                <SelectTrigger className="w-full mt-2 bg-white bg-opacity-10 text-white rounded-xl p-3">
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent className="bg-transparent backdrop-blur-lg text-white border border-white/20 rounded-xl max-h-[40vh] overflow-y-auto">
                  {usStates.map((state) => (
                    <SelectItem className="bg-transparent" key={state} value={state.toLowerCase()}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </motion.div>

        {/* Education Level */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="space-y-2">
            <Label className="text-lg font-semibold">Education level</Label>
            <Select onValueChange={setLevel} value={level}>
              <SelectTrigger className="w-full mt-2 bg-white bg-opacity-10 text-white rounded-xl p-3">
                <SelectValue placeholder="Select your education level" />
              </SelectTrigger>
              <SelectContent className="bg-transparent backdrop-blur-lg text-white border border-white/20 rounded-xl">
                <SelectItem className="bg-transparent" value="school">School</SelectItem>
                <SelectItem className="bg-transparent" value="intermediate">Intermediate</SelectItem>
                <SelectItem className="bg-transparent" value="graduate">Graduate</SelectItem>
                <SelectItem className="bg-transparent" value="non-graduate">Non-Graduate</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        <div className="space-y-6 sm:space-y-8 mb-6 sm:mb-8">
          <motion.div
            className="bg-gradient-to-br from-purple-800 to-indigo-900 rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">Select Subject</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {subjects.map((subject) => (
                <motion.button
                  key={subject.name}
                  onClick={() => {
                    setSubBranch("")
                    setSelectedSubject(subject.name)
                  }}
                  className={`p-3 sm:p-4 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    selectedSubject === subject.name
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                      : "bg-white bg-opacity-10 text-gray-200 hover:bg-opacity-20"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-xl sm:text-2xl mr-2 sm:mr-3">{subject.icon}</span>
                  <span className="text-base sm:text-lg font-semibold">{formattedSelectedSubject(subject.name)}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Sub-branch Selection */}
          {selectedSubject && (
            <div className="space-y-2 sm:space-y-3">
              <Label className="text-lg font-semibold">Select Branch</Label>
              <Select onValueChange={setSubBranch} value={subBranch}>
                <SelectTrigger className="w-full mt-2 bg-white bg-opacity-10 text-white rounded-xl p-3">
                  <SelectValue placeholder="Choose a branch" />
                </SelectTrigger>
                <SelectContent className="bg-transparent backdrop-blur-lg text-white border border-white/20 rounded-xl max-h-[40vh] overflow-y-auto">
                  {selectedSubject &&
                    sub_branch_subjects[selectedSubject]?.map((branch: any) => (
                      <SelectItem className="bg-transparent" key={branch} value={branch.toLowerCase()}>
                        {branch}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {selectedSubject && subBranch && (
            <motion.div
              className="bg-gradient-to-br from-indigo-900 to-purple-800 rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">Quiz Topic (Optional)</h2>
              <textarea
                rows={3}
                placeholder="Enter your quiz topic"
                onChange={(e) => setTopic(e.target.value)}
                value={topic}
                className="w-full mt-2 bg-white resize-none bg-opacity-10 text-white rounded-xl p-3 outline-none focus:outline-none"
              />
            </motion.div>
          )}

          <motion.div
            className="bg-gradient-to-br from-indigo-900 to-purple-800 rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">Select Difficulty</h2>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {difficultyLevels.map((level: any) => (
                <motion.button
                  key={level.value}
                  onClick={() =>
                    setSelectedDifficulty({
                      value: level.value,
                      type: level.type,
                    })
                  }
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    selectedDifficulty.type === level.type
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                      : "bg-white bg-opacity-10 text-gray-200 hover:bg-opacity-20"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-lg font-semibold">{level.type}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-purple-800 to-indigo-900 rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">Quiz Questions Count</h2>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-0">
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full sm:flex-1 sm:mr-4 appearance-none h-3 bg-purple-900 rounded-full outline-none"
                style={{
                  background: `linear-gradient(to right, #8B5CF6 0%, #8B5CF6 ${
                    (duration / 20) * 100
                  }%, #4B5563 ${(duration / 20) * 100}%, #4B5563 100%)`,
                }}
              />
              <span className="text-lg font-semibold flex items-center text-white whitespace-nowrap">
                <Clock className="h-5 w-5 mr-2 text-purple-300" />
                {duration} Questions
              </span>
            </div>
          </motion.div>
        </div>

        <motion.button
          onClick={handleStartQuiz}
          disabled={!selectedSubject || !selectedDifficulty}
          className={`w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-all duration-300 flex items-center justify-center ${
            !selectedSubject || !selectedDifficulty || duration < 1 || duration > 20
              ? "opacity-50 cursor-not-allowed"
              : "hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 shadow-lg"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <PlayCircle className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
          Start Quiz
        </motion.button>
      </div>
    </div>
  )
}

