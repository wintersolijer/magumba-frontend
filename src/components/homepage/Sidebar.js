// src/components/homepage/Sidebar.js

import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transition-transform duration-300 ease-in-out z-50`}
      style={{ transform: isOpen ? 'translateX(0)' : 'translateX(-100%)' }}
    >
      <div className="flex flex-col h-full">
        {/* Obere Sektion mit Platzhalter für den Namen */}
        <div className="flex items-center justify-center h-20 border-b border-gray-700">
          <span className="text-xl font-semibold">Benutzername</span>
        </div>
        {/* Menüeinträge */}
        <div className="flex-1 overflow-y-auto">
          <ul className="mt-4">
            <li className="px-6 py-2 hover:bg-gray-700">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="px-6 py-2 hover:bg-gray-700">
              <Link to="/profile">Profil</Link>
            </li>
            <li className="px-6 py-2 hover:bg-gray-700">
              <Link to="/settings">Einstellungen</Link>
            </li>
          </ul>
        </div>
        {/* Untere Sektion mit Logout-Button */}
        <div className="px-6 py-4 border-t border-gray-700">
          <button
            onClick={() => alert('Abmelden')} // Hier Funktion zum Abmelden einfügen
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
