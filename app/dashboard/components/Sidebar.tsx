'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { UserCircle, Home, BookOpen, Brain, Plus,BookMarked, LogOut ,TicketCheck, LaptopMinimal} from 'lucide-react'
import { logout } from '@/lib/methods';
import { useClerk } from '@clerk/nextjs';


const Sidebar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { signOut } = useClerk();
  const handleSignOut = async () => {
    
    try{
      await signOut()
    }catch(e){
    
    }
    finally{
      logout();
      window.location.href = "https://www.aimentor4all.com/"
    }
  };
  
  

  const menuItems = [
    { href: '/dashboard', label: 'Dashboard', Icon: Home },
    { href: '/dashboard/subjects', label: 'Subjects', Icon: BookOpen }, 
    { href: '/dashboard/my-subjects', label: 'My Subjects' , Icon : BookMarked}, 
    { href: '/dashboard/quiz/new', label: 'New Quiz', Icon: Brain },
    { href: '/dashboard/create-agent', label: 'Create Agent', Icon: Plus },
    { href: '/dashboard/course-and-certificattion', label: 'Course & Certification', Icon: TicketCheck },
    { href: '/dashboard/virtual-lab', label: 'Virtual Lab', Icon: LaptopMinimal },
  ]

  return (
    <aside className="fixed top-0 left-0 bg-gradient-to-r from-black via-gray-900 to-purple-950 text-white w-64 h-screen flex flex-col  shadow-2xl overflow-hidden">
      <div className="p-6 border-b border-purple-800/30">
      <Link
    href="/"
    onClick={(e) => {
        e.preventDefault();
        window.location.href = "/";
    }} className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-300 hover:to-purple-300 transition-all duration-300">
          AI Mentor
        </Link>
      </div>
      <nav className="flex-1 px-4 py-8 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map(({ href, label, Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className={`flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                  pathname === href
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-purple-800/30'
                }`}
              >
                <Icon className={`h-5 w-5 ${pathname === href ? 'text-blue-200' : 'text-purple-400'}`} />
                <span className="text-sm">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-6 border-t border-purple-800/30 space-y-4">
        <Link
          href="/dashboard/profile"
          className={`flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-300 ${
            pathname === '/dashboard/profile'
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium shadow-lg'
              : 'text-gray-300 hover:text-white hover:bg-purple-800/30'
          }`}
        >
          <UserCircle className={`h-5 w-5 ${pathname === '/dashboard/profile' ? 'text-blue-200' : 'text-purple-400'}`} />
          <span className="text-sm">Profile</span>
        </Link> 
        {/* <SignOutButton> */}
        <button  
        onClick={handleSignOut}
  className="w-full flex items-center space-x-4 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-purple-800/30 transition-all duration-300">
          <LogOut className="h-5 w-5 text-purple-400" />
          <span className="text-sm">Logout</span>
        </button> 
        {/* </SignOutButton> */}
      </div>
    </aside>
  )
}

export default Sidebar

