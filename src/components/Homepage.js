// src/components/Hompage.js

import React from 'react';
import Navbar from './Navbar';
import FooterSmall from './FooterSmall';

// Bilder importieren
import bgImage from '../assets/img/register_bg_2.png';

const Hompage = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar transparent />
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
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl">
                    Willkommen zu unserem Spiel!
                  </h1>
                  <p className="mt-4 text-lg text-gray-300">
                    Erlebe ein spannendes Abenteuer und tauche ein in unsere Welt.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Angepasster Abschluss des Hero-Bereichs */}
          <div
            className="absolute bottom-0 left-0 right-0 w-full overflow-hidden pointer-events-none"
            style={{ height: '70px', transform: 'translateZ(0)' }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-white fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>
        {/* Features-Bereich */}
        <section className="pb-20 bg-white -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              {/* Feature 1 */}
              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="text-blueGray-800 p-3 w-12 h-12 mb-5 inline-flex items-center justify-center rounded-full bg-red-500">
                    <i className="fas fa-trophy text-white"></i>
                  </div>
                  <h5 className="text-xl font-semibold">Erreiche neue Highscores</h5>
                  <p className="mt-2 mb-4 text-blueGray-600">
                    Stelle dich den Herausforderungen und übertreffe deine Freunde.
                  </p>
                </div>
              </div>
              {/* Feature 2 */}
              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="text-blueGray-800 p-3 w-12 h-12 mb-5 inline-flex items-center justify-center rounded-full bg-blue-500">
                    <i className="fas fa-gamepad text-white"></i>
                  </div>
                  <h5 className="text-xl font-semibold">Neue Levels</h5>
                  <p className="mt-2 mb-4 text-blueGray-600">
                    Entdecke regelmäßig neue Inhalte und Spielwelten.
                  </p>
                </div>
              </div>
              {/* Feature 3 */}
              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="text-blueGray-800 p-3 w-12 h-12 mb-5 inline-flex items-center justify-center rounded-full bg-green-500">
                    <i className="fas fa-users text-white"></i>
                  </div>
                  <h5 className="text-xl font-semibold">Community</h5>
                  <p className="mt-2 mb-4 text-blueGray-600">
                    Werde Teil einer wachsenden Spieler-Community.
                  </p>
                </div>
              </div>
            </div>
            {/* Weitere Informationen */}
            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <h3 className="text-3xl mb-2 font-semibold leading-normal">
                  Tauche tiefer ein
                </h3>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                  Unsere Spielwelt bietet unendliche Möglichkeiten und Abenteuer.
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                  Erforsche, kämpfe und verbünde dich mit anderen Spielern.
                </p>
                <a
                  href="#mehr-erfahren"
                  className="font-bold text-blueGray-700 mt-8"
                >
                  Mehr erfahren
                </a>
              </div>
              <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                <img
                  alt="Spiel-Screenshot"
                  className="max-w-full rounded-lg shadow-lg"
                  src="../assets/img/game_screenshot.png"
                />
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

export default Hompage;
