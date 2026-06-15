'use client'
import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';


export default function AIMentorPlatform() {
  const categories = [
    "Elementary School",
    "Middle School",
    "High School",
    "Undergraduate",
    "Graduate",
  ];

  const { isSignedIn } = useUser();
  const router = useRouter()
  function naviagte(){
    if(isSignedIn){
      router.push('/dashboard')
    }else{
      router.push('/sign-in')
    }
  }

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [agents] = useState<any>({
    "Elementary School": [
      {
        id: 1,
        name: "Language Arts Mentor",
        subjects: ["Reading", "Writing", "Vocabulary", "Grammar"],
        description: "Helps young learners with language development through engaging lessons.",
        image: "one.avif",
      },
      {
        id: 2,
        name: "Mathematics Mentor",
        subjects: ["Basic Arithmetic", "Geometry", "Fractions", "Word Problems"],
        description: "Makes math fun and easy for elementary students.",
        image: "two.jpg",
      },
      {
        id: 3,
        name: "Science Mentor",
        subjects: ["Life Science", "Physical Science", "Earth Science"],
        description: "Explores the wonders of science through interactive activities.",
        image: "three.avif",
      },
      {
        id: 4,
        name: "Art Mentor",
        subjects: ["Drawing", "Painting", "Crafts", "Sculpture"],
        description: "Fosters creativity through hands-on art projects.",
        image: "four.avif",
      },
      {
        id: 5,
        name: "Music Mentor",
        subjects: ["Singing", "Basic Music Theory", "Instrument Exploration"],
        description: "Introduces students to the joys of music and rhythm.",
        image: "five.avif",
      },
      {
        id: 6,
        name: "Physical Education Mentor",
        subjects: ["Movement", "Coordination", "Fitness"],
        description: "Encourages physical activity and teamwork.",
        image: "six.avif",
      },
    ],
    "Middle School": [
      {
        id: 1,
        name: "Language Arts Mentor",
        subjects: ["Reading Comprehension", "Creative Writing", "Grammar"],
        description: "Guides middle school students in mastering language skills.",
        image: "https://img.freepik.com/free-vector/flat-international-mother-language-day-illustration_23-2149250146.jpg?ga=GA1.1.1246748459.1736059899&semt=ais_hybrid",
      },
      {
        id: 2,
        name: "Mathematics Mentor",
        subjects: ["Pre-Algebra", "Geometry", "Statistics", "Ratios"],
        description: "Simplifies complex math concepts for young learners.",
        image: "four.avif",
      },
      {
        id: 3,
        name: "Science Mentor",
        subjects: ["Biology", "Physics", "Earth Science"],
        description: "Makes science engaging with practical examples and experiments.",
        image: "https://img.freepik.com/free-vector/school-physics-teacher-audience-class-lesson-blackboard-college-knowledge-learning-classroom-vector-illustration-flat-education-concept_1284-42698.jpg?t=st=1736509956~exp=1736513556~hmac=1bd52ad0c9577d8e97f864f6b4b6a8fdb33d732f23839679ec762391ad4814c4&w=740",
      },
      {
        id: 4,
        name: "Social Studies Mentor",
        subjects: ["History", "Civics", "World Geography"],
        description: "Explains historical events and teaches critical thinking through civics.",
        image: "https://img.freepik.com/free-photo/international-day-education-cartoon-style_23-2151007486.jpg?ga=GA1.1.1246748459.1736059899&semt=ais_hybrid",
      },
      {
        id: 5,
        name: "Technology Mentor",
        subjects: ["Basic Programming", "Digital Literacy", "Internet Safety"],
        description: "Introduces students to the digital world with interactive coding lessons.",
        image: "https://img.freepik.com/free-photo/international-day-education-futuristic-style_23-2150998656.jpg?ga=GA1.1.1246748459.1736059899&semt=ais_hybrid",
      },
      {
        id: 6,
        name: "Physical Education Mentor",
        subjects: ["Team Sports", "Personal Fitness", "Health"],
        description: "Encourages teamwork and healthy living habits.",
        image: "https://img.freepik.com/free-vector/hand-drawn-gen-alpha-illustration_23-2151256395.jpg?ga=GA1.1.1246748459.1736059899&semt=ais_hybrid",
      },
    ],
    "High School": [
      {
        id: 1,
        name: "Language Arts Mentor",
        subjects: ["Literature", "Essay Writing", "Public Speaking"],
        description: "Supports high school students in excelling at advanced language arts.",
        image: "https://img.freepik.com/free-vector/flat-international-mother-language-day-illustration_23-2149250146.jpg?ga=GA1.1.1246748459.1736059899&semt=ais_hybrid",
      },
      {
        id: 2,
        name: "Mathematics Mentor",
        subjects: ["Algebra", "Calculus", "Trigonometry", "Statistics"],
        description: "Provides in-depth assistance with high school math topics.",
        image: "four.avif",
      },
      {
        id: 3,
        name: "Science Mentor",
        subjects: ["Biology", "Chemistry", "Physics"],
        description: "Helps high school students explore scientific theories and principles.",
        image: "https://img.freepik.com/free-vector/illustrated-scientists-working-laboratory_52683-36445.jpg?ga=GA1.1.1246748459.1736059899&semt=ais_hybrid",
      },
      {
        id: 4,
        name: "Social Studies Mentor",
        subjects: ["World History", "Economics", "Government"],
        description: "Explains critical historical events and teaches governmental systems.",
        image: "https://img.freepik.com/free-photo/international-day-education-cartoon-style_23-2151007486.jpg?ga=GA1.1.1246748459.1736059899&semt=ais_hybrid",
      },
      {
        id: 5,
        name: "Technology Mentor",
        subjects: ["Web Development", "Robotics", "Advanced Coding"],
        description: "Empowers students to build and innovate in technology.",
        image: "https://img.freepik.com/free-photo/international-day-education-futuristic-style_23-2150998656.jpg?ga=GA1.1.1246748459.1736059899&semt=ais_hybrid",
      },
      {
        id: 6,
        name: "Physical Education Mentor",
        subjects: ["Sports Training", "Yoga", "Mindfulness"],
        description: "Focuses on mental and physical well-being through targeted exercises.",
        image: "https://img.freepik.com/free-photo/international-day-education-futuristic-style_23-2150998657.jpg?ga=GA1.1.1246748459.1736059899&semt=ais_hybrid",
      },
    ],
    "Graduate": [
      {
        id: 1,
        name: "Research Mentor",
        subjects: ["Advanced Research Methods", "Thesis Writing"],
        description: "Supports graduate students with their research projects and thesis.",
        image: "https://img.freepik.com/free-vector/isometric-education-background_23-2148089419.jpg?ga=GA1.1.1246748459.1736059899&semt=ais_hybrid",
      },
      {
        id: 2,
        name: "Specialized Mentor",
        subjects: ["Law", "Medicine", "Advanced STEM"],
        description: "Provides expert guidance in specialized graduate-level disciplines.",
        image: "https://img.freepik.com/free-vector/internship-job-illustration_23-2148718493.jpg?ga=GA1.1.1246748459.1736059899&semt=ais_hybrid",
      },
      {
        id: 3,
        name: "Leadership Mentor",
        subjects: ["Organizational Leadership", "Public Policy", "Ethics"],
        description: "Helps graduates develop leadership and ethical decision-making skills.",
        image: "https://img.freepik.com/free-vector/business-coaching-orthogonal_1284-22527.jpg?ga=GA1.1.1246748459.1736059899&semt=ais_hybrid",
      },
      {
        id: 4,
        name: "Technology Mentor",
        subjects: ["Cybersecurity", "AI Applications", "Data Analytics"],
        description: "Assists graduates in excelling in advanced technological fields.",
        image: "https://img.freepik.com/free-vector/e-learning-interactions-illustration-concept_114360-23713.jpg?ga=GA1.1.1246748459.1736059899&semt=ais_hybrid",
      },
    ],
    "Undergraduate": [
      {
        id: 1,
        name: "STEM Mentor",
        subjects: ["Engineering", "Data Science", "AI & ML"],
        description: "Guides undergraduates in mastering STEM subjects.",
        image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhY2h8MXx8ZW5naW5lZXJpbmclMjBhbmQlMjBhcnJvd3xlbnwwfHx8fDE2ODg0Mzk5MDE&ixlib=rb-1.2.1&q=80&w=1080",
      },
      {
        id: 2,
        name: "Business Mentor",
        subjects: ["Finance", "Marketing", "Entrepreneurship"],
        description: "Prepares students for success in business disciplines.",
        image: "https://img.freepik.com/free-vector/webinar-concept-with-man-tablet_23-2147776247.jpg?ga=GA1.1.1246748459.1736059899&semt=ais_hybrid",
      },
      {
        id: 3,
        name: "Humanities Mentor",
        subjects: ["Philosophy", "History", "Cultural Studies"],
        description: "Encourages critical thinking and cultural understanding in humanities.",
        image: "https://img.freepik.com/free-photo/international-day-education-futuristic-style_23-2150998663.jpg?ga=GA1.1.1246748459.1736059899&semt=ais_hybrid",
      },
      {
        id: 4,
        name: "Art Mentor",
        subjects: ["Digital Art", "Photography", "Painting"],
        description: "Helps undergraduates refine their artistic skills.",
        image: "https://img.freepik.com/free-photo/artist-paints-christian-icon-workshop_1398-3395.jpg?ga=GA1.1.1246748459.1736059899&semt=ais_hybrid",
      },
      {
        id: 5,
        name: "Social Science Mentor",
        subjects: ["Psychology", "Sociology", "Political Science"],
        description: "Facilitates understanding of societal issues and human behavior.",
        image: "https://img.freepik.com/free-vector/science-class-elements_23-2147492326.jpg?ga=GA1.1.1246748459.1736059899&semt=ais_hybrid",
      },
      {
        id: 6,
        name: "Technology Mentor",
        subjects: ["Software Development", "Cybersecurity", "Cloud Computing"],
        description: "Equips students with advanced technological skills for future careers.",
        image: "https://img.freepik.com/free-vector/abstract-low-polygonal-graduation-cap-planet-earth-globe-model-map-e-learning-concept_127544-1106.jpg?ga=GA1.1.1246748459.1736059899&semt=ais_hybrid",
      },
    ],
    "International": [
      {
        id: 1,
        name: "STEM Mentor",
        subjects: ["Engineering", "Data Science", "AI & ML"],
        description: "Guides undergraduates in mastering STEM subjects.",
        image: "https://source.unsplash.com/150x150/?engineering,science",
      },
      {
        id: 2,
        name: "Business Mentor",
        subjects: ["Finance", "Marketing", "Entrepreneurship"],
        description: "Prepares students for success in business disciplines.",
        image: "https://source.unsplash.com/150x150/?business,finance",
      },
      {
        id: 3,
        name: "Humanities Mentor",
        subjects: ["Philosophy", "History", "Cultural Studies"],
        description: "Encourages critical thinking and cultural understanding in humanities.",
        image: "https://source.unsplash.com/150x150/?philosophy,history",
      },
      {
        id: 4,
        name: "Art Mentor",
        subjects: ["Digital Art", "Photography", "Painting"],
        description: "Helps undergraduates refine their artistic skills.",
        image: "https://source.unsplash.com/150x150/?art,photography",
      },
    ],
  })

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
              Meet Your AI Learning Companions
            </h1>
            <p className="text-xl text-gray-200">
              Discover specialized AI mentors designed for each grade level and subject
            </p>
          </div>
        </div>
      </section>

      {/* Grade Selection and Agents Display */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#123FB8] mb-8 text-center">
            Choose Your Educational Level
          </h2>
          
          {/* Grade Level Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-[#FA0787] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Agents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agents[selectedCategory].map((agent:any) => (
              <div
                key={agent.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#123FB8] mb-3">
                    {agent.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {agent.description}
                  </p>
                  <div className="mb-4">
                    <h4 className="font-semibold text-[#440C73] mb-2">Subjects:</h4>
                    <div className="flex flex-wrap gap-2">
                      {agent.subjects.map((subject:any) => (
                        <span
                          key={subject}
                          className="px-3 py-1 bg-[#123FB8] text-white text-sm rounded-full"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span
                    onClick={naviagte}
                    className="inline-block w-full cursor-pointer text-center bg-[#FA0787] text-white px-6 py-2 rounded-full hover:bg-[#440C73] transition-colors"
                  >
                    Start Learning
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#123FB8] to-[#440C73] text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Choose your grade level and connect with AI mentors designed specifically for your learning journey.
          </p>
          <span
            onClick={naviagte}
            className="bg-[#FA0787] cursor-pointer text-white px-8 py-3 rounded-full hover:bg-[#440C73] transition-colors inline-block text-lg"
          >
            Get Started Now
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