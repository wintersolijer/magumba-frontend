// src/components/NavbarHomepage.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './homepage/Sidebar';
import SidebarToggle from './homepage/SidebarToggle';

const Navbar = ({ transparent }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    console.log('Sidebar toggle clicked');
    setSidebarOpen(!sidebarOpen);
  };

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

            {/* Logo oder Titel */}
            <Link
              to="/homepage"
              className="text-white text-sm font-bold leading-relaxed inline-block ml-4 py-2 whitespace-nowrap uppercase"
            >
              Startseite
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex items-center">
            <Link
              to="/quiz"
              className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
            >
              Quiz
            </Link>
            <Link
              to="/quizform"
              className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
            >
              Quiz erstellen
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
