// src/components/Hompage.js

import React from 'react';
import Navbar from './NavbarHomepage';
import FooterSmall from './FooterSmall';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Bilder importieren
import bgImage from '../assets/img/register_bg_2.png';
//import gameScreenshot from '../assets/img/game_screenshot.png';

const HomepageSite = () => {
  const history = useNavigate();

  // Funktion zum Abrufen eines Cookies
  const getCookie = (cname) => {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  useEffect(() => {
    // Token aus sessionStorage abrufen
    const token = sessionStorage.getItem('token') || getCookie('token');
    if (!token) {
      // Wenn kein Token vorhanden ist, zur Login-Seite weiterleiten
      history.push('/login');
    }
    // Optional: Token validieren (z.B. durch eine Anfrage an den Server)
  }, [history]);

  // Restlicher Code Ihrer Homepage...

  return (
    <>
      {/* Navbar */}
      <Navbar  />
      <main>
        {/* Hero-Bereich */}
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
              <div className="w-full lg:w-8/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl">
                    Willkommen zu unserem Spiel!
                  </h1>
                  <p className="mt-4 text-lg text-gray-300">
                    Erlebe ein spannendes Abenteuer und tauche ein in unsere Welt.
                  </p>
                  <a
                    href="/quiz"
                    className="mt-6 inline-block bg-blue-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
                  >
                    Jetzt spielen
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Features-Bereich */}
        <section className="pb-20 bg-gray-100 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              {/* Feature 1 */}
              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
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
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
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
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
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
            {/* Weitere Informationen */}
            <div className="flex flex-wrap items-center mt-24">
              <div className="w-full md:w-6/12 px-4 mr-auto ml-auto">

              </div>
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <div className="md:pr-12">
                  <h3 className="text-3xl font-semibold">Tauche tiefer ein</h3>
                  <p className="mt-4 text-lg leading-relaxed text-gray-600">
                    Unsere Spielwelt bietet unendliche Möglichkeiten und Abenteuer.
                  </p>
                  <ul className="list-none mt-6">
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bg-blue-500 mr-3">
                            <i className="fas fa-fingerprint"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-gray-600">
                            Sichere und zuverlässige Server
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bg-red-500 mr-3">
                            <i className="fas fa-gift"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-gray-600">
                            Exklusive Belohnungen
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bg-green-500 mr-3">
                            <i className="fas fa-user-friends"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-gray-600">
                            Spiele mit Freunden
                          </h4>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <a
                    href="#mehr-erfahren"
                    className="mt-6 inline-block bg-blue-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
                  >
                    Mehr erfahren
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <FooterSmall />
    </>
  );
};

export default HomepageSite;
