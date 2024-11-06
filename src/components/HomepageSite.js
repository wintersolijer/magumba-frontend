// src/components/HomepageSite.js

import React, { useEffect } from 'react';
import Navbar from './NavbarHomepage';
import FooterSmall from './FooterSmall';
import { useNavigate } from 'react-router-dom';

// Images
import bgImage from '../assets/img/register_bg_2.png';

// Icons
import { FaLeaf, FaGlobe, FaWater } from 'react-icons/fa';

const NewsTicker = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const newsItems = [
    {
      title: 'Neue Studie zur Reduzierung von CO₂-Emissionen veröffentlicht',
      date: '22. Oktober 2024',
      author: 'Dr. Müller',
      icon: <FaLeaf className="text-green-500" />,
    },
    {
      title: 'Entdeckung eines nachhaltigen Materials für Batterien',
      date: '20. Oktober 2024',
      author: 'Prof. Schmidt',
      icon: <FaGlobe className="text-blue-500" />,
    },
    {
      title: 'Forschungsergebnisse zur Reinigung von Meeren vorgestellt',
      date: '18. Oktober 2024',
      author: 'Dr. Fischer',
      icon: <FaWater className="text-blue-400" />,
    },
    // More news items...
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % newsItems.length);
    }, 5000); // Switch every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex, newsItems.length]);

  return (
    <div className="bg-gray-800 text-white py-2 animate-marquee">
      <div className="container mx-auto flex items-center">
        <span className="mr-4">{newsItems[currentIndex].icon}</span>
        <p className="text-sm">
          <strong>{newsItems[currentIndex].date}</strong> -{' '}
          {newsItems[currentIndex].title} ({newsItems[currentIndex].author})
        </p>
      </div>
    </div>
  );
};

const HomepageSite = () => {
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
    if (!token || userType !== 'student') {
      // Redirect to login page if no token or not a student
      navigate('/');
    }
    // Optional: Validate token
  }, [navigate]);

  const footprint = sessionStorage.getItem('footprint') || '100';

  return (
    <>
      {/* Navbar */}
      <Navbar />
      {/* NewsTicker */}
      <NewsTicker />
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
                    Willkommen zu unserem Spiel!
                  </h1>
                  <p className="mt-4 text-lg text-gray-300">
                    Erlebe ein spannendes Abenteuer und tauche ein in unsere Welt.
                  </p>
                  <a
                    href="/quiz"
                    className="mt-6 inline-block bg-blue-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 animate-bounce"
                  >
                    Jetzt spielen
                  </a>
                </div>
              </div>
              {/* Ecological Footprint */}
              <div className="absolute top-0 right-0 mt-4 mr-4 bg-white bg-opacity-80 p-4 rounded shadow-lg">
                <h3 className="text-xl font-semibold">Dein ökologischer Fußabdruck:</h3>
                <p className="text-3xl font-bold text-green-600">{footprint}</p>
              </div>
            </div>
          </div>
        </div>
        {/* Features Section */}
        <section className="pb-20 bg-gray-100 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              {/* Feature 1 */}
              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg hover:shadow-2xl transition duration-300 animate-fade-in">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 w-12 h-12 mb-5 inline-flex items-center justify-center rounded-full bg-red-500">
                      <i className="fas fa-trophy"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Erreiche neue Highscores</h6>
                    <p className="mt-2 mb-4 text-gray-600">
                      Stelle dich den Herausforderungen und übertreffe deine Freunde.
                    </p>
                  </div>
                </div>
              </div>
              {/* Feature 2 */}
              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg hover:shadow-2xl transition duration-300 animate-fade-in">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 w-12 h-12 mb-5 inline-flex items-center justify-center rounded-full bg-blue-500">
                      <i className="fas fa-gamepad"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Neue Levels</h6>
                    <p className="mt-2 mb-4 text-gray-600">
                      Entdecke regelmäßig neue Inhalte und Spielwelten.
                    </p>
                  </div>
                </div>
              </div>
              {/* Feature 3 */}
              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg hover:shadow-2xl transition duration-300 animate-fade-in">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 w-12 h-12 mb-5 inline-flex items-center justify-center rounded-full bg-green-500">
                      <i className="fas fa-users"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Community</h6>
                    <p className="mt-2 mb-4 text-gray-600">
                      Werde Teil einer wachsenden Spieler-Community.
                    </p>
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

export default HomepageSite;
