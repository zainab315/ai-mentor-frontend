"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Upload, Delete } from "lucide-react"
import { GradientButton } from "./components/GradientButton"
import { CustomRadio } from "./components/Custom-Radio"
import { CustomSelect } from "./components/Custom-Select"
import { icons } from "lucide-react"
import { CustomEducationSelect } from "./components/Custom-Education-Select"
import axios from "axios"
import "react-toastify/dist/ReactToastify.css"
import { toast } from "react-toastify" 
import { allSubjectNames } from "@/lib/subjects"
import { useUser } from "@clerk/nextjs"
import type React from "react" // Import React
import { useQuery } from "@apollo/client"
import { Get_User } from "@/lib/query"
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

export default function CreateAgent() {
  const [file, setFile] = useState<File | null>(null)
  const { user } = useUser()
  const userID = user?.id
  const [agentName, setAgentName] = useState("")
  const [subjectName, setSubjectName] = useState("")
  const [educationLevel, setEducationLevel] = useState("")
  const [difficulty, setDifficulty] = useState("Beginner")
  const [disable, setDisable] = useState(false)
  const [loading, setLoading] = useState(false)
  const [courseType, setCourseType] = useState("File")
  const [courseOutline, setCourseOutline] = useState("")
  const [selectedIcon, setSelectedIcon] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [fileName, setFileName] = useState("")
  const [agentRole, setAgentRole] = useState("")
  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    const specialCharRegex = /[^a-zA-Z0-9 ]/
    if (!agentName.trim()) newErrors.agentName = "Agent name is required"
    if (specialCharRegex.test(agentName)) newErrors.agentName = "Special aharacters are not allowed"
    if (/\s/.test(agentName)) {
      newErrors.agentName = "White spaes are not allowed"
    } 
    if (!agentRole.trim()) newErrors.agentRole = "Agent Role is required"
    if (!subjectName.trim()) newErrors.subjectName = "Subject name is required"
   
    if (!educationLevel) newErrors.educationLevel = "Education level is required"
    if (!selectedIcon) newErrors.selectedIcon = "Icon is required"
    if (courseType === "File" && !file) newErrors.courseOutline = "Course outline file is required"
    if (courseType === "Text" && !courseOutline.trim()) newErrors.courseOutline = "Course outline text is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const {
    error,
    data: getUser,
    refetch,
  } = useQuery(Get_User, {
    skip: !userID,
    variables: { descopeId: userID },
  })

  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    if (getUser.getUser.credits < 1000) {
      toast.error("Insufficent credits", toastStyles.error)
      return
    }

    setDisable(true)
    setLoading(true)

    const isUploaded = uploadImageToAWS(file)

    if (isUploaded == null) {
      setDisable(false)
      setLoading(false)
    }

    try { 
      if (allSubjectNames.includes(agentName)) {
        toast.error("Agent with this name already exists", )
        return 
      }

      const data = {
        deScopeId: userID,
        agentName: agentName.trim(),
        subjectName: subjectName.trim(),
        educationLevel: educationLevel,
        icon: selectedIcon,
        course: courseType === "File" ? isUploaded : courseOutline,
        difficulty: difficulty,
        courseType,
        agentRole: agentRole,
        credits: getUser.getUser.credits,

      }
      const response = await axios.post(`${process.env.NEXT_PUBLIC_AI4ALL_SERVER}agent`, data)
      if (response.data.success == true) {
        toast.success("Agent creation started in the background.", toastStyles.success)
        clearForm()
      } else {
        toast.error(response.data.msg, toastStyles.error)
      }
    } catch (error) {
      console.error("Error:", error)
      toast.error("Failed to create agent. Please try again.", toastStyles.error)
    } finally {
      setDisable(false)
      setLoading(false)
      deleteFromAWS(fileName)
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  const iconOptions: any = Object.keys(icons).map((iconName: any) => ({
    label: iconName,
    value: iconName,
    icon: icons[iconName as keyof typeof icons],
  }))

  const uploadImageToAWS = async (file: File | null): Promise<any> => {
    const formData = new FormData()
    formData.append("file", file!)
    try {
      setLoading(true)
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_AI4ALL_SERVER}aws/signed-url?fileName=${file!.name}&contentType=${file!.type}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
      console.log("url", response)
      const signedUrl = response.data.msg.url

      const uploadResponse = await axios.put(signedUrl, file, {
        headers: {
          "Content-Type": file!.type,
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            console.log("progress", progress)
          }
        },
      })
      if (uploadResponse.status === 200) {
        setFileName(response.data.msg.key)
        return `${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_URL}` + response.data.msg.key
      } else {
        console.log("Failed to upload file")
        return null
      }
    } catch (error) {
      console.error("Error uploading file:", error)
      return null
    }
  }

  const deleteFromAWS = async (filename: string): Promise<void> => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_AI4ALL_SERVER}aws/${filename}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response) {
        return response.data
      } else {
        throw new Error("Failed to delete file")
      }
    } catch (error) {
      console.log("Error deleting file:", error)
    } finally {
      setFileName("")
    }
  }

  const clearForm = () => {
    setAgentName("")
    setSubjectName("")
    setEducationLevel("")
    setSelectedIcon("")
    setCourseType("File")
    setCourseOutline("")
    setFile(null)
    setAgentRole("")
    setDifficulty("Beginner")
    setErrors({})
  }
 

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-800 to-black text-white p-3 sm:p-4 md:p-8 font-sans">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 md:px-8">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/dashboard"
            className="text-purple-300 cursor-pointer hover:text-purple-200 flex items-center transition-colors duration-300"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </Link>
        </motion.div>

        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-500"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Build Your Subject Agent
        </motion.h1>
        <motion.p
          className="text-center mb-8 sm:mb-12 text-lg sm:text-xl text-purple-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Customize your own learning assistant for any topic!
        </motion.p>

        <motion.form
          className="space-y-6 md:space-y-8 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="agent-name" className="block text-lg font-medium text-purple-300 mb-2">
              Name Your Agent <span className="text-sm"> (Choose a unique name; otherwise, your agent will be overwritten if you already have an agent with the same name.)</span>
            </label>
            <input
              type="text"
              id="agent-name"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              placeholder="e.g., Carlo"
              className={`w-full bg-purple-900 bg-opacity-50 border ${errors.agentName ? "border-red-500" : "border-purple-500"} rounded-xl px-3 py-2 sm:px-4 sm:py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200`}
            />
            {errors.agentName && <p className="text-red-500 text-sm mt-1">{errors.agentName}</p>}
          </div>

          <div>
            <label htmlFor="agent-role" className="block text-lg font-medium text-purple-300 mb-2">
              Describe Your Agent Role
            </label>
            <input
              type="text"
              id="agent-role"
              value={agentRole}
              onChange={(e) => setAgentRole(e.target.value)}
              placeholder="e.g., Elemantary school teacher"
              className={`w-full bg-purple-900 bg-opacity-50 border ${errors.agentName ? "border-red-500" : "border-purple-500"} rounded-xl px-3 py-2 sm:px-4 sm:py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200`}
            />
            {errors.agentRole && <p className="text-red-500 text-sm mt-1">{errors.agentRole}</p>}
          </div>

          <div>
            <label htmlFor="subject-name" className="block text-lg font-medium text-purple-300 mb-2">
              Subject Name 
            </label>
            <input
              type="text"
              id="subject-name"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              placeholder="e.g., Advanced Calculus Helper"
              className={`w-full bg-purple-900 bg-opacity-50 border ${errors.subjectName ? "border-red-500" : "border-purple-500"} rounded-xl px-3 py-2 sm:px-4 sm:py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200`}
            />
            {errors.subjectName && <p className="text-red-500 text-sm mt-1">{errors.subjectName}</p>}
          </div>

          <CustomEducationSelect
            options={["Elementary", "Middle", "High", "College", "University"]}
            value={educationLevel}
            onChange={setEducationLevel}
            label="Education level"
            error={errors.educationLevel}
          />

          <CustomSelect
            options={iconOptions}
            value={selectedIcon}
            onChange={setSelectedIcon}
            label="Select an Icon"
            error={errors.selectedIcon}
          />

          <div>
            <label htmlFor="course-outline" className="flex justify-between  text-lg font-medium text-purple-300 mb-2">
              <div className="flex items-center">
                <p>Course Outline Upload </p>
                {file && <Delete onClick={() => setFile(null)} className="ml-2 cursor-pointer" />}
              </div>

              {!(file || courseOutline) && (
                <div className="flex ">
                  {["File", "Text"].map((level, index) => (
                    <>
                      <span key={index} className="mr-4"></span>

                      <CustomRadio
                        key={level}
                        name="level"
                        value={level}
                        label={level}
                        checked={courseType === level}
                        onChange={setCourseType}
                      />
                    </>
                  ))}
                </div>
              )}
            </label>

            {courseType === "File" ? (
              <div>
                <motion.div
                  className="border-2 border-dashed border-purple-500 rounded-xl p-4 sm:p-6 md:p-8 text-center cursor-pointer hover:bg-purple-900 hover:bg-opacity-30 transition duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => document.getElementById("course-outline")?.click()}
                >
                  <Upload className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 mx-auto text-purple-400" />
                  <p className="text-sm sm:text-base text-purple-300 mt-2">
                    {file ? file.name : "Drag and drop your course outline here, or click to select a file"}
                  </p>
                  <input
                    disabled={disable}
                    type="file"
                    className="hidden"
                    id="course-outline"
                    onChange={handleFileChange}
                  />
                </motion.div>
                {/* )} */}
              </div>
            ) : (
              <div>
                <textarea
                  rows={4}
                  id="Course Outline"
                  value={courseOutline}
                  onChange={(e) => setCourseOutline(e.target.value)}
                  placeholder="Enter your course outline "
                  className={`w-full bg-purple-900 bg-opacity-50 border ${errors.courseOutline ? "border-red-500" : "border-purple-500"} rounded-xl px-3 py-2 sm:px-4 sm:py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200`}
                />
                {errors.courseOutline && <p className="text-red-500 text-sm mt-1">{errors.courseOutline}</p>}
              </div>
            )}
          </div>

          <div>
            <div className="space-y-4">
              <div>
                <label className="block text-lg font-medium text-purple-300 mb-2">Learning Complexity</label>
                <div className="flex flex-wrap gap-3 sm:gap-6 justify-center sm:justify-evenly">
                  {["Beginner", "Intermediate", "Advanced"].map((level) => (
                    <CustomRadio
                      key={level}
                      name="difficulty"
                      value={level}
                      label={level}
                      checked={difficulty === level}
                      onChange={setDifficulty}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <GradientButton type="submit" className="w-full sm:w-auto sm:min-w-[200px]" disable={disable || loading}>
              {loading ? "Creating..." : "Create and Save Agent"}
            </GradientButton>
          </div>
        </motion.form>
      </div>
    </div>
  )
}

