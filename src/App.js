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
import Homepage2 from './components/Hompage2';

function App() {
  return (
    <Router>
      <Routes>
        {/* Login-Seite */}
        <Route path="/" element={<Login />} />

        {/* Registrierungsseite */}
        <Route path="/register" element={<Register />} />

        {/* Weitere Routen können hier hinzugefügt werden */}
        <Route path="/quizform" element={<QuizForm />} />
        <Route path="/homepage" element={<HomepageSite />} />
        <Route path="/homepage2" element={<Homepage2 />} />
        <Route path='/quiz' element = {<Quiz />} />
      </Routes>
    </Router>
  );
}

export default App;
