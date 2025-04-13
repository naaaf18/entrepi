import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-black shadow-md border">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white text-xl font-bold">
              Learning Club
            </Link>
          </div>
          
          <div className="flex space-x-4">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/') 
                  ? 'bg-[#757575] text-white' 
                  : 'text-blue-100 hover:bg-[#757575] hover:text-white'
              }`}
            >
              Lessons
            </Link>
            
            <Link 
              to="/profile" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/profile') 
                  ? 'bg-[#757575] text-white' 
                  : 'text-blue-100 hover:bg-[#757575] hover:text-white'
              }`}
            >
              My Journal
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 