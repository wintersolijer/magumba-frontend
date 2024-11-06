// src/components/Register.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import FooterSmall from './FooterSmall';

// Images
import registerBgImage from '../assets/img/register_bg_2.png';

const Register = () => {
  // State variables for input fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]   = useState('');
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [birthday, setBirthday]   = useState('');
  const [userType, setUserType]   = useState('student'); // New state variable for user type

  const navigate = useNavigate();

  // Function to handle the registration form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mock calculation of ecological footprint
    const footprint = Math.floor(Math.random() * 100) + 50; // Random value between 50 and 150
    sessionStorage.setItem('footprint', footprint);

    // For mockup purposes, we'll just navigate to the login page after registration
    alert(`Registrierung erfolgreich als ${userType}! Dein ökologischer Fußabdruck ist ${footprint} Punkte.`);
    navigate('/'); // Redirect to login page
  };

  return (
    <>
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          {/* Background image */}
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage: `url(${registerBgImage})`,
            }}
          ></div>
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-6/12 px-4">
                {/* Registration form */}
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0 animate-fade-in">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center">
                      <h6 className="text-gray-500 text-sm font-bold">
                        Erstelle ein Konto
                      </h6>
                    </div>
                    <hr className="mt-6 border-b-1 border-gray-300" />
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form onSubmit={handleSubmit}>
                      {/* First Name */}
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="first_name"
                        >
                          Vorname
                        </label>
                        <input
                          type="text"
                          id="first_name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                          className="border-0 px-3 py-3 rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Vorname eingeben"
                        />
                      </div>
                      {/* Last Name */}
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="last_name"
                        >
                          Nachname
                        </label>
                        <input
                          type="text"
                          id="last_name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                          className="border-0 px-3 py-3 rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Nachname eingeben"
                        />
                      </div>
                      {/* Email */}
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="email"
                        >
                          E-Mail
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="border-0 px-3 py-3 rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="E-Mail eingeben"
                        />
                      </div>
                      {/* Password */}
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="password"
                        >
                          Passwort
                        </label>
                        <input
                          type="password"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="border-0 px-3 py-3 rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Passwort eingeben"
                        />
                      </div>
                      {/* Birthday */}
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="birthday"
                        >
                          Geburtsdatum
                        </label>
                        <input
                          type="date"
                          id="birthday"
                          value={birthday}
                          onChange={(e) => setBirthday(e.target.value)}
                          required
                          className="border-0 px-3 py-3 rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Geburtsdatum eingeben"
                        />
                      </div>
                      {/* User Type Selection */}
                      <div className="relative w-full mb-3">
                        <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                          Benutzerrolle
                        </label>
                        <div className="flex items-center">
                          <label className="inline-flex items-center mr-4">
                            <input
                              type="radio"
                              className="form-radio h-5 w-5 text-gray-600"
                              name="userType"
                              value="student"
                              checked={userType === 'student'}
                              onChange={(e) => setUserType(e.target.value)}
                            />
                            <span className="ml-2 text-gray-700">Student</span>
                          </label>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              className="form-radio h-5 w-5 text-gray-600"
                              name="userType"
                              value="lecturer"
                              checked={userType === 'lecturer'}
                              onChange={(e) => setUserType(e.target.value)}
                            />
                            <span className="ml-2 text-gray-700">Dozent</span>
                          </label>
                        </div>
                      </div>
                      {/* Terms and Conditions */}
                      <div className="flex items-center">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            id="customCheckRegister"
                            type="checkbox"
                            className="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5"
                            required
                          />
                          <span className="ml-2 text-sm font-semibold text-gray-700">
                            Ich stimme den{' '}
                            <a href="#agb" className="text-blue-500 hover:text-blue-700">
                              Nutzungsbedingungen
                            </a>{' '}
                            zu.
                          </span>
                        </label>
                      </div>
                      {/* Submit Button */}
                      <div className="text-center mt-6">
                        <button
                          className="bg-gray-800 text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg focus:outline-none w-full hover:bg-gray-700 transition duration-300"
                          type="submit"
                        >
                          Registrieren
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="flex flex-wrap mt-6 relative z-10">
                  <div className="w-full text-center">
                    <Link to="/" className="text-gray-700 hover:text-gray-900">
                      <small>Bereits ein Konto? Einloggen</small>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Footer with absolute positioning */}
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
};

export default Register;
