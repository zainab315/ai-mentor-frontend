'use client'
import React from 'react';
import Link from 'next/link';
import { Brain, Target,LaptopMinimal , Users, Award, BookOpen, Video, Trophy, Heart, Star, CheckCircle, BarChart, MessageSquare, Lightbulb, Clock, ClipboardCheck, GraduationCap, LineChart, Zap, PenTool, Gauge } from 'lucide-react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Stat {
  number: string;
  label: string;
}

interface Testimonial {
  name: string;
  role: string;
  image: string;
  quote: string;
  rating: number;
}

interface ExamFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

export default function Home() {

  const { isSignedIn } = useUser();
  const router = useRouter()
  function naviagte(){
    if(isSignedIn){
      router.push('/dashboard')
    }else{
      router.push('/sign-in')
    }
  }

  const features: Feature[] = [
    {
      icon: <Brain className="h-8 w-8 text-[#FA0787]" />,
      title: "AI-Powered Learning",
      description: "Personalized mentors adapt to your unique learning style and pace"
    },
    {
      icon: <Target className="h-8 w-8 text-[#FA0787]" />,
      title: "Custom Learning Paths",
      description: "Tailored curriculum aligned with your educational goals"
    },
    {
      icon: <ClipboardCheck className="h-8 w-8 text-[#FA0787]" />,
      title: "Smart Assessment",
      description: "AI-driven quizzes and tests that adapt to your knowledge level"
    },
    {
      icon: <Video className="h-8 w-8 text-[#FA0787]" />, // Changed color to green to indicate success
      title: 'Now Live! 🎉',
      description: "Our new feature is here! Start exploring now."
    }
    
    // {
    //   icon: <Trophy className="h-8 w-8 text-[#FA0787]" />,
    //   title:'Coming Soon 🔒🔒',
    //   description: "Coming Soon...!"
    // },
    // {
    //   icon: <MessageSquare className="h-8 w-8 text-[#FA0787]" />,
    //   title:'Coming Soon 🔒',
    //   description: "Coming Soon...!"
    // }
  ];

  const stats: Stat[] = [
    { number: "100+", label: "Active Students" },
    { number: "50+", label: "AI Mentors" },
    { number: "10K+", label: "Daily Quizzes Taken" },
    { number: "95%", label: "Success Rate" }
  ];

  const testimonials: Testimonial[] = [
    {
      name: "Sarah Johnson",
      role: "High School Student",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150",
      quote: "AI Mentor helped me improve my SAT score by 200 points! The personalized practice tests were exactly what I needed.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "College Student",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150",
      quote: "The standardized test preparation features are incredible. I felt fully prepared for my exams.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Parent",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150",
      quote: "My children's grades have significantly improved since using AI Mentor. The practice quizzes are especially helpful.",
      rating: 5
    }
  ];

  const examFeatures: ExamFeature[] = [
    {
      icon: <PenTool className="h-12 w-12 text-[#FA0787]" />, 
      title: "State-Standardized Practice Tests & Homework Assistance",
      description: "Comprehensive preparation for state exams and homework support",
      features: [
        "Homework Upload via Camera or File – Students can scan or upload assignments for review.",
        "AI Step-by-Step Explanations – Provides detailed breakdowns of problem-solving steps.",
        "Handwriting Recognition – Reads handwritten assignments for automatic grading.",
        "Instant Feedback & Corrections – AI suggests improvements and corrects mistakes."
      ]
    },
    {
      icon: <Gauge className="h-12 w-12 text-[#FA0787]" />, 
      title: "Smart Assessment & Feedback System",
      description: "AI-driven quizzes, grading, and personalized learning paths",
      features: [
        "AI-Generated Quizzes & Tests – Creates quizzes based on student learning progress.",
        "Instant Grading & Personalized Reports – Evaluates performance and provides feedback.",
        "Goal-Based Learning Paths – Adapts lessons to match student goals and strengths.",
        "Tailored Curriculum – Aligns learning journeys with specific academic standards and school requirements."
      ]
    },
    {
      icon: <GraduationCap className="h-12 w-12 text-[#FA0787]" />, 
      title: "Customization & AI Tutoring",
      description: "Personalized learning with AI-driven tutoring and topic customization",
      features: [
        "Topic Customization – Enables students to focus on specific subjects for targeted learning.",
        "Live AI Tutoring & Explanations – Provides real-time, step-by-step explanations for incorrect answers."
      ]
    },
    {
      icon: <BookOpen className="h-12 w-12 text-[#FA0787]" />, 
      title: "Quiz & Exam Preparation",
      description: "Get ready for important tests and exams with focused preparation",
      features: [
        "Full-length practice exams.",
        "Score predictions.",
        "Weakness identification.",
        "Study plans."
      ]
    },
    {
      icon: <LaptopMinimal  className="h-12 w-12 text-[#FA0787]" />, 
      title: "Virtual Lab (Coming Soon)",
      description: "Interactive virtual labs for hands-on learning and experimentation",
      features: [
        "Cloud computing access for learning new operating systems through the command line, including Ubuntu, Kali Linux, and more.",
        "Simulated lab environments for practical learning.",
        "Practice practically on our web platform like a compiler for coding and problem-solving."
      ]
    }
  ];


  return ( 
    <> 
  <Header/>
    <div className="min-h-screen"> 
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-[#123FB8] to-[#440C73] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop')] opacity-10 bg-cover bg-center" />
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Transform Your Learning Journey with AI Mentors
              </h1>
              <p className="text-lg sm:text-xl text-gray-200">
                Experience personalized education powered by advanced AI technology. Get instant help,
                track your progress, and achieve your goals faster than ever.
              </p>
              <div className="flex flex-wrap gap-4">
                <span
                  onClick={naviagte}
                  className="bg-[#FA0787] cursor-pointer text-white px-6 sm:px-8 py-3 rounded-full hover:bg-[#440C73] transition-colors inline-block text-sm sm:text-base"
                >
                  Start Learning Free
                </span>
                <Link
                  href="/features"
                  className="bg-white text-[#123FB8] px-6 sm:px-8 py-3 rounded-full hover:bg-gray-100 transition-colors inline-block text-sm sm:text-base"
                >
                  Explore Features
                </Link>
              </div>
            </div>
            <div className="hidden md:block ">
              <img
                src="/hero.avif"
                alt="Students learning"
                className="rounded-2xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>
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

      {/* Exam and Quiz Features */}
      <section className="py-20 bg-gradient-to-br from-[#123FB8] to-[#440C73] text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Comprehensive Test Preparation
            </h2>
            <p className="text-lg sm:text-xl text-gray-200">
              From state standardized practice tests to subject-specific quizzes, we've got you covered
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {examFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white/10  p-6 sm:p-8 rounded-xl"
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-200 mb-6">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.features.map((item, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-[#FA0787] mr-2" />
                      <span className="text-sm sm:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#123FB8] mb-6">
              Why Choose Ai Mentor?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Our platform combines cutting-edge AI technology with proven educational methods
              to deliver an unmatched learning experience.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-white p-6 ${index>2 ? " " : ""}  sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300`}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg sm:text-xl text-black font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-[#123FB8] to-[#440C73] text-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Transform Your Learning?</h2>
          <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already experiencing the future of education
            with AI Mentor. Start your journey today!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span
              onClick={naviagte}
              className="bg-[#FA0787] cursor-pointer text-white px-6 sm:px-8 py-3 rounded-full hover:bg-[#440C73] transition-colors inline-block text-sm sm:text-lg"
            >
              Get Started Free
            </span>
            <Link
              href="/contact"
              className="bg-white text-[#123FB8] px-6 sm:px-8 py-3 rounded-full hover:bg-gray-100 transition-colors inline-block text-sm sm:text-lg"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#123FB8] mb-6">
              What Our Students Say
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Real feedback from students who have transformed their learning experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-lg text-[#123FB8]">{testimonial.name}</h3>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 inline-block" />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
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

