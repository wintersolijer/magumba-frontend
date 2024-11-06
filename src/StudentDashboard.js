// src/components/StudentDashboard.js

import React, { useEffect, useState } from 'react';
import Navbar from './NavbarHomepage';
import FooterSmall from './FooterSmall';
import { useNavigate } from 'react-router-dom';

// Icons
import { FaStar, FaChartLine, FaTasks, FaMedal } from 'react-icons/fa';

// Mock data for demonstration purposes
const achievements = [
  { title: 'Quiz Master', description: 'Beantworte 100 Quizfragen korrekt', icon: <FaStar /> },
  { title: 'Streaker', description: 'Logge dich 7 Tage hintereinander ein', icon: <FaChartLine /> },
  { title: 'Marathon', description: 'Spiele 50 Quizze', icon: <FaTasks /> },
];

const recentActivities = [
  { activity: 'Du hast ein Quiz abgeschlossen und 10 Punkte erhalten.', date: 'Heute' },
  { activity: 'Du hast den Erfolg "Quiz Master" freigeschaltet.', date: 'Gestern' },
  { activity: 'Du hast dich zum ersten Mal angemeldet.', date: 'Vor 2 Tagen' },
];

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: sessionStorage.getItem('username') || 'Student',
    points: 1500,
    rank: 3,
    streak: 5,
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

  return (
    <>
      {/* Navbar */}
      <Navbar />
      <main>
        {/* Hero Section */}
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center bg-gray-900">
          <div className="container relative mx-auto animate-fade-in-up">
            <div className="items-center flex flex-wrap">
              <div className="w-full px-4 ml-auto mr-auto text-center">
                <h1 className="text-white font-semibold text-5xl">
                  Willkommen, {userData.username}!
                </h1>
                <p className="mt-4 text-lg text-gray-300">
                  Hier ist dein persönliches Dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Dashboard Content */}
        <section className="pb-20 bg-gray-100 -mt-24">
          <div className="container mx-auto px-4">
            {/* Stats */}
            <div className="flex flex-wrap">
              {/* Points */}
              <div className="w-full md:w-4/12 px-4 text-center animate-fade-in">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <FaMedal className="text-yellow-500 text-6xl mx-auto mb-4" />
                    <h6 className="text-xl font-semibold">Punkte</h6>
                    <p className="mt-2 mb-4 text-gray-600 text-3xl font-bold">
                      {userData.points}
                    </p>
                  </div>
                </div>
              </div>
              {/* Rank */}
              <div className="w-full md:w-4/12 px-4 text-center animate-fade-in">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <FaStar className="text-blue-500 text-6xl mx-auto mb-4" />
                    <h6 className="text-xl font-semibold">Rang</h6>
                    <p className="mt-2 mb-4 text-gray-600 text-3xl font-bold">
                      #{userData.rank}
                    </p>
                  </div>
                </div>
              </div>
              {/* Streak */}
              <div className="w-full md:w-4/12 px-4 text-center animate-fade-in">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <FaChartLine className="text-green-500 text-6xl mx-auto mb-4" />
                    <h6 className="text-xl font-semibold">Login-Streak</h6>
                    <p className="mt-2 mb-4 text-gray-600 text-3xl font-bold">
                      {userData.streak} Tage
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Achievements */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-6 animate-fade-in">
              <h3 className="text-2xl font-semibold mb-4">Erfolge</h3>
              <div className="flex flex-wrap">
                {achievements.map((achievement, index) => (
                  <div key={index} className="w-full md:w-4/12 px-4 text-center mb-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-gray-50 w-full shadow rounded-lg p-4 hover:shadow-lg transition duration-300">
                      <div className="flex-auto">
                        <div className="text-4xl mb-2">{achievement.icon}</div>
                        <h6 className="text-xl font-semibold">{achievement.title}</h6>
                        <p className="mt-2 mb-4 text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Recent Activities */}
            <div className="bg-white shadow-lg rounded-lg p-6 animate-fade-in">
              <h3 className="text-2xl font-semibold mb-4">Aktivitäten</h3>
              <ul>
                {recentActivities.map((activity, index) => (
                  <li key={index} className="mb-2">
                    <div className="flex items-center">
                      <div className="bg-gray-200 rounded-full h-8 w-8 flex items-center justify-center mr-3">
                        <FaTasks className="text-gray-600" />
                      </div>
                      <div>
                        <p className="text-gray-800">{activity.activity}</p>
                        <p className="text-gray-500 text-sm">{activity.date}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <FooterSmall />
    </>
  );
};

export default StudentDashboard;
