'use client'
import React from 'react';
import { Menu, X, Brain } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useUser, useClerk } from '@clerk/nextjs';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"; // Using shadcn/ui for proper styling

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();


  return (
    <header className="fixed w-full bg-white shadow-md z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-[#123FB8]" />
            <span className="text-2xl font-bold text-[#123FB8]">aimentor4all</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-[#FA0787]">Home</Link>
            <Link href="/features" className="text-gray-700 hover:text-[#FA0787]">Features</Link>
            <Link href="/subjects" className="text-gray-700 hover:text-[#FA0787]">Subjects & Grades</Link>
            <Link href="/pricing" className="text-gray-700 hover:text-[#FA0787]">Pricing</Link> 
            <Link href="/course-join" className="text-gray-700 hover:text-[#FA0787]">Join Course</Link> 
            <Link href="/contact" className="text-gray-700 hover:text-[#FA0787]">Contact</Link>
            {!isSignedIn && (
              <Link 
                href="/sign-in" 
                className="bg-[#FA0787] text-white px-6 py-2 rounded-full hover:bg-[#440C73] transition-colors"
              >
                Login
              </Link>
            )}
          {isSignedIn && user && (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <motion.div 
        whileHover={{ scale: 1.1 }} 
        whileTap={{ scale: 0.9 }} 
        className="cursor-pointer"
      >
        <Image
          src={user?.imageUrl || "/images/Avatars/Avatar2.png"}
          alt='user'
          width={40}
          height={40}
          className='rounded-full'
        />
      </motion.div>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="bg-white shadow-md rounded-md w-48 p-2">
      <DropdownMenuLabel className="text-gray-900 font-semibold">My Account</DropdownMenuLabel>
      <DropdownMenuSeparator className="border-b border-gray-200 my-2" />
      <DropdownMenuItem 
        className="cursor-pointer text-gray-700 hover:bg-gray-100 hover:text-gray-700 px-3 py-2 rounded-md"
        onClick={() => router.push('/dashboard')}
      >
        Dashboard
      </DropdownMenuItem>
      <DropdownMenuItem 
        className="cursor-pointer text-gray-700 hover:bg-gray-100 hover:text-gray-700 px-3 py-2 rounded-md"
        onClick={() => signOut(() => router.push('/'))}
      >
        Logout
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)}

          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu className='text-black'/>}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-[#FA0787]">Home</Link>
              <Link href="/features" className="text-gray-700 hover:text-[#FA0787]">Features</Link>
              <Link href="/subjects" className="text-gray-700 hover:text-[#FA0787]">Subjects & Grades</Link>
              <Link href="/pricing" className="text-gray-700 hover:text-[#FA0787]">Pricing</Link>
              <Link href="/contact" className="text-gray-700 hover:text-[#FA0787]">Contact</Link>
              <Link 
                href="/sign-in" 
                className="bg-[#FA0787] text-white px-6 py-2 rounded-full hover:bg-[#440C73] transition-colors inline-block text-center"
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
