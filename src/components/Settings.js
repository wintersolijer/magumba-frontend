// src/components/Settings.js

import React, { useState, useEffect } from 'react';
import Navbar from './NavbarHomepage';
import FooterSmall from './FooterSmall';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();

  // State for user data
  const [userData, setUserData] = useState({
    username: sessionStorage.getItem('username') || '',
    email: 'student@example.com', // Mock email
    firstName: 'Max',
    lastName: 'Mustermann',
    birthday: '1990-01-01',
  });

  // Function to get a cookie
  const getCookie = (cname) => {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  };

  useEffect(() => {
    // Get token from sessionStorage
    const token = sessionStorage.getItem('token') || getCookie('token');
    if (!token) {
      // Redirect to login page if no token
      navigate('/');
    }
    // Optional: Fetch user data from backend
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    // Mock save function
    alert('Änderungen gespeichert!');
    // Optional: Send updated data to backend
  };

  return (
    <>
      <Navbar />
      <main>
        <section className="w-full h-full py-20 bg-gray-100">
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center">
              <div className="w-full lg:w-8/12 px-4">
                <div className="bg-white shadow-lg rounded-lg p-6 animate-fade-in">
                  <h2 className="text-2xl font-semibold mb-6">Einstellungen</h2>
                  <form onSubmit={handleSaveChanges}>
                    {/* Username */}
                    <div className="mb-4">
                      <label className="block text-gray-700">Benutzername:</label>
                      <input
                        type="text"
                        name="username"
                        value={userData.username}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    {/* Email */}
                    <div className="mb-4">
                      <label className="block text-gray-700">E-Mail:</label>
                      <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    {/* First Name */}
                    <div className="mb-4">
                      <label className="block text-gray-700">Vorname:</label>
                      <input
                        type="text"
                        name="firstName"
                        value={userData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    {/* Last Name */}
                    <div className="mb-4">
                      <label className="block text-gray-700">Nachname:</label>
                      <input
                        type="text"
                        name="lastName"
                        value={userData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    {/* Birthday */}
                    <div className="mb-4">
                      <label className="block text-gray-700">Geburtsdatum:</label>
                      <input
                        type="date"
                        name="birthday"
                        value={userData.birthday}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    {/* Password */}
                    <div className="mb-4">
                      <label className="block text-gray-700">Passwort ändern:</label>
                      <input
                        type="password"
                        name="password"
                        placeholder="Neues Passwort"
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    {/* Save Button */}
                    <div className="text-right">
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-300"
                      >
                        Änderungen speichern
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterSmall />
    </>
  );
};

export default Settings;
