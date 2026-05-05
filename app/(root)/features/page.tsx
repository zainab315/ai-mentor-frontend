'use client'
import React from 'react';
import { Brain, Video, Layout, Trophy } from 'lucide-react';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function Features() {
  const { isSignedIn } = useUser();
  const router = useRouter()
  function naviagte(){
    if(isSignedIn){
      router.push('/dashboard')
    }else{
      router.push('/sign-in')
    }
  }
  const features = [
    {
      icon: <Brain className="h-12 w-12 text-[#FA0787]" />,
      title: "Personalized AI Mentors",
      description: "Subject and grade-specific AI agents that adapt to your learning style and pace.",
      details: ["Customized learning paths", "Real-time feedback", "Progress tracking"]
    },
    {
      icon: <Video className="h-12 w-12 text-[#FA0787]" />,
      title: "Interactive Learning",
      description: "Multi-format content delivery for enhanced understanding and engagement.",
      details: ["Video explanations", "Audio lessons", "Interactive exercises"]
    },
    {
      icon: <Layout className="h-12 w-12 text-[#FA0787]" />,
      title: "Customizable Learning Paths",
      description: "Tailored curriculum aligned with your school's requirements.",
      details: ["Flexible scheduling", "Topic customization", "Progress monitoring"]
    },
    {
      icon: <Trophy className="h-12 w-12 text-[#FA0787]" />,
      title: "Gamified Learning",
      description: "Earn points and unlock achievements as you learn and progress.",
      details: [
        "Achievement badges",
        "Learning streaks",
        "Reward games",
        "Virtual Lab - Students can come and practice their tasks in the virtual lab"
      ]
    }
    
    // {
    //   icon: <Accessibility className="h-12 w-12 text-[#FA0787]" />,
    //   title: "Coming Soon 🔒",
    //   description: "Inclusive learning tools for students of all abilities.",
    //   details: ["Voice navigation", "Screen reader support", "High contrast mode"]
    // },
    // {
    //   icon: <MessageSquare className="h-12 w-12 text-[#FA0787]" />,
    //   title: "Coming Soon 🔒",
    //   description: "Always-available assistance for uninterrupted learning.",
    //   details: ["Instant responses", "Detailed explanations", "Follow-up questions"]
    // }
  ];

  const stats = [
    { number: "1M+", label: "Active Students" },
    { number: "50+", label: "AI Mentors" },
    { number: "100K+", label: "Daily Quizzes Taken" },
    { number: "95%", label: "Success Rate" }
  ];


  return ( 
    <> 
    <Header/>
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#123FB8] to-[#440C73] py-20 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Features that Transform Learning
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Discover how AI Mentor revolutionizes education with cutting-edge technology
              and personalized learning experiences.
            </p>
            <span
              onClick={naviagte}
              className="bg-[#FA0787] cursor-pointer text-white px-8 py-3 rounded-full hover:bg-[#440C73] transition-colors inline-block"
            >
              Get Started
            </span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl ${index>2 ? " " : ""} shadow-lg p-8 hover:shadow-xl transition-shadow`}
              >
                
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-2xl  font-bold mb-4 text-[#123FB8]">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <div className="w-1.5 h-1.5 bg-[#FA0787] rounded-full mr-2" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* CTA Section */}
      <section className="py-20 bg-[#123FB8] text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Experience These Features?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already benefiting from AI Mentor's
            innovative learning platform.
          </p>
          <span
            onClick={naviagte}
            className="bg-[#FA0787] cursor-pointer text-white px-8 py-3 rounded-full hover:bg-[#440C73] transition-colors inline-block text-lg"
          >
            Start Learning Now
          </span>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4">
                <div className="text-2xl sm:text-4xl font-bold text-[#123FB8]">{stat.number}</div>
                <div className="text-sm sm:text-base text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>  
    <Footer/>
    </>
  );
}