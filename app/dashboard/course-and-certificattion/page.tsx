"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Download, Share2, Award, CheckCircle, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function CertificatePage() {
  const [mounted, setMounted] = useState(false)
  const [currentDate] = useState(
    new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="dark min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 text-white">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <header className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-200 to-purple-300 mb-4">
              Certificate of Achievement
            </h1>
            <p className="text-purple-200 text-lg max-w-2xl mx-auto">
              Congratulations on successfully completing your advanced skill certification
            </p>
          </motion.div>
        </header>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-purple-800/40 to-purple-900/40 backdrop-blur-sm rounded-2xl shadow-[0_0_30px_rgba(139,92,246,0.3)] p-1">
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] opacity-5 bg-center bg-cover"></div>

            <div className="relative p-8 md:p-12 border border-purple-500/30 rounded-xl bg-gradient-to-br from-purple-950/80 to-purple-900/80 backdrop-blur-md">
              {/* Certificate Border Design */}
              <div className="absolute inset-0 border-[1px] border-purple-400/20 rounded-xl"></div>
              <div className="absolute inset-[3px] border-[1px] border-purple-400/10 rounded-xl"></div>

              {/* Corner Decorations */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-pink-400/30 rounded-tl-xl"></div>
              <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-pink-400/30 rounded-tr-xl"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-pink-400/30 rounded-bl-xl"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-pink-400/30 rounded-br-xl"></div>

              <div className="flex flex-col items-center text-center">
                <div className="mb-6">
                  <Award className="h-16 w-16 text-purple-300 mb-2" />
                  <h2 className="text-xl text-purple-300 font-semibold uppercase tracking-widest">
                    Official Certificate
                  </h2>
                </div>

                <div className="w-full max-w-2xl mx-auto mb-8">
                  <h3 className="text-2xl font-light text-purple-100 mb-1">This certifies that</h3>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-serif">Alexandra Johnson</h2>

                  <p className="text-purple-200 mb-6">has successfully completed the</p>

                  <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-200 to-pink-300 mb-6">
                    Advanced UI/UX Design Masterclass
                  </h2>

                  <div className="flex justify-center gap-2 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 fill-purple-300 text-purple-300" />
                    ))}
                  </div>

                  <p className="text-purple-200 mb-8">
                    Demonstrating exceptional proficiency in user interface design, interaction patterns, and creating
                    seamless user experiences.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="border border-purple-500/20 rounded-lg p-4 backdrop-blur-sm bg-purple-900/20">
                      <p className="text-purple-300 text-sm mb-1">COURSE DURATION</p>
                      <p className="text-white font-medium">120 Hours</p>
                    </div>
                    <div className="border border-purple-500/20 rounded-lg p-4 backdrop-blur-sm bg-purple-900/20">
                      <p className="text-purple-300 text-sm mb-1">COMPLETION DATE</p>
                      <p className="text-white font-medium">{currentDate}</p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-6 border-t border-purple-500/20">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-purple-200 text-sm">Verified Certificate</span>
                    </div>
                    <div className="text-center">
                      <p className="text-purple-300 text-sm mb-1">CERTIFICATE ID</p>
                      <p className="text-white font-mono text-sm">UXD-2023-8A7B9C</p>
                    </div>
                    <div>
                      <img
                        src="/placeholder.svg?height=60&width=120"
                        alt="Digital Signature"
                        className="h-12 opacity-80"
                      />
                      <p className="text-purple-300 text-sm">Course Director</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-4 mt-6">
                  <Button className="bg-purple-700 hover:bg-purple-600 text-white rounded-full px-6">
                    <Download className="mr-2 h-4 w-4" />
                    Download Certificate
                  </Button>
                  <Button
                    variant="outline"
                    className="border-purple-500 text-purple-300 hover:bg-purple-800 hover:text-purple-200 rounded-full px-6"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="mt-12 text-center">
          <p className="text-purple-300 mb-4">Ready to showcase your new skills?</p>
          <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white rounded-full px-8 py-6 text-lg">
            Explore Advanced Courses
          </Button>
        </div>
      </div>
    </div>
  )
}

