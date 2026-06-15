"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Menu } from "lucide-react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Sidebar from "./components/Sidebar"
import { cn } from "@/lib/utils"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Add class to hide scrollbar on mobile
    if (window.innerWidth < 768) {
      document.body.classList.add("no-scrollbar")
    }

    return () => {
      document.body.classList.remove("no-scrollbar")
    }
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  if (!isClient) return null // Avoid hydration mismatch

  // ✅ `<body>` ko `<div>` mein change kiya
  return (
    <div className="bg-gradient-to-br from-purple-800 to-black text-white overflow-hidden h-screen">
      {/* Mobile-only Navbar */}
      <nav className="md:hidden fixed top-0 left-0 right-0 h-16 bg-black/50 backdrop-blur-md z-40 flex items-center justify-between px-4 border-b border-white/10">
        <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-white/10" aria-label="Toggle sidebar">
          <Menu className="h-6 w-6" />
        </button>
        <div className="font-bold text-xl">Ai4All</div>
        <div className="w-10"></div> {/* Empty div for balanced spacing */}
      </nav>

      <div className="flex h-full">
        {/* Mobile Sidebar with overlay */}
        <div
          className={cn(
            "fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300",
            isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
          onClick={toggleSidebar}
        />

        {/* Sidebar - fixed on all screen sizes */}
        <div
          className={cn(
            "fixed top-0 bottom-0 left-0 w-64 z-50 transition-transform duration-300 ease-in-out bg-gradient-to-b from-purple-900 to-black h-full overflow-y-auto",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full",
            "md:translate-x-0", // Always visible on desktop
          )}
        >
          <div className="md:pt-0 pt-16">
            {" "}
            {/* Add padding-top only on mobile */}
            <Sidebar />
          </div>
        </div>

        {/* Main content area with padding/margin to account for fixed sidebar */}
        <div className="flex-1 md:ml-64 pt-16 md:pt-0 overflow-y-auto h-full">
          <main className="p-4">{children}</main>
        </div>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </div>
  )
}