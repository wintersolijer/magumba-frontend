// src/components/quiz.js

import React, { useState, useEffect } from 'react';
import Navbar from './NavbarHomepage';
import FooterSmall from './FooterSmall';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const [questionData, setQuestionData] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Neuer Ladezustand
  const [error, setError] = useState(null); // Fehlerzustand


    const navigate = useNavigate();
  
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
        navigate('/');
      }
      // Optional: Token validieren (z.B. durch eine Anfrage an den Server)
    }, [navigate]);
  // Funktion zum Abrufen einer neuen Frage
  const fetchQuestion = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://127.0.0.1:5000/get_rand_question');
      if (!response.ok) {
        throw new Error('Netzwerkantwort war nicht ok');
      }
      const data = await response.json();
      setQuestionData(data);
    } catch (error) {
      console.error('Fehler beim Laden der Frage:', error);
      setError('Fehler beim Laden der Frage. Bitte versuche es erneut.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initiales Laden der Frage beim Mounten des Components
    fetchQuestion();
  }, []);

  const handleAnswerChange = (index) => {
    // Umschalten der ausgewählten Antwort basierend auf dem Index
    setSelectedAnswers((prevSelected) => {
      if (prevSelected.includes(index)) {
        // Antwort entfernen, wenn sie bereits ausgewählt ist
        return prevSelected.filter((id) => id !== index);
      } else {
        // Antwort zur ausgewählten Liste hinzufügen
        return [...prevSelected, index];
      }
    });
  };

  const handleSubmit = async () => {
    if (selectedAnswers.length === 0) {
      alert('Bitte wähle mindestens eine Antwort aus.');
      return;
    }

    // Hier kannst du die Logik zum Überprüfen der Antworten implementieren
    const selected = selectedAnswers.map(index => questionData.answers[index].answer);
    console.log('Ausgewählte Antworten:', selected);

    // Beispiel: Senden der Antworten an die API (optional)
    /*
    try {
      const response = await fetch('http://127.0.0.1:5000/submit_answers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: selected }),
      });
      const result = await response.json();
      console.log('Antwort vom Server:', result);
    } catch (error) {
      console.error('Fehler beim Senden der Antworten:', error);
    }
    */

    // Zurücksetzen der ausgewählten Antworten
    setSelectedAnswers([]);

    // Laden einer neuen Frage
    fetchQuestion();
  };

  return (
    <>
      {/* Navbar */}
      <Navbar  />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          {/* Hintergrundbild oder Styling bei Bedarf */}
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-8/12 px-4">
                {/* Quiz-Inhalt */}
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white p-6">
                  {isLoading ? (
                    <p>Frage wird geladen...</p>
                  ) : error ? (
                    <p className="text-red-500">{error}</p>
                  ) : questionData ? (
                    <>
                      <h2 className="text-2xl font-semibold mb-4">
                        {questionData.question}
                      </h2>
                      <form>
                        {questionData.answers.map((answer, index) => (
                          <div key={index} className="flex items-center mb-2">
                            <input
                              type="checkbox"
                              id={`answer-${index}`}
                              name={`answers-${index}`}
                              value={index}
                              checked={selectedAnswers.includes(index)}
                              onChange={() => handleAnswerChange(index)}
                              className="form-checkbox h-5 w-5 text-gray-600"
                            />
                            <label htmlFor={`answer-${index}`} className="ml-2 text-gray-700">
                              {answer.answer}
                            </label>
                          </div>
                        ))}
                        <button
                          type="button"
                          className="mt-4 bg-gray-800 text-white text-sm font-bold uppercase px-6 py-2 rounded shadow hover:shadow-lg focus:outline-none"
                          onClick={handleSubmit}
                        >
                          Abschicken
                        </button>
                      </form>
                    </>
                  ) : (
                    <p>Keine Frage verfügbar.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Footer */}
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
};

export default Quiz;
