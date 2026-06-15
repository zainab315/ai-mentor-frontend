// 'use client'
import React from 'react';
import { Mail, Phone, MessageSquare, Building2 } from 'lucide-react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export default function Contact() {
  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      description: "support@aimentor.com",
      detail: "We'll respond within 24 hours"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Call Us",
      description: "+1-800-123-4567",
      detail: "Monday to Friday, 9am-5pm EST"
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Live Chat",
      description: "Available 24/7",
      detail: "Instant responses from our AI support"
    },
    {
      icon: <Building2 className="h-6 w-6" />,
      title: "Visit Us",
      description: "123 Learning Street",
      detail: "New York, NY 10001"
    }
  ];

  const faqs = [
    {
      question: "How do I get started with AI Mentor?",
      answer: "Simply sign up for a free account and you'll be guided through our onboarding process to set up your personalized learning experience."
    },
    {
      question: "What subjects are covered?",
      answer: "We cover a wide range of subjects across all grade levels, from elementary to college. Visit our Subjects page for a complete list."
    },
    {
      question: "Can I switch between different AI mentors?",
      answer: "Yes! You can switch between different subject-specific AI mentors at any time based on your learning needs."
    },
    {
      question: "Is my data secure?",
      answer: "We take data security seriously and use industry-standard encryption to protect all user information. View our Privacy Policy for details."
    }
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
              We're Here to Help
            </h1>
            <p className="text-xl text-gray-200">
              Get in touch with our team for support, questions, or feedback
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow"
              >
                <div className="text-[#FA0787] mb-4 flex justify-center">
                  {info.icon}
                </div>
                <h3 className="text-xl font-bold text-[#123FB8] mb-2">
                  {info.title}
                </h3>
                <p className="text-gray-800 font-medium mb-2">
                  {info.description}
                </p>
                <p className="text-gray-600 text-sm">
                  {info.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-[#123FB8] mb-8 text-center">
              Send Us a Message
            </h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#FA0787] focus:ring focus:ring-[#FA0787] focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#FA0787] focus:ring focus:ring-[#FA0787] focus:ring-opacity-50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="userType">
                  I am a...
                </label>
                <select
                  id="userType"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#FA0787] focus:ring focus:ring-[#FA0787] focus:ring-opacity-50"
                >
                  <option>Student</option>
                  <option>Parent</option>
                  <option>Teacher</option>
                  <option>Institution</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#FA0787] focus:ring focus:ring-[#FA0787] focus:ring-opacity-50"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#FA0787] text-white px-6 py-3 rounded-full hover:bg-[#440C73] transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#123FB8] mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
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