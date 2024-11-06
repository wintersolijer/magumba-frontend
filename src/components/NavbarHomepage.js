// src/components/NavbarHomepage.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './homepage/Sidebar';
import SidebarToggle from './homepage/SidebarToggle';

const Navbar = ({ transparent }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const userType = sessionStorage.getItem('userType');

  return (
    <>
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Navbar */}
      <nav
        className={`fixed w-full flex items-center justify-between px-4 py-3 ${
          transparent ? 'top-0 absolute z-50 w-full' : 'relative shadow-lg bg-gray-800'
        }`}
      >
        <div className="container px-4 mx-auto flex items-center justify-between">
          <div className="flex items-center">
            {/* Sidebar Toggle */}
            <SidebarToggle toggleSidebar={toggleSidebar} />

            {/* Logo or Title */}
            <Link
              to={userType === 'lecturer' ? '/dashboard' : '/homepage-student'}
              className="text-white text-sm font-bold leading-relaxed inline-block ml-4 py-2 whitespace-nowrap uppercase"
            >
              Startseite
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex items-center">
            {userType === 'lecturer' ? (
              <>
                <Link
                  to="/quizform"
                  className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Quiz erstellen
                </Link>
                <Link
                  to="/student-performance"
                  className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Leistungen
                </Link>
                <Link
                  to="/settings"
                  className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Einstellungen
                </Link>
                <Link
                  to="/profile"
                  className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Profil
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/student-dashboard"
                  className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  to="/quiz"
                  className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Quiz
                </Link>
                <Link
                  to="/shop"
                  className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Shop
                </Link>
                <Link
                  to="/settings"
                  className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Einstellungen
                </Link>
                <Link
                  to="/profile"
                  className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Profil
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
