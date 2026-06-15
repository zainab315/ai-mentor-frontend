"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Code,
  Terminal,
  Play,
  Save,
  RefreshCw,
  Download,
  Share2,
  Folder,
  FileCode,
  Settings,
  PlusCircle,
  Cpu,
  Database,
  Server,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const programmingLanguages = [
  { name: "JavaScript", value: "javascript" },
  { name: "Python", value: "python" },
  { name: "Java", value: "java" },
  { name: "C++", value: "cpp" },
  { name: "HTML/CSS", value: "html" },
]

const projects = [
  { name: "Hello World", language: "javascript", lastEdited: "2 days ago" },
  { name: "Data Structures", language: "python", lastEdited: "1 week ago" },
  { name: "Web Calculator", language: "html", lastEdited: "3 days ago" },
]

const environments = [
  { name: "Node.js", icon: Server },
  { name: "Python", icon: Cpu },
  { name: "Database", icon: Database },
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function VirtualLab() {
  const [selectedLanguage, setSelectedLanguage] = useState("javascript")
  const [code, setCode] = useState('// Write your code here\nconsole.log("Hello, World!");')
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)

  const handleRunCode = () => {
    setIsRunning(true)
    setOutput("> Running code...\n")

    // Simulate code execution
    setTimeout(() => {
      setOutput("> Running code...\n> Hello, World!\n> Process completed successfully.")
      setIsRunning(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-black text-white p-4 md:p-12 space-y-8 font-sans">
      <motion.h1
        className="text-4xl md:text-6xl font-extrabold mb-12 text-white"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Virtual Lab
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar */}
        <motion.div
          className="lg:col-span-1 space-y-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white border-opacity-20">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Folder className="mr-2 h-5 w-5 text-purple-400" />
              My Projects
            </h2>

            <div className="space-y-3 mt-4">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  className="p-3 rounded-lg bg-white bg-opacity-5 hover:bg-opacity-10 cursor-pointer transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center">
                    <FileCode className="h-4 w-4 mr-2 text-purple-400" />
                    <span className="font-medium">{project.name}</span>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-400">
                    <span>{project.language}</span>
                    <span>{project.lastEdited}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 border-none">
              <PlusCircle className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white border-opacity-20">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Settings className="mr-2 h-5 w-5 text-purple-400" />
              Environment
            </h2>

            <div className="space-y-3 mt-4">
              {environments.map((env, index) => (
                <motion.div
                  key={index}
                  className="p-3 rounded-lg bg-white bg-opacity-5 hover:bg-opacity-10 cursor-pointer transition-all duration-300 flex items-center"
                  whileHover={{ scale: 1.02 }}
                >
                  <env.icon className="h-5 w-5 mr-3 text-purple-400" />
                  <span className="font-medium">{env.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="lg:col-span-3 space-y-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Top Controls */}
          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-white border-opacity-20 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-[180px] bg-white bg-opacity-5 border-white border-opacity-20">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  {programmingLanguages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="bg-white bg-opacity-5 border-white border-opacity-20 hover:bg-white hover:bg-opacity-10"
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Save</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="bg-white bg-opacity-5 border-white border-opacity-20 hover:bg-white hover:bg-opacity-10"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Download</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="bg-white bg-opacity-5 border-white border-opacity-20 hover:bg-white hover:bg-opacity-10"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <Button
              onClick={handleRunCode}
              disabled={isRunning}
              className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 border-none"
            >
              {isRunning ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Play className="h-4 w-4 mr-2" />}
              {isRunning ? "Running..." : "Run Code"}
            </Button>
          </div>

          {/* Code Editor and Terminal */}
          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl border border-white border-opacity-20 overflow-hidden">
            <Tabs defaultValue="editor" className="w-full">
              <div className="border-b border-white border-opacity-20 px-4">
                <TabsList className="bg-transparent">
                  <TabsTrigger
                    value="editor"
                    className="data-[state=active]:bg-white data-[state=active]:bg-opacity-10"
                  >
                    <Code className="h-4 w-4 mr-2" />
                    Editor
                  </TabsTrigger>
                  <TabsTrigger
                    value="terminal"
                    className="data-[state=active]:bg-white data-[state=active]:bg-opacity-10"
                  >
                    <Terminal className="h-4 w-4 mr-2" />
                    Terminal
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="editor" className="p-0 m-0">
                <div className="relative h-[60vh]">
                  <div className="absolute top-0 left-0 w-full h-full">
                    <textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full h-full bg-black bg-opacity-70 text-white p-4 font-mono text-sm resize-none focus:outline-none"
                      spellCheck="false"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="terminal" className="p-0 m-0">
                <div className="h-[60vh] bg-black bg-opacity-70 p-4 font-mono text-sm text-green-400 overflow-auto">
                  {output || "> Terminal ready. Run your code to see output here."}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Resources */}
          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white border-opacity-20">
            <h2 className="text-xl font-bold mb-4">Learning Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                className="p-4 rounded-lg bg-white bg-opacity-5 hover:bg-opacity-10 cursor-pointer transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="font-bold">Documentation</h3>
                <p className="text-sm text-gray-300 mt-1">Official language references and guides</p>
              </motion.div>
              <motion.div
                className="p-4 rounded-lg bg-white bg-opacity-5 hover:bg-opacity-10 cursor-pointer transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="font-bold">Tutorials</h3>
                <p className="text-sm text-gray-300 mt-1">Step-by-step coding lessons</p>
              </motion.div>
              <motion.div
                className="p-4 rounded-lg bg-white bg-opacity-5 hover:bg-opacity-10 cursor-pointer transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="font-bold">Challenges</h3>
                <p className="text-sm text-gray-300 mt-1">Practice with coding exercises</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

