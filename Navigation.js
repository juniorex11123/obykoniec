import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              TimeTracker Pro
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === '/'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Strona główna
            </Link>
            
            <Link
              to="/panel"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                location.pathname === '/panel'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg'
              }`}
            >
              Zaloguj do panelu
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;