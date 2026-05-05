import React from 'react';
import {
  Brain,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  BookOpen,
  GraduationCap,
} from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const quickLinks = [
    // { name: "About Us", path: "/about" },
    { name: "Features", path: "/features" },
    { name: "Subjects", path: "/subjects" },
    { name: "Pricing", path: "/pricing" },
    { name: "Contact", path: "/contact" },
    // { name: "Blog", path: "/blog" }
  ];

  const resources = [
    { name: "Help Center", path: "/help" },
    { name: "Student Guide", path: "/guide" },
    { name: "Parent Resources", path: "/parents" },
    { name: "Teacher Tools", path: "/teachers" },
    { name: "Success Stories", path: "/success" }
  ];

  const legal = [
    { name: "Terms of Service", path: "/terms-of-service" },
    { name: "Privacy Policy", path: "https://www.freeprivacypolicy.com/live/b109a412-181f-4fe7-8d11-154dd63a9e26" },
    // { name: "Cookie Policy", path: "/cookies" },
    // { name: "Accessibility", path: "/accessibility" }
  ];

  const subjects = [
    { name: "Mathematics", path: "/subjects#math" },
    { name: "Science", path: "/subjects#science" },
    { name: "Language Arts", path: "/subjects#language" },
    { name: "Social Studies", path: "/subjects#social" }
  ];

  return (
    <footer className="bg-gradient-to-br from-[#123FB8] to-[#440C73] text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8" />
              <span className="text-2xl font-bold">aimentor4all</span>
            </div>
            <p className="text-gray-300">
              Transforming education through AI-powered personalized learning experiences.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="hover:text-[#FA0787] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-[#FA0787] transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-[#FA0787] transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-[#FA0787] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-[#FA0787] transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <BookOpen className="h-5 w-5 mr-2" /> Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-gray-300 hover:text-[#FA0787] transition-colors flex items-center"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          {/* <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <GraduationCap className="h-5 w-5 mr-2" /> Resources
            </h3>
            <ul className="space-y-3">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <Link
                    href={resource.path}
                    className="text-gray-300 hover:text-[#FA0787] transition-colors flex items-center"
                  >
                    {resource.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Mail className="h-5 w-5 mr-2" /> Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Mail className="h-5 w-5 mt-1" />
                <span className="text-gray-300">support@aimentor.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="h-5 w-5 mt-1" />
                <span className="text-gray-300">+1 (800) 123-4567</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-1" />
                <span className="text-gray-300">
                  123 Learning Street<br />
                  New York, NY 10001
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        {/* <div className="border-t border-gray-700 pt-8 pb-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-semibold mb-4">Stay Updated with AI Mentor</h3>
            <p className="text-gray-300 mb-6">
              Subscribe to our newsletter for the latest updates, educational tips, and exclusive content.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-full bg-white/10 border border-white/20 focus:outline-none focus:border-[#FA0787] flex-grow max-w-md"
              />
              <button
                type="submit"
                className="bg-[#FA0787] text-white px-6 py-2 rounded-full hover:bg-[#440C73] transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div> */}

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-300 text-sm">
              &copy; {new Date().getFullYear()} AI Mentor. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="text-gray-300 hover:text-[#FA0787] transition-colors text-sm"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}