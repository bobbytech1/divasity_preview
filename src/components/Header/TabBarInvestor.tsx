import React from 'react';
import { Home, Rocket, Handshake, Users, Wallet } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

// Define the type for tabs
type Tab = 'Dashboard' | 'Startup' | 'Collaborate' | 'Community' | 'Wallet';

export function TabBarInvestor() {
  const location = useLocation();

  const tabs: { key: Tab; icon: React.ReactNode; path: string }[] = [
    { key: 'Dashboard', icon: <Home size={26} />, path: '/dashboard/investor' },
    { key: 'Startup', icon: <Rocket size={26} />, path: '/investor/startup' },
    { key: 'Collaborate', icon: <Handshake size={24} />, path: '/investor/collaborate' },
    { key: 'Community', icon: <Users size={26} />, path: '/investor/community' },
    { key: 'Wallet', icon: <Wallet size={26} />, path: '/investor/wallet' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-gray-400 pb-4 pt-2 bg-white">
      <ul className="flex justify-around">
        {tabs.map(({ key, icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <li key={key} className="flex-1">
              <Link
                to={path}
                className={`w-full flex flex-col items-center py-2 ${
                  isActive ? 'text-dpurple' : 'text-gray-500 hover:text-dpurple'
                }`}
              >
                {React.cloneElement(icon as React.ReactElement, {
                  className: isActive ? 'text-dpurple' : 'text-gray-500',
                })}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
