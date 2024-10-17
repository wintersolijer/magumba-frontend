// src/components/SidebarToggle.js

import React from 'react';

const SidebarToggle = ({ toggleSidebar }) => {
  return (
    <button
      onClick={toggleSidebar}
      className="text-white focus:outline-none lg:hidden"
    >
      {/* Hamburger Icon */}
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  );
};

export default SidebarToggle;
