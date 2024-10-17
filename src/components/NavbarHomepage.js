// src/components/Navbar.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './hompage/Sidebar';
import SidebarToggle from './hompage/Toogle';

const Navbar = ({ transparent }) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Navbar */}
      <nav
        className={`fixed w-full flex items-center justify-between px-2 py-3 ${
          transparent ? 'top-0 absolute z-50 w-full' : 'relative shadow-lg bg-white'
        }`}
      >
        <div className="container px-4 mx-auto flex items-center justify-between">
          <div className="flex items-center">
            {/* Sidebar Toggle */}
            <SidebarToggle toggleSidebar={toggleSidebar} />

            {/* Logo oder Titel */}
            <Link
              to="/"
              className="text-white text-sm font-bold leading-relaxed inline-block mr-4 ml-4 py-2 whitespace-nowrap uppercase"
            >
              Mein Spiel
            </Link>
          </div>

          {/* Navigation für größere Bildschirme */}
          <div
            className={
              'lg:flex flex-grow items-center' +
              (navbarOpen ? ' flex' : ' hidden')
            }
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <Link
                  to="/login"
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                >
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/register"
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                >
                  Registrieren
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
