// src/components/Dashboard.js

import React from 'react';
import Navbar from './NavbarHomepage';
import FooterSmall from './FooterSmall';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Bilder importieren
import bgImage from '../assets/img/register_bg_2.png';
import {
  FaLeaf,
  FaRecycle,
  FaGlobe,
  FaHandsHelping,
  FaTree,
  FaWater,
  FaWind,
  FaSun,
  FaSeedling,
  FaChartLine,
  FaBell,
  FaEnvelope,
  FaClock,
  FaUserPlus,
  FaCheckCircle,
  FaBookOpen,
} from 'react-icons/fa';

import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const Dashboard = () => {
  const navigate = useNavigate();

  // Funktion zum Abrufen eines Cookies
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
    // Token aus sessionStorage abrufen
    const token = sessionStorage.getItem('token') || getCookie('token');
    if (!token) {
      // Wenn kein Token vorhanden ist, zur Login-Seite weiterleiten
      navigate('/');
    }
    // Optional: Token validieren (z.B. durch eine Anfrage an den Server)
  }, [navigate]);

  // Daten für das gemockte Diagramm
  const chartData = {
    labels: ['Woche 1', 'Woche 2', 'Woche 3', 'Woche 4'],
    datasets: [
      {
        label: 'Erlernte Themen',
        data: [0, 2, 1.6, 8],
        fill: false,
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: 'rgba(34, 197, 94, 1)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />
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
              <div className="w-full lg:w-8/12 px-4 ml-auto mr-auto text-center animate-fade-in-down">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl animate-pulse">
                    Willkommen zurück, {sessionStorage.getItem('username') || 'Umweltfreund'}!
                  </h1>
                  <p className="mt-4 text-lg text-gray-300">
                    Hier ist dein Dashboard mit deinen neuesten Aktivitäten zum Schutz unseres Planeten.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Hauptinhalt */}
        <section className="pb-20 bg-gray-100 -mt-24">
          <div className="container mx-auto px-4">
            {/* Benutzerstatistiken */}
            <div className="flex flex-wrap">
              {/* Erlernte Themen */}
              <div className="w-full md:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg">
                  <div className="p-6 text-center">
                    <FaLeaf className="text-green-500 text-5xl mx-auto animate-spin-slow" />
                    <h5 className="text-xl mt-5 font-semibold">Erlernte Themen</h5>
                    <p className="mt-2 mb-4 text-gray-600 text-3xl font-bold">12</p>
                  </div>
                </div>
              </div>
              {/* Gepflanzte Bäume */}
              <div className="w-full md:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg">
                  <div className="p-6 text-center">
                    <FaTree className="text-green-700 text-5xl mx-auto animate-pulse" />
                    <h5 className="text-xl mt-5 font-semibold">Gepflanzte Bäume</h5>
                    <p className="mt-2 mb-4 text-gray-600 text-3xl font-bold">5</p>
                  </div>
                </div>
              </div>
              {/* Gerettetes Wasser */}
              <div className="w-full md:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg">
                  <div className="p-6 text-center">
                    <FaWater className="text-blue-500 text-5xl mx-auto animate-bounce" />
                    <h5 className="text-xl mt-5 font-semibold">Gerettetes Wasser (Liter)</h5>
                    <p className="mt-2 mb-4 text-gray-600 text-3xl font-bold">150</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Fortschrittsdiagramm und Aktivitäten */}
            <div className="flex flex-wrap mt-4">
              {/* Fortschrittsdiagramm */}
              <div className="w-full lg:w-8/12 px-4">
                <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold mb-4">Dein Lernfortschritt</h3>
                  {/* Interaktives Diagramm */}
                  <div className="w-full h-64">
                    <Line data={chartData} options={chartOptions} />
                  </div>
                </div>
              </div>
              {/* Letzte Aktivitäten */}
              <div className="w-full lg:w-4/12 px-4">
                <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold mb-4">Letzte Aktivitäten</h3>
                  <ul>
                    <li className="mb-4 flex items-center">
                      <FaCheckCircle className="text-green-500 mr-3" />
                      Du hast das Modul "Klimawandel Grundlagen" abgeschlossen.
                    </li>
                    <li className="mb-4 flex items-center">
                      <FaSeedling className="text-green-600 mr-3 animate-bounce" />
                      Du hast einen Baum gepflanzt!
                    </li>
                    <li className="mb-4 flex items-center">
                      <FaUserPlus className="text-blue-500 mr-3" />
                      Dein Freund Alex hat sich deiner Gruppe "Planetenschützer" angeschlossen.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Leaderboard und bevorstehende Module */}
            <div className="flex flex-wrap mt-4">
              {/* Leaderboard */}
              <div className="w-full lg:w-6/12 px-4">
                <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold mb-4">Umweltaktivisten-Rangliste</h3>
                  <table className="w-full text-left">
                    <thead>
                      <tr>
                        <th className="px-4 py-2">Platz</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Erfolge</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-gray-100">
                        <td className="px-4 py-2">1</td>
                        <td className="px-4 py-2">Max Kade</td>
                        <td className="px-4 py-2">50</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">2</td>
                        <td className="px-4 py-2">Khade Air</td>
                        <td className="px-4 py-2">45</td>
                      </tr>
                      <tr className="bg-gray-100">
                        <td className="px-4 py-2">3</td>
                        <td className="px-4 py-2">
                          {sessionStorage.getItem('username') || 'Umweltfreund'}
                        </td>
                        <td className="px-4 py-2">40</td>
                      </tr>
                      {/* Weitere Einträge */}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Bevorstehende Module */}
              <div className="w-full lg:w-6/12 px-4">
                <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold mb-4">Bevorstehende Module</h3>
                  <ul>
                    <li className="mb-4 flex items-center">
                      <FaClock className="text-gray-500 mr-3" />
                      <div>
                        <p className="font-semibold">Erneuerbare Energien</p>
                        <p className="text-sm text-gray-600">In 2 Tagen</p>
                      </div>
                    </li>
                    <li className="mb-4 flex items-center">
                      <FaClock className="text-gray-500 mr-3" />
                      <div>
                        <p className="font-semibold">Nachhaltige Landwirtschaft</p>
                        <p className="text-sm text-gray-600">In 5 Tagen</p>
                      </div>
                    </li>
                    {/* Weitere Module */}
                  </ul>
                </div>
              </div>
            </div>
            {/* Nachrichten und Benachrichtigungen */}
            <div className="flex flex-wrap mt-4">
              {/* Nachrichten */}
              <div className="w-full lg:w-6/12 px-4">
                <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold mb-4">Nachrichten</h3>
                  <ul>
                    <li className="mb-4 flex items-center">
                      <FaEnvelope className="text-blue-500 mr-3" />
                      Neue Nachricht von deiner Gruppe "Planetenschützer"
                    </li>
                    <li className="mb-4 flex items-center">
                      <FaEnvelope className="text-blue-500 mr-3" />
                      Erinnerung: Umweltprojekt-Abgabe
                    </li>
                    {/* Weitere Nachrichten */}
                  </ul>
                </div>
              </div>
              {/* Benachrichtigungen */}
              <div className="w-full lg:w-6/12 px-4">
                <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold mb-4">Benachrichtigungen</h3>
                  <ul>
                    <li className="mb-4 flex items-center">
                      <FaBell className="text-yellow-500 mr-3 animate-shake" />
                      Aktualisiere dein Profilbild für ein neues Abzeichen!
                    </li>
                    <li className="mb-4 flex items-center">
                      <FaBell className="text-yellow-500 mr-3 animate-shake" />
                      Neues Modul verfügbar: "Plastik vermeiden"
                    </li>
                    {/* Weitere Benachrichtigungen */}
                  </ul>
                </div>
              </div>
            </div>
            {/* Abzeichen und Errungenschaften */}
            <div className="flex flex-wrap mt-4">
              {/* Abzeichen */}
              <div className="w-full lg:w-12/12 px-4">
                <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold mb-4">Deine Abzeichen</h3>
                  <div className="flex flex-wrap">
                    <div className="w-1/2 md:w-1/4 text-center mb-6">
                      <FaGlobe className="text-blue-500 text-6xl mx-auto animate-spin-slow" />
                      <p className="mt-2 font-semibold">Weltretter</p>
                    </div>
                    <div className="w-1/2 md:w-1/4 text-center mb-6">
                      <FaRecycle className="text-green-500 text-6xl mx-auto animate-pulse" />
                      <p className="mt-2 font-semibold">Recycling-Profi</p>
                    </div>
                    <div className="w-1/2 md:w-1/4 text-center mb-6">
                      <FaWind className="text-gray-500 text-6xl mx-auto animate-bounce" />
                      <p className="mt-2 font-semibold">Windkraft-Fan</p>
                    </div>
                    <div className="w-1/2 md:w-1/4 text-center mb-6">
                      <FaSun className="text-yellow-500 text-6xl mx-auto animate-bounce" />
                      <p className="mt-2 font-semibold">Solarenergie-Nutzer</p>
                    </div>
                    {/* Weitere Abzeichen */}
                  </div>
                </div>
              </div>
            </div>
            {/* Call to Action */}
            <div className="flex justify-center mt-6">
              <button
                className="bg-green-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-green-600 transition duration-300 animate-bounce"
                onClick={() => navigate('/quiz')}
              >
                Starte ein neues Modul
              </button>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <FooterSmall />
    </>
  );
};

export default Dashboard;
