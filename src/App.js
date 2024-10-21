// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Importiere die Komponenten
import Login from './components/Login';
import Register from './components/Register';
import QuizForm from './components/QuizForm';
import HomepageSite from './components/HomepageSite';
import Quiz from './components/Quiz';
import QuizRatingPage from './components/bewertung/QuizRatingPage'; // Korrigierter Importpfad

function App() {
  const courseId = 'dein-kurs-id'; // Ersetze dies mit der tatsächlichen Kurs-ID oder passe die Logik an, um sie dynamisch zu erhalten

  return (
    <Router>
      <Routes>
        {/* Login-Seite */}
        <Route path="/" element={<Login />} />

        {/* Registrierungsseite */}
        <Route path="/register" element={<Register />} />

        {/* Weitere Routen */}
        <Route path="/quizform" element={<QuizForm />} />
        <Route path="/homepage" element={<HomepageSite />} />
        <Route path="/quiz" element={<Quiz />} />

        {/* Quiz-Bewertungsseite */}
        <Route path="/quizrating" element={<QuizRatingPage courseId={courseId} />} />
      </Routes>
    </Router>
  );
}

export default App;
