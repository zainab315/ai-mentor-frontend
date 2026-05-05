"use client"

import { useState, useEffect, useRef } from "react"
import { Loader2, X, Play, Pause, Download } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"

interface PresentationModalProps {
  isOpen: boolean
  onClose: () => void
  onDeduct: () => void
  topic: string
  userId: string
}

export const PresentationModal = ({ isOpen, onClose, onDeduct, topic, userId }: PresentationModalProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (isOpen) {
      const generatePresentation = async () => {
        try {
          const dataSent = {
            userId: userId,
            topic: topic,
          }
          abortControllerRef.current = new AbortController()
          console.log(userId, topic)

          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_AI4ALL_PYTHON_SERVER}/generate_presentation`,
            dataSent,
            {
              responseType: "arraybuffer",
              signal: abortControllerRef.current.signal,
            },
          )

          if (response.data) {
            onDeduct()

            const blob = new Blob([response.data], { type: "video/mp4" })
            const url = URL.createObjectURL(blob)

            setVideoUrl(url)
            setIsLoading(false)
          }
        } catch (error) {
          if (axios.isCancel(error)) {
            console.log("Request aborted:", error.message)
          } else {
            console.error("Error generating presentation:", error)
            setIsLoading(false)
          }
        }
      }

      generatePresentation()
    } else {
      // Clean up video URL when modal closes
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl)
        setVideoUrl(null)
      }
      setIsLoading(true)
      setIsPlaying(false)
    }

    return () => {
      if (abortControllerRef.current) {
        console.log("Aborting request...")
        abortControllerRef.current.abort()
        abortControllerRef.current = null
      }

      // Clean up video URL on unmount
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl)
      }
    }
  }, [isOpen, topic, userId, onDeduct])

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleDownload = () => {
    if (videoUrl) {
      const a = document.createElement("a")
      a.href = videoUrl
      a.download = `presentation.mp4`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  // Update isPlaying state when video plays or pauses
  const handleVideoPlay = () => setIsPlaying(true)
  const handleVideoPause = () => setIsPlaying(false)

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 20 }}
            className="relative z-[10000] w-full max-w-md mx-auto"
          >
            <div className="bg-gradient-to-b from-gray-900 to-black border border-purple-500/20 rounded-xl shadow-xl overflow-hidden">
              <div className="relative p-6">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>

                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                    <div className="w-16 h-16 rounded-full bg-purple-900/30 flex items-center justify-center mb-6 border border-purple-500/30">
                      <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
                    </div>
                    <h3 className="text-xl font-medium text-white mb-2">Generating Video Presentation</h3>
                    <p className="text-gray-400 max-w-xs">This May Take Few Minutes please wait</p>
                    <div className="mt-8 w-full max-w-xs bg-gray-800/50 h-1.5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{
                          duration: 15,
                          ease: "linear",
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                        className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-500"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-4 px-4">
                    <h3 className="text-xl font-medium text-white mb-4">Your Video Presentation</h3>

                    {/* Video Player */}
                    <div className="relative w-full rounded-lg overflow-hidden bg-black mb-4">
                      <video
                        ref={videoRef}
                        src={videoUrl || undefined}
                        className="w-full h-auto"
                        onPlay={handleVideoPlay}
                        onPause={handleVideoPause}
                      />

                      {/* Play/Pause Overlay */}
                      <button
                        onClick={handlePlayPause}
                        className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-full bg-purple-600/80 flex items-center justify-center">
                          {isPlaying ? (
                            <Pause className="w-6 h-6 text-white" />
                          ) : (
                            <Play className="w-6 h-6 text-white ml-1" />
                          )}
                        </div>
                      </button>
                    </div>

                    {/* Download Button */}
                    <button
                      onClick={handleDownload}
                      className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-lg text-white font-medium hover:from-purple-700 hover:to-fuchsia-700 transition-colors"
                    >
                      <Download size={18} />
                      Download Presentation
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
