// src/components/Homepage.js

import React from 'react';
import Navbar from './NavbarHomepage';
import FooterSmall from './FooterSmall';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Bilder importieren
import bgImage from '../assets/img/register_bg_2.png';
//import gameScreenshot from '../assets/img/game_screenshot.png';

const Homepage2 = () => {
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
      history.push('/');
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
        {/* Spielerinformationen */}
        <section className="pb-20 bg-gray-100 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg">
                  <div className="px-6 py-6">
                    <div className="text-center">
                      <h3 className="text-3xl font-semibold leading-normal text-gray-800 mb-2">
                        Max Mustermann
                      </h3>
                      <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                        Spielername
                      </div>
                      <div className="mt-4">
                        <div className="flex flex-wrap justify-center">
                          <div className="w-full lg:w-9/12 px-4">
                            <div className="flex justify-between items-center py-2">
                              <div className="text-left">
                                <span className="text-lg text-gray-600">Punkte:</span>
                              </div>
                              <div className="text-right">
                                <span className="text-xl font-bold text-gray-800">1500</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center py-2">
                              <div className="text-left">
                                <span className="text-lg text-gray-600">Login-Streak:</span>
                              </div>
                              <div className="text-right">
                                <span className="text-xl font-bold text-gray-800">5 Tage</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center py-2">
                              <div className="text-left">
                                <span className="text-lg text-gray-600">Ranking:</span>
                              </div>
                              <div className="text-right">
                                <span className="text-xl font-bold text-gray-800">Platz 3 in deinem Kurs</span>
                              </div>
                            </div>
                            {/* Weitere Inhalte */}
                            <div className="flex justify-between items-center py-2">
                              <div className="text-left">
                                <span className="text-lg text-gray-600">Abgeschlossene Aufgaben:</span>
                              </div>
                              <div className="text-right">
                                <span className="text-xl font-bold text-gray-800">25</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center py-2">
                              <div className="text-left">
                                <span className="text-lg text-gray-600">Nächste Belohnung in:</span>
                              </div>
                              <div className="text-right">
                                <span className="text-xl font-bold text-gray-800">3 Tagen</span>
                              </div>
                            </div>
                            {/* ... weitere statische Inhalte */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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

export default Homepage2;