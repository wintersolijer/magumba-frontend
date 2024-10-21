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
              to="/"
              className="text-white text-sm font-bold leading-relaxed inline-block ml-4 py-2 whitespace-nowrap uppercase"
            >
             
            </Link>
          </div>

          {/* Navigation für größere Bildschirme */}
          {/* ... */}
       
{/* Navigation für größere Bildschirme 
          <div
            className={
              'lg:flex flex-grow items-center' +
              (sidebarOpen ? ' flex' : ' hidden')
            }
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <Link
                  to="/login"
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75"
                >
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/register"
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75"
                >
                  Registrieren
                </Link>
              </li>
            </ul>
          </div>*/}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
