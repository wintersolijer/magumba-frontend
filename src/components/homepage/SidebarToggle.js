// src/components/homepage/SidebarToggle.js

import React from 'react';

const SidebarToggle = ({ toggleSidebar }) => {
  return (
    <button
      onClick={toggleSidebar}
      className="text-white focus:outline-none "
    >
      {/* Hamburger Icon */}
      <i className="fas fa-bars fa-2x"></i>
    </button>
  );
};

export default SidebarToggle;
