import React from 'react';
import { Home, ShoppingCart, Wallet, Ellipsis, Database } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

// Define the type for tabs
type Tab = 'Dashboard' | 'Marketplace' | 'DataRoom' | 'Wallets' | 'More';

export function TabBar() {
  const location = useLocation();

  const tabs: { key: Tab; icon: React.ReactNode; path: string }[] = [
    { key: 'Dashboard', icon: <Home size={26} />, path: '/dashboard' },
    { key: 'DataRoom', icon: <Database size={24} />, path: '/dataroom' },
    { key: 'Marketplace', icon: <ShoppingCart size={26} />, path: '/store' },
    { key: 'Wallets', icon: <Wallet size={26} />, path: '/wallet' },
    { key: 'More', icon: <Ellipsis size={26} />, path: '/more' },
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
