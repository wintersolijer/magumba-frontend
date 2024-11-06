// src/components/Shop.js

import React, { useEffect } from 'react';
import Navbar from './NavbarHomepage';
import FooterSmall from './FooterSmall';
import { useNavigate } from 'react-router-dom';

// Images
import bgImage from '../assets/img/register_bg_2.png';

// Icons
import { FaTree, FaWater, FaRecycle, FaSolarPanel } from 'react-icons/fa';

const Shop = () => {
  const navigate = useNavigate();

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
    // Optional: Validate token
  }, [navigate]);

  const handlePurchase = (item) => {
    alert(`Du hast erfolgreich ${item} gekauft!`);
  };

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
          <div className="container relative mx-auto animate-fade-in-up">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-8/12 px-4 ml-auto mr-auto text-center">
                <h1 className="text-white font-semibold text-5xl">
                  Umwelt-Shop
                </h1>
                <p className="mt-4 text-lg text-gray-300">
                  Tausche deine Punkte gegen nachhaltige Produkte ein und unterstütze unsere Umwelt.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Shop Items */}
        <section className="pb-20 bg-gray-100 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              {/* Item 1 */}
              <div className="w-full md:w-4/12 px-4 text-center animate-zoom-in">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300">
                  <div className="px-4 py-5 flex-auto">
                    <FaTree className="text-green-500 text-6xl mx-auto mb-4" />
                    <h6 className="text-xl font-semibold">Baumpflanzung</h6>
                    <p className="mt-2 mb-4 text-gray-600">
                      Pflanze einen Baum und kompensiere CO₂-Emissionen.
                    </p>
                    <button
                      onClick={() => handlePurchase('eine Baumpflanzung')}
                      className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition duration-300"
                    >
                      Kaufen für 100 Punkte
                    </button>
                  </div>
                </div>
              </div>
              {/* Item 2 */}
              <div className="w-full md:w-4/12 px-4 text-center animate-zoom-in">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300">
                  <div className="px-4 py-5 flex-auto">
                    <FaWater className="text-blue-500 text-6xl mx-auto mb-4" />
                    <h6 className="text-xl font-semibold">Wasserspende</h6>
                    <p className="mt-2 mb-4 text-gray-600">
                      Unterstütze Projekte zur Trinkwasserversorgung.
                    </p>
                    <button
                      onClick={() => handlePurchase('eine Wasserspende')}
                      className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                    >
                      Kaufen für 80 Punkte
                    </button>
                  </div>
                </div>
              </div>
              {/* Item 3 */}
              <div className="w-full md:w-4/12 px-4 text-center animate-zoom-in">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300">
                  <div className="px-4 py-5 flex-auto">
                    <FaRecycle className="text-green-700 text-6xl mx-auto mb-4" />
                    <h6 className="text-xl font-semibold">Recycling-Kit</h6>
                    <p className="mt-2 mb-4 text-gray-600">
                      Erhalte ein Set für effektives Recycling zu Hause.
                    </p>
                    <button
                      onClick={() => handlePurchase('ein Recycling-Kit')}
                      className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600 transition duration-300"
                    >
                      Kaufen für 50 Punkte
                    </button>
                  </div>
                </div>
              </div>
              {/* Item 4 */}
              <div className="w-full md:w-4/12 px-4 text-center animate-zoom-in">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300">
                  <div className="px-4 py-5 flex-auto">
                    <FaSolarPanel className="text-orange-500 text-6xl mx-auto mb-4" />
                    <h6 className="text-xl font-semibold">Solar-Panel Mini</h6>
                    <p className="mt-2 mb-4 text-gray-600">
                      Nutze Solarenergie mit diesem tragbaren Panel.
                    </p>
                    <button
                      onClick={() => handlePurchase('ein Solar-Panel Mini')}
                      className="bg-orange-500 text-white font-bold py-2 px-4 rounded hover:bg-orange-600 transition duration-300"
                    >
                      Kaufen für 200 Punkte
                    </button>
                  </div>
                </div>
              </div>
              {/* Add more items as needed */}
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <FooterSmall />
    </>
  );
};

export default Shop;
