// src/components/ViewPerformance.js

import React, { useEffect } from 'react';
import Navbar from './NavbarHomepage';
import FooterSmall from './FooterSmall';
import { useNavigate } from 'react-router-dom';

// Images
import bgImage from '../assets/img/register_bg_2.png';

// Icons
import { FaChartBar, FaUserGraduate, FaMedal } from 'react-icons/fa';

// Dummy data
const studentData = [
  { name: 'Lisa Meier', points: 1500, rank: 1, progress: 90 },
  { name: 'Tom Schmitt', points: 1400, rank: 2, progress: 85 },
  { name: 'Anna Müller', points: 1300, rank: 3, progress: 80 },
  { name: 'Peter Weber', points: 1200, rank: 4, progress: 75 },
  // Add more students as needed
];

const ViewPerformance = () => {
  const navigate = useNavigate();

  // Function to get a cookie
  const getCookie = (cname) => {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca    = decodedCookie.split(';');
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

  return (
    <>
      {/* Navbar */}
      <Navbar />
      <main>
        {/* Hero Section */}
        <div
          className="relative pt-16 pb-32 flex content-center items-center justify-center"
          style={{
            minHeight: '50vh', // Adjusted height to prevent overlapping
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
                  Studentenleistungen
                </h1>
                <p className="mt-4 text-lg text-gray-300">
                  Überprüfen Sie die Fortschritte und Leistungen Ihrer Studenten.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Performance Table */}
        <section className="pb-20 bg-gray-100">
          {/* Removed -mt-24 to fix overlapping */}
          <div className="container mx-auto px-4">
            <div className="bg-white shadow-lg rounded-lg p-6 mb-6 animate-fade-in">
              <h3 className="text-2xl font-semibold mb-4 flex items-center">
                <FaChartBar className="text-blue-500 mr-2" /> Übersicht
              </h3>
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Punkte
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Fortschritt
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Rang
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {studentData.map((student, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition duration-300">
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <FaUserGraduate className="text-gray-500 mr-2" />
                          <p className="text-gray-900 whitespace-no-wrap">{student.name}</p>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{student.points}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="relative pt-1">
                          <div className="flex mb-2 items-center justify-between">
                            <div>
                              <span className="text-xs font-semibold inline-block text-green-600">
                                {student.progress}%
                              </span>
                            </div>
                          </div>
                          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                            <div
                              style={{ width: `${student.progress}%` }}
                              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <FaMedal className="text-yellow-500 mr-2" />
                          <p className="text-gray-900 whitespace-no-wrap">{student.rank}</p>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Pagination */}
              <div className="flex justify-between mt-4">
                <button className="text-gray-600 hover:text-gray-800">
                  &larr; Vorherige
                </button>
                <button className="text-gray-600 hover:text-gray-800">
                  Nächste &rarr;
                </button>
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

export default ViewPerformance;
