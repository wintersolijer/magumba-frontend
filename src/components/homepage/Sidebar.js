// src/components/homepage/Sidebar.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaUser,
  FaCog,
  FaGamepad,
  FaPlusSquare,
  FaTachometerAlt,
  FaChartPie,
} from 'react-icons/fa';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token from sessionStorage
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userType');
    // Delete token cookie
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    // Redirect to login page
    navigate('/');
  };

  const userType = sessionStorage.getItem('userType');

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transition-transform duration-300 ease-in-out z-50`}
      style={{ transform: isOpen ? 'translateX(0)' : 'translateX(-100%)' }}
    >
      <div className="flex flex-col h-full">
        {/* Upper section with placeholder for the name */}
        <div className="flex items-center justify-center h-20 border-b border-gray-700">
          <span className="text-xl font-semibold">
            {sessionStorage.getItem('username')}
          </span>
        </div>
        {/* Menu items */}
        <div className="flex-1 overflow-y-auto">
          <ul className="mt-4">
            <li className="px-6 py-2 hover:bg-gray-700 flex items-center">
              <FaHome className="mr-3" />
              <Link
                to={userType === 'lecturer' ? '/dashboard' : '/homepage-student'}
                onClick={toggleSidebar}
              >
                Startseite
              </Link>
            </li>
            {userType === 'lecturer' ? (
              <>
                <li className="px-6 py-2 hover:bg-gray-700 flex items-center">
                  <FaPlusSquare className="mr-3" />
                  <Link to="/quizform" onClick={toggleSidebar}>
                    Quiz erstellen
                  </Link>
                </li>
                <li className="px-6 py-2 hover:bg-gray-700 flex items-center">
                  <FaTachometerAlt className="mr-3" />
                  <Link to="/student-performance" onClick={toggleSidebar}>
                    Leistungen
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="px-6 py-2 hover:bg-gray-700 flex items-center">
                  <FaChartPie className="mr-3" />
                  <Link to="/student-dashboard" onClick={toggleSidebar}>
                    Dashboard
                  </Link>
                </li>
                <li className="px-6 py-2 hover:bg-gray-700 flex items-center">
                  <FaGamepad className="mr-3" />
                  <Link to="/quiz" onClick={toggleSidebar}>
                    Quiz
                  </Link>
                </li>
                <li className="px-6 py-2 hover:bg-gray-700 flex items-center">
                  <FaPlusSquare className="mr-3" />
                  <Link to="/shop" onClick={toggleSidebar}>
                    Shop
                  </Link>
                </li>
              </>
            )}
            {/* Common items */}
            <li className="px-6 py-2 hover:bg-gray-700 flex items-center">
              <FaUser className="mr-3" />
              <Link to="/profile" onClick={toggleSidebar}>
                Profil
              </Link>
            </li>
            <li className="px-6 py-2 hover:bg-gray-700 flex items-center">
              <FaCog className="mr-3" />
              <Link to="/settings" onClick={toggleSidebar}>
                Einstellungen
              </Link>
            </li>
          </ul>
        </div>
        {/* Lower section with logout button */}
        <div className="px-6 py-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Abmelden
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
