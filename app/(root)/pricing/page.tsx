'use client'
import React from 'react';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export default function Pricing() {
  const plans = [
    {
      name: "Basic",
      price: "30",
      description: "Perfect for trying out AI Mentor",
      features: ["50k tokens", "Custom Subjects", "Video Lecture", "Email Support", "Quizzes", "Limited Access"],
    },
    {
      name: "Pro",
      price: "60",
      description: "Ideal for individual learners",
      features: ["100k tokens", "Custom Subjects", "Advanced Analytics", "Video Lecture", "Email Support", "Quizzes"],
    },
    {
      name: "Premium",
      price: "90",
      description: "Perfect for advanced users",
      features: [
        "150k tokens",
        "Unlimited Custom Subjects",
        "Early Access of Upcoming features",
        "Unlimited quizzes",
        "24/7 phone support",
        "Dedicated account integration",
      ],
    },
  ]

  const { isSignedIn,user } = useUser();
  const router = useRouter()
  const navigate = () =>{
    if(isSignedIn){
      router.push('/dashboard/profile')
    }else{
      router.push('/sign-in')
    }
  }
  return (
    <> 
    <Header/>
    <div className="pt-20 ">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#123FB8] to-[#440C73] py-20 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-200">
              Choose the perfect plan for your learning journey
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20  bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow relative"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-[#123FB8] mb-2">
                    {plan.name}
                  </h3>
                  <div className="text-4xl text-black font-bold mb-2">
                    ${plan.price}
                    <span className="text-lg text-gray-500 font-normal">/month</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <Check className="h-5 w-5 text-[#FA0787] mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <span
                  onClick={navigate}
                  className="block text-center cursor-pointer bg-[#FA0787] text-white px-6 py-3 rounded-full hover:bg-[#440C73] transition-colors"
                >
                  Get Started
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#123FB8] mb-6">
              Looking for School or Institution Plans?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              We offer custom solutions for educational institutions with advanced features,
              administrative controls, and volume pricing.
            </p>
            <Link
              href="/contact"
              className="bg-[#123FB8] text-white px-8 py-3 rounded-full hover:bg-[#440C73] transition-colors inline-block"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div> 
    <Footer/>
    </>

  );
}