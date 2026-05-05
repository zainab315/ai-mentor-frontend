import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { UserCircle, LogOut } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/subjects', label: 'Subjects' },
    { href: '/progress', label: 'Progress' },
    { href: '/quiz/new', label: 'Quiz' },
    { href: '/create-agent', label: 'Create Agent' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            AI Mentor Platform
          </Link>
          <nav className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`hover:text-blue-200 ${
                  router.pathname === item.href ? 'font-bold' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/settings" className="hover:text-blue-200">
              <UserCircle className="h-6 w-6" />
            </Link>
            <button className="hover:text-blue-200">
              <LogOut className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-gray-200 text-center py-4">
        <p>&copy; 2023 AI Mentor Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;

