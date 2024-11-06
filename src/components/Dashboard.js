// src/components/Dashboard.js

import React, { useEffect } from 'react';
import Navbar from './NavbarHomepage';
import FooterSmall from './FooterSmall';
import { useNavigate } from 'react-router-dom';

// Images
import bgImage from '../assets/img/register_bg_2.png';

const Dashboard = () => {
  const navigate = useNavigate();

  // Function to get a cookie
  const getCookie = (cname) => {
    const name          = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca            = decodedCookie.split(';');
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
    const userType = sessionStorage.getItem('userType');
    if (!token || userType !== 'lecturer') {
      // Redirect to login page if no token or not a lecturer
      navigate('/');
    }
    // Optional: Validate token
  }, [navigate]);

  const footprint = sessionStorage.getItem('footprint') || '100';

  return (
    <>
      {/* Navbar */}
      <Navbar />
      <main>
        {/* Hero Section */}
        <div
          className="relative pt-16 pb-32 flex content-center items-center justify-center"
          style={{
            minHeight: '75vh',
          }}
        >
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage: `url(${bgImage})`,
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute bg-black opacity-50"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-8/12 px-4 ml-auto mr-auto text-center animate-fade-in-up">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl">
                    Willkommen zurück, Dozent {sessionStorage.getItem('username') || 'Kollege'}!
                  </h1>
                  <p className="mt-4 text-lg text-gray-300">
                    Hier ist Ihr Dashboard, um den Fortschritt Ihrer Studenten zu verfolgen und neue Inhalte zu erstellen.
                  </p>
                </div>
              </div>
              {/* Ecological Footprint */}
              <div className="absolute top-0 right-0 mt-4 mr-4 bg-white bg-opacity-80 p-4 rounded shadow-lg">
                <h3 className="text-xl font-semibold">Ihr ökologischer Fußabdruck:</h3>
                <p className="text-3xl font-bold text-green-600">{footprint}</p>
              </div>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <section className="pb-20 bg-gray-100 -mt-24">
          <div className="container mx-auto px-4">
            {/* Features for Lecturer */}
            <div className="flex flex-wrap">
              {/* Create Quiz */}
              <div className="w-full md:w-6/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg hover:shadow-2xl transition duration-300 animate-fade-in">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 w-12 h-12 mb-5 inline-flex items-center justify-center rounded-full bg-blue-500">
                      <i className="fas fa-plus-circle"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Neues Quiz erstellen</h6>
                    <p className="mt-2 mb-4 text-gray-600">
                      Erstellen Sie neue Quizze, um das Wissen Ihrer Studenten zu testen.
                    </p>
                    <button
                      onClick={() => navigate('/quizform')}
                      className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                    >
                      Quiz erstellen
                    </button>
                  </div>
                </div>
              </div>
              {/* View Student Performance */}
              <div className="w-full md:w-6/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg hover:shadow-2xl transition duration-300 animate-fade-in">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 w-12 h-12 mb-5 inline-flex items-center justify-center rounded-full bg-green-500">
                      <i className="fas fa-chart-line"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Leistungen einsehen</h6>
                    <p className="mt-2 mb-4 text-gray-600">
                      Überprüfen Sie den Fortschritt und die Leistungen Ihrer Studenten.
                    </p>
                    <button
                      onClick={() => navigate('/student-performance')}
                      className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition duration-300"
                    >
                      Leistungen ansehen
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Additional content can be added here */}
          </div>
        </section>
      </main>
      {/* Footer */}
      <FooterSmall />
    </>
  );
};

export default Dashboard;
