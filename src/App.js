// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Import components
import Login from './components/Login';
import Register from './components/Register';
import QuizForm from './components/QuizForm';
import HomepageSite from './components/HomepageSite'; // Student homepage
import Dashboard from './components/Dashboard'; // Lecturer homepage
import Quiz from './components/Quiz';
import QuizRatingPage from './components/bewertung/QuizRatingPage';
import Shop from './components/Shop'; // Shop component
import ViewPerformance from './components/ViewPerformance'; // View Performance component
import Settings from './components/Settings'; // Settings component
import Profile from './components/Profile'; // Profile component

function App() {
  const courseId = 'dein-kurs-id'; // Replace with actual course ID if needed

  return (
    <Router>
      <Routes>
        {/* Login page */}
        <Route path="/" element={<Login />} />

        {/* Registration page */}
        <Route path="/register" element={<Register />} />

        {/* Student homepage */}
        <Route path="/homepage-student" element={<HomepageSite />} />

        {/* Lecturer homepage */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Quiz form (accessible by lecturers) */}
        <Route path="/quizform" element={<QuizForm />} />

        {/* Quiz page */}
        <Route path="/quiz" element={<Quiz />} />

        {/* Shop page */}
        <Route path="/shop" element={<Shop />} />

        {/* View Performance page */}
        <Route path="/student-performance" element={<ViewPerformance />} />

        {/* Student Dashboard */}
        <Route path="/student-dashboard" element={<HomepageSite />} />

        {/* Settings page */}
        <Route path="/settings" element={<Settings />} />

        {/* Profile page */}
        <Route path="/profile" element={<Profile />} />

        {/* Quiz rating page */}
        <Route path="/quizrating" element={<QuizRatingPage courseId={courseId} />} />

        {/* Additional routes can be added here */}
      </Routes>
    </Router>
  );
}

export default App;
