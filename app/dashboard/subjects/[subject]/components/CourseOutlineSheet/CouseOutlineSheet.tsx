"use client"
import * as React from "react"
import { Check, Clock, PlayCircle, Loader2, ChevronDown } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
// import { GradientButton } from "@/app/dashboard/create-agent/components/GradientButton"
import { useAppDispatch } from "@/redux/hooks"
import { useUser } from "@clerk/nextjs"

import { Get_Agent_And_Course_By_Id, Get_User } from "@/lib/query"
import { useQuery } from "@apollo/client"
import axios from "axios"
import { setter } from "@/redux/features/dto/dataTransferSlice"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { setTopic } from "@/redux/features/startTopic/topicSlice"

interface Topic {
  title: string
  status: "completed" | "in-progress" | "remaining"
  _id: string
  answer?: string
}

interface Section {
  _id: string
  topics: Topic[]
}

interface CourseOutlineSheetProps {
  children?: React.ReactNode
  userId: any
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

export function CourseOutlineSheet({ children, userId, credit, refetching }: any) {
  const { user } = useUser()
  const [open, setOpen] = useState(false)
  const [course, setCourse] = React.useState<Section[]>([])
  const [agentData, setAgntData] = React.useState<any>("")
  const [Loading, setLoading] = React.useState(false)
  const [docId, setDocId] = React.useState<any>("")
  const dispatch = useAppDispatch()
  const router = useRouter()
  const {
    data,
    loading,
    error,
    refetch: refetchAgent,
  } = useQuery(Get_Agent_And_Course_By_Id(), {
    variables: { _id: userId },
  })

  const {
    data: credits,
    loading: load,
    error: err,
    refetch: fetch,
  } = useQuery(Get_User, {
    variables: user?.id ? { descopeId: user.id } : undefined,
    skip: true,
  })

  useEffect(() => {
    if (user?.id) {
      fetch()
    }
  }, [user, fetch])

  React.useEffect(() => {
    if (userId) {
      refetchAgent({ _id: userId })
        .then((data: any) => {
          setAgntData(data.data.getAgentAndCourseById)
          console.log(data.data.getAgentAndCourseById.course)
          // setDocId(data.data.getAgentAndCourseById._id)
          setCourse(data.data.getAgentAndCourseById.course)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }, [userId, refetchAgent])

  const updateTopicStatus = async (
    sectionIndex: number,
    topicIndex: number,
    newStatus: Topic["status"],
    docId: string,
    courseId: string,
    topicId: string,
  ) => {
    // Update the local state first
    setCourse((prevCourse) => {
      const updatedCourse = prevCourse.map((section, idx) => {
        if (idx === sectionIndex) {
          return {
            ...section,
            topics: section.topics.map((topic, tIdx) => {
              if (tIdx === topicIndex) {
                return { ...topic, status: newStatus }
              }
              return topic
            }),
          }
        }
        return section
      })

      setTimeout(() => {
        const updatedSection = updatedCourse[sectionIndex]
        const allCompleted = updatedSection.topics.every((topic) => topic.status === "completed")
        updateSectionCompletionStatus(sectionIndex, allCompleted)
      }, 0)

      return updatedCourse
    })

    await updateData(newStatus, courseId, topicId, userId)
  }

  const getStatusIcon = (status: Topic["status"]) => {
    switch (status) {
      case "completed":
        return <Check className="h-4 w-4 text-green-500" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-500" />
      default:
        return <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
    }
  }

  const getStatusText = (status: Topic["status"]) => {
    switch (status) {
      case "completed":
        return "Completed"
      case "in-progress":
        return "In Progress"
      default:
        return "Remaining"
    }
  }
  const updateSectionCompletionStatus = async (sectionIndex: number, isCompleted: boolean) => {
    const section = course[sectionIndex]
    console.log("isComplete", isCompleted)
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_AI4ALL_SERVER}agent/courseTopicCompleteStatus?docId=${userId}&status=${isCompleted}&courseId=${section._id}`,
      )
      console.log("response", response)
      if (response.data.success) {
        console.log("Section completion status updated successfully")
      } else {
        console.error("Failed to update section completion status")
      }
    } catch (error) {
      console.error("Error updating section completion status:", error)
    }
  }
  const updateData = async (status: string, courseId: string, topicId: string, docId: string) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_AI4ALL_SERVER}agent/courseTopicStatusUpdate`, {
        params: { status, courseId, topicId, docId },
      })
      if (response.data.success) {
        console.log("Updated")
      } else {
        console.log("Error")
      }
    } catch (error) {
      console.log("Error", error)
    }
  }
  const [idx, setIdx] = useState(0)
  const [expandedTopics, setExpandedTopics] = useState<number[]>(Array(course.length).fill(-1))

  const getTopicSummary = (topic: Topic) => {
    // Use topic.answer if available, otherwise fall back to dummy summaries
    if (topic.answer) return topic.answer

    const summaries: { [key: string]: string } = {
      "Overview of Mathematics":
        "A comprehensive introduction to the fundamental concepts and branches of mathematics, exploring its historical development and significance in various fields.",
      "Importance of Math in Daily Life":
        "Discover how mathematical concepts are applied in everyday situations, from budgeting and cooking to technology and problem-solving.",
      "Branches of Mathematics":
        "Explore the diverse fields within mathematics including algebra, geometry, calculus, statistics, and number theory, and their unique applications.",
    }

    return summaries[topic.title] || `This topic covers key concepts and principles related to ${topic.answer}.`
  }

  const downloadDocx = async () => {
    try {
        const response = await axios.post(
            `https://brandsblitz.xyz/service1/docx/ai4allCourseOutline`,
            { agentId: userId },
            { responseType: "arraybuffer" }
        );

        if (response.status === 200) {
            toast.success("File Downloaded", toastStyles.success);

            const blob = new Blob([response.data], {
                type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            });

            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = "courseoutline.docx";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            toast.error("Downloading Failed", toastStyles.error);
        }
    } catch (error: any) {
        toast.error(error.response?.data?.msg || "Something went wrong!", toastStyles.error);
    }
};

  async function startQuiz(courseIndex: number) {
    setLoading(true)
    setIdx(courseIndex)
    const topicsInsideCourseIndex = agentData.course[courseIndex].topics
    const { data } = await fetch()
    console.log("updated", data?.getUser?.credits)
    // let tokens = getUser.getUser.credits
    if (data?.getUser?.credits < 500) return toast.error("Insufficent credits", toastStyles.error)
    let topics = ""
    for (const titles of topicsInsideCourseIndex) {
      topics += titles.title + " "
    }
    const quizData = {
      subject: agentData.subjectName,
      totalQuestions: 20,
      difficulty: agentData.difficulty,
      type: agentData.educationLevel,
      subBranch: "",
      usState: "",
      topic: topics,
      level: agentData.educationLevel,
    }

    dispatch(setter(quizData))
    setLoading(false)

    router.push("/dashboard/quiz/new/startQuiz")
  }



  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children || (
          <Button variant="ghost" size="icon" className="text-white">
            <PlayCircle className="h-6 w-6" />
          </Button>
        )}
      </SheetTrigger>
      <SheetContent side="left" className=" bg-[#1a1a1a] border-r border-purple-900/50 overflow-y-auto ">
        <div className="space-y-8 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Course Outline</h2>
            <Button
  variant="outline"
  size="sm"
  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-none shadow-md shadow-purple-900/30 transition-all duration-300 flex items-center gap-1.5 px-4 py-2 rounded-full"
  onClick={() => {
    downloadDocx()
  }}
>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="animate-pulse"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
  Download All
</Button>
          </div>
          <div className="space-y-6">
            {course.map((section: Section, sectionIndex: number) => (
              <div key={sectionIndex} className="rounded-xl bg-white/5 p-4">
                <div className="flex items-center justify-between mb-4">
                  <GradientButton
                    className="cursor-pointer"
                    disabled={!section.topics.every((topic) => topic.status === "completed")}
                    onClick={() => startQuiz(sectionIndex)}
                  >
                    {Loading && idx === sectionIndex ? <Loader2 className="animate-spin" /> : "Quiz"}
                  </GradientButton>
                  <div
                    className={`w-12 h-6 flex items-center ${
                      section.topics.every((topic) => topic.status === "completed") ? "bg-purple-500" : "bg-gray-600"
                    } rounded-full p-1 cursor-pointer`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                        section.topics.every((topic) => topic.status === "completed")
                          ? "translate-x-6"
                          : "translate-x-0"
                      }`}
                    ></div>
                  </div>
                </div>
                <div className="space-y-3">
                  {section.topics.map((topic: Topic, topicIndex: number) => (
                    <div key={topicIndex} className="border border-gray-800 rounded-lg overflow-hidden mb-3">
                      <div
                        className="flex items-center justify-between cursor-pointer p-3 bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
                        onClick={() => {
                          const newExpandedTopics = [...expandedTopics]
                          newExpandedTopics[sectionIndex] =
                            newExpandedTopics[sectionIndex] === topicIndex ? -1 : topicIndex
                          setExpandedTopics(newExpandedTopics)
                        }}
                      >
                        <div className="flex items-center gap-3">
                          {getStatusIcon(topic.status)}
                          <span className="text-gray-200">{topic.title}</span>
                        </div>
                        <ChevronDown
                          className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                            expandedTopics[sectionIndex] === topicIndex ? "transform rotate-180" : ""
                          }`}
                        />
                      </div>

                      {expandedTopics[sectionIndex] === topicIndex && (
                        <div className="p-4 space-y-4 bg-gray-800/10 border-t border-gray-800">
                          <div className="text-sm text-gray-400 leading-relaxed">{getTopicSummary(topic)}</div>
                          <div className="flex items-center justify-between">
                            {/* <button
                              onClick={() => {
                                dispatch(setTopic(`I wanna ask some questions about ${topic.title}`))
                                setOpen(false)
                              }}
                              className="bg-gray-700 hover:bg-gray-600 transition-colors cursor-pointer rounded-full py-1.5 px-5 text-sm font-medium text-white"
                            >
                              Start
                            </button> */}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className={`text-sm rounded-full px-4 ${
                                    topic.status === "completed"
                                      ? "text-green-500 bg-green-500/10 hover:bg-green-500/20"
                                      : topic.status === "in-progress"
                                        ? "text-blue-500 bg-blue-500/10 hover:bg-blue-500/20"
                                        : "text-gray-400 bg-gray-500/10 hover:bg-gray-500/20"
                                  }`}
                                >
                                  {getStatusText(topic.status)}
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-gray-900 border border-gray-700">
                                <DropdownMenuItem
                                  className="hover:bg-gray-800 focus:bg-gray-800"
                                  onClick={() =>
                                    updateTopicStatus(
                                      sectionIndex,
                                      topicIndex,
                                      "completed",
                                      docId,
                                      section._id,
                                      topic._id,
                                    )
                                  }
                                >
                                  <Check className="mr-2 h-4 w-4 text-green-500" /> Completed
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="hover:bg-gray-800 focus:bg-gray-800"
                                  onClick={() =>
                                    updateTopicStatus(
                                      sectionIndex,
                                      topicIndex,
                                      "in-progress",
                                      docId,
                                      section._id,
                                      topic._id,
                                    )
                                  }
                                >
                                  <Clock className="mr-2 h-4 w-4 text-blue-500" /> In Progress
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="hover:bg-gray-800 focus:bg-gray-800"
                                  onClick={() =>
                                    updateTopicStatus(
                                      sectionIndex,
                                      topicIndex,
                                      "remaining",
                                      docId,
                                      section._id,
                                      topic._id,
                                    )
                                  }
                                >
                                  <div className="mr-2 h-4 w-4 rounded-full border-2 border-gray-300" /> Remaining
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export const GradientButton = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, ...props }, ref) => {
  return (
    <Button
      className={cn(
        "gradient-button bg-gradient-to-r from-purple-500 to-pink-500 text-white",
        className,
        props.disabled && "opacity-50 cursor-not-allowed",
      )}
      ref={ref}
      {...props}
    />
  )
})
GradientButton.displayName = "GradientButton"

