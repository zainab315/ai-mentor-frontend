"use client"

import * as React from "react"
import { History, ChevronRight, X, Plus, Trash2 , Loader2 } from "lucide-react"
import { toggleSidebar } from "@/redux/features/chatBox/chatBox"
import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import { useEffect } from "react"
import { setMessages } from "@/redux/features/openAI/messageSlice" 
import { setFirstMessageID } from "@/redux/features/firstMessageSlice/firstMessageSlice"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { capitalizeCustom } from "@/lib/methods"
import { setEmpty } from "@/redux/features/openAI/messageSlice"
import { useUser } from "@clerk/nextjs" 
import { setHistoryMessage } from "@/redux/features/firstMessageSlice/firstMessageSlice"
import axios from "axios" 
import { setScroll } from "@/redux/features/scrollSlice/scrollSlice"
import { FaceDetection } from "./FaceModel/FaceDetection" 
import { Switch } from "@/components/ui/switch"
interface CompactAgentSidebarProps {
  botName: string
  botAvatar: string
  mainAgent: string
}

export function CompactAgentSidebar({ botName, botAvatar, mainAgent }: CompactAgentSidebarProps) {
  const { user } = useUser(); 
  
  const USERID = user?.id
  const dispatch = useAppDispatch()
  const [history, setHistory] = React.useState<any>([])
  const isOpen = useAppSelector((state) => state.chatbox.isOpen) 


  const [faceDetectionEnabled, setFaceDetectionEnabled] = React.useState(false)

  const videoRef = React.useRef<any>(null)
  const audioRef = React.useRef<HTMLAudioElement | null>(null)
  function lowerCase(str: any) {
    return str.toLowerCase().replace(/[_-]/g, "")
  }

  const fetchHistory = async () => {
    const agentName = lowerCase(mainAgent)
    console.log(agentName, USERID) 
    if (agentName && USERID) {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_AI4ALL_SERVER}history/list/${USERID}/${agentName}`)
    console.log("history", res)
    const historyArray = res.data.slice(-5).reverse();

    setHistory(historyArray);
  } 
}
useEffect(() => { 
  if (USERID && mainAgent) {
    let agentName = lowerCase(mainAgent);
    fetchHistory();
  }
}, [USERID, mainAgent]);  
const [idx , setIndex] = React.useState(null);
  const [loading , setLoading] = React.useState(false);
  const handleDeleteHistory = async (id: string | number , index : any) => {
    try { 
      setIndex(index);
      setLoading(true);
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_AI4ALL_SERVER}history/${id}`)
      console.log("Delete successful:", response) 
      fetchHistory();  
      fetchChat(id);
      setLoading(false);
      // dispatch(toggleSidebar())
    } catch (error) {
      console.error("Error deleting history:", error)
    }
  }

  React.useEffect(() => {
    startCamera()

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks()
        tracks.forEach((track: any) => track.stop())
        // videoRef.current.srcObject = null;
      }
    }
  }, [])
  const handleClick = (data : any) => {
    fetchChat(data._id);
    if (data.title === "CourseOutLine") {
      dispatch(setScroll(true));
    } else {
      dispatch(setScroll(false));
    }
  };
  React.useEffect(() => {
    // Create audio element
    if (!audioRef.current) {
      audioRef.current = new Audio("/audio/alert.mp3")
    }

    // Function to handle visibility change
    const handleVisibilityChange = () => {
      if (faceDetectionEnabled && document.visibilityState === "hidden") {
        // User switched tabs while face detection was enabled
        audioRef.current?.play().catch((err) => {
          console.error("Error playing audio:", err)
        })
      }
    }

    // Add event listener
    document.addEventListener("visibilitychange", handleVisibilityChange)

    // Cleanup
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [faceDetectionEnabled])
  const fetchChat = async (id: any) => { 
    console.log('id',id); 
    dispatch(setHistoryMessage(true))
    const res = await axios.get(`${process.env.NEXT_PUBLIC_AI4ALL_SERVER}history/get/${id}`) 
    const response = JSON.parse(res?.data?.history ?? "[]");
    dispatch(setMessages(response)) 
    dispatch(setFirstMessageID(id))
  }

  async function startCamera() {
    // try {
    //   const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    //   if (videoRef.current) {
    //     videoRef.current.srcObject = stream;
    //   }
    // } catch (err) {
    //   console.error("Error accessing camera:", err);
    // }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-40 xl:hidden"
            onClick={() => dispatch(toggleSidebar())}
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "0" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 w-[310px] h-full flex flex-col overflow-hidden z-50 xl:relative xl:z-0"
          >
            {/* Enhanced Gradient Background */}
            <div
              className="absolute inset-0"
              style={{
                background: `
                  linear-gradient(135deg, 
                    #1a0b2e 0%,
                    #2f1c54 25%,
                    #3b2266 50%,
                    #2f1c54 75%,
                    #1a0b2e 100%
                  )
                `,
                boxShadow: "inset 0 0 100px rgba(138, 43, 226, 0.1)",
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-800/40 via-transparent to-transparent" />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col h-full">
              {/* Close button with enhanced hover effect */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 text-white/80 hover:text-white xl:hidden 
                           hover:bg-white/10 rounded-full p-1 transition-all duration-200"
                onClick={() => dispatch(toggleSidebar())}
              >
                <X className="h-6 w-6" />
              </motion.button>

              {/* Profile Section */}
              <div className="flex items-center justify-center space-x-4 gap-2 mb-4 mt-5">
                Enable Face Detection
                <Switch
                  checked={faceDetectionEnabled}
                  onCheckedChange={setFaceDetectionEnabled}
                  className="relative h-6 w-11 rounded-full transition-colors outline-none
                  data-[state=checked]:bg-purple-600 
                  data-[state=unchecked]:bg-gray-300
                  focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2"
                >
                  <span
                    className="block h-5 w-5 rounded-full shadow-black ring-0 
                    transition-transform duration-200 ease-in-out
                    data-[state=checked]:translate-x-5 
                    data-[state=unchecked]:translate-x-0.5"
                  />
                </Switch>
              </div>
              <div className="px-6 pt-6 pb-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative h-48 w-full mb-2 group"
                >
                  <div
                    className="absolute -inset-1 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-[20px] 
                    blur-md opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse"
                  ></div>

                  <div className="relative w-full h-full rounded-2xl shadow-lg border border-white/10 group-hover:border-white/20 transition-all duration-300 overflow-hidden">
                    {/* Simple Switch at the top */}

                    {/* Face Detection Stream or No Feed Message */}
                    {faceDetectionEnabled ? (
                      <FaceDetection />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-black/30 text-white/70">
                        No feed Available
                      </div>
                    )}
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <Button
onClick={() => { 
  fetchHistory();  
  dispatch(setFirstMessageID(""))
  dispatch(setEmpty());  
  localStorage.removeItem('chatHistory')
}}
                    className="w-full h-10 mb-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 
                             hover:border-white/30 rounded-xl transition-all hover:text-gray-200 duration-200 backdrop-blur-sm
                             flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/20"
                    variant="ghost"
                  >
                    <Plus className="h-4 w-4" />
                    <span>New Chat</span>
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col gap-1"
                >
                  <span className="text-white/70 text-sm font-medium tracking-wide">{capitalizeCustom(mainAgent)}</span>
                </motion.div>
              </div>

              {/* Enhanced History Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex-1 px-6 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
              >
                <div className="flex items-center gap-2 mb-3">
                  <History className="h-4 w-4 text-white/70" />
                  <h3 className="text-white/80 text-sm font-semibold">History</h3>
                </div>
                <div className="space-y-2">
                  {history?.map((data: any, index: any) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group  w-full text-left  rounded-xl"
                    >
                      <div
                        className="flex justify-between p-4 bg-black/20 rounded-xl border border-white/10 
             transition-all duration-200 group-hover:border-white/20 group-hover:bg-white/10"
             onClick={()=>handleClick(data)}

                      >
                        <span
                          className="relative text-sm pointer-events-auto text-white/90 font-medium group-hover:text-white 
               transition-colors duration-200"
                        >
                          {data.title}
                        </span>
                        <button
    onClick={(e) => {
      e.stopPropagation();
      handleDeleteHistory(data._id , index);
    }}
  > 
  {loading && idx === index ? 
   <Loader2 className="animate-spin" /> : 
   <Trash2 size={18} />
   }
  </button>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Enhanced Footer Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="p-6"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative w-full overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-black/20 rounded-xl backdrop-blur-sm" />
                  <div
                    className="relative py-2.5 px-4 rounded-xl text-sm font-medium text-white 
                                transition-all duration-300 border border-white/20 
                                group-hover:bg-white/10 group-hover:border-white/30
                                flex items-center justify-between"
                  >
                    <span>Switch Agent</span>
                    <ChevronRight
                      className="h-4 w-4 opacity-70 group-hover:opacity-100 
                                          transition-all duration-200 transform group-hover:translate-x-0.5"
                    />
                  </div>
                </motion.button>
              </motion.div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

