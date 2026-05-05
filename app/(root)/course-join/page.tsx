import JoinCourseForm from "./course-join"
import CountdownTimer from "./timer"
import { Rocket, Code, Calendar, Clock } from "lucide-react" 
import Header from "@/app/components/Header" 
import Footer from "@/app/components/Footer"

export default function JoinCoursePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 text-white"> 
    <Header />
      {/* Main Content */}
      <main className="container mx-auto py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-2">
              <Rocket className="text-pink-500" size={28} />
              <h1 className="text-3xl md:text-4xl font-bold">AI Mentor 4 All Presents:</h1>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-400 mb-4">
              Virtual Summer Coding Camp!
            </h2>
            <p className="text-xl font-medium text-blue-200">Unlock Your Child's Coding Superpowers!</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Column - Course Info */}
            <div className="space-y-8">
              <p className="text-lg">
                Does your child love technology, gaming, and creating? Let them explore the exciting world of coding in
                our 2-week virtual summer coding camp! Designed for kids aged 7 to 15 years old, this program is fun,
                interactive, and packed with hands-on projects!
              </p>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 space-y-4">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <Code className="text-pink-500" />
                  Camp Details:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Calendar className="text-blue-300 mt-1 flex-shrink-0" size={20} />
                    <span>
                      <strong>Duration:</strong> 2 Weeks
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Calendar className="text-blue-300 mt-1 flex-shrink-0" size={20} />
                    <span>
                      <strong>Dates:</strong> June 24 – July 5, 2025 (Tuesdays, Thursdays, and Saturdays)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="text-blue-300 mt-1 flex-shrink-0" size={20} />
                    <span>
                      <strong>Time:</strong> 9:30 AM EST | 8:30 AM CST
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">Registration Closing In:</h3>
                <CountdownTimer targetDate="June 24, 2025" />
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6">Join Our Summer Coding Camp</h2>
              <JoinCourseForm />
            </div>
          </div>
        </div>
      </main> 
      <Footer />
    </div>
  )
}

