'use client';

import React from 'react';
import { useParams } from 'next/navigation'; 
import { useSearchParams } from 'next/navigation';
import { ChatInterface } from './components/ChatInterface/ChatInterface';
import { CompactAgentSidebar } from './components/Sidebar/chatSideBar';


const Page: React.FC = () => {
  const params = useParams() as { subject: string };
  // const mainagent = 'ELEMENTARY'; 
  const searchParams = useSearchParams(); 
  const mainagent = searchParams.get('category');

  const [mainAgentName, setMainAgentName] = React.useState<string>('');
  const [agent, setAgent] = React.useState<string>('');

  

  

  React.useEffect(() => {
    setAgent(params.subject); // Set the agent based on params

    try {
      if (mainagent) {
        // Safe formatting of the agent role
        const formatAgentRole = (role: string | undefined): string => {
          if (!role) {
            return '';
          }
          return role.replace(/\s+/g, '_').toUpperCase();
        };

        const formattedRole = formatAgentRole(mainagent);
        setMainAgentName(formattedRole);
      }
    } catch (e) {
      console.error('Error formatting role:', e);
    }
  }, [params.subject, mainagent]); // `mainagent` is static, but we include `params.subject` as dependency.

  return (
    <div className="flex h-screen bg-gradient-to-b from-purple-950 via-gray-950 to-black">
      <CompactAgentSidebar botName={'role'} botAvatar={'Main_Agent' } mainAgent={agent} />
      
      <main className="flex-1 flex justify-center p-2 items-center overflow-hidden">      
      <ChatInterface
        botName={agent}
        botAvatar=""
        mainAgent={mainAgentName}
        />
        </main>
    </div>
  );
};

export default Page;


