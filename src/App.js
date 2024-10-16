// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importiere die Komponenten
import Login from './components/Login';
import Register from './components/Register';
import QuizForm from './components/QuizForm';
import Hompage from './components/Homepage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Login-Seite */}
        <Route path="/" element={<Login />} />

        {/* Registrierungsseite */}
        <Route path="/register" element={<Register />} />

        {/* Weitere Routen können hier hinzugefügt werden */}
        <Route path="/quizform" element={<QuizForm/>} />
        <Route path="/homepage" element={<Hompage/>} />
      </Routes>
    </Router>
  );
}

export default App;
