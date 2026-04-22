import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const Header = () => {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
            KANCHI
          </Link>
          
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex space-x-6">
              <Link to="/portfolio" className={`text-gray-600 hover:text-primary-600 transition-colors font-medium ${location.pathname === '/portfolio' ? 'text-primary-600' : ''}`}>
                Portfolio
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;