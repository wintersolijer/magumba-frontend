import React, { useState, useEffect } from 'react';
import Navbar from './NavbarHomepage';
import FooterSmall from './FooterSmall';
import { useNavigate } from 'react-router-dom';

let correctAnswersList;
let questionPoints;

const Quiz = () => {
  const [questionData, setQuestionData] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false); // State to control overlay visibility
  const [overlayPoints, setOverlayPoints] = useState(null); // State to store the points for the overlay

  const navigate = useNavigate();

  // Funktion zum Abrufen eines Cookies
  const getCookie = (cname) => {
    const name = cname + "=";
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
    return "";
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

      correctAnswersList = data.answers
        .filter(answer => answer.isTrue === 'True')
        .map(answer => answer.answer);
      questionPoints = data.points;
      setQuestionData(data);
    } catch (error) {
      console.error('Fehler beim Laden der Frage:', error);
      setError('Fehler beim Laden der Frage. Bitte versuche es erneut.');
    } finally {
      setIsLoading(false);
      setIsCorrect(null); // Reset the correctness state when a new question loads
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  const handleAnswerChange = (index) => {
    setSelectedAnswers((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((id) => id !== index);
      } else {
        return [...prevSelected, index];
      }
    });
  };

  const handleSubmit = async () => {
    if (selectedAnswers.length === 0) {
      alert('Bitte wähle mindestens eine Antwort aus.');
      return;
    }

    let selected = selectedAnswers.map(index => questionData.answers[index].answer);
    let a = selected.sort();
    let b = correctAnswersList.sort();

    let arraysMatch = true;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        arraysMatch = false;
        break;
      }
    }

    setIsCorrect(arraysMatch);
    if (arraysMatch) {
      const userId = "jfklsajflk"; // You can replace this with the actual user ID
      const points = questionPoints; // Points from the question

      // Show the overlay with the points
      setOverlayPoints(points);
      setShowOverlay(true);

      try {
        // Make the API call to add points
        const response = await fetch('http://127.0.0.1:5000/add_points', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: userId,
            points: points,
          }),
        });

        if (!response.ok) {
          throw new Error('Fehler beim Hinzufügen von Punkten');
        }

        const result = await response.json();
        console.log('Punkte erfolgreich hinzugefügt:', result);
      } catch (error) {
        console.error('Fehler beim Hinzufügen von Punkten:', error);
      }

      // Hide the overlay after 2 seconds
      setTimeout(() => {
        setShowOverlay(false);
        fetchQuestion();
        setSelectedAnswers([]);
      }, 2000); // Overlay visible for 2 seconds
    } else {
      // Delay fetching a new question if incorrect
      setTimeout(() => {
        fetchQuestion();
        setSelectedAnswers([]);
      }, 2000);
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-8/12 px-4">
                <div
                  className={`relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white p-6 ${
                    isCorrect === true ? 'bg-green-200' : isCorrect === false ? 'bg-red-200' : ''
                  }`}
                >
                  {isLoading ? (
                    <p>Frage wird geladen...</p>
                  ) : error ? (
                    <p className="text-red-500">{error}</p>
                  ) : questionData ? (
                    <>
                      <h2 className="text-2xl font-semibold mb-4">
                        {questionData.question + " +" + questionData.points + " Points"}
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
          {/* Overlay for correct answer */}
          {showOverlay && (
            <div className="absolute inset-0 bg-green-500 bg-opacity-75 flex justify-center items-center text-white text-4xl">
              +{overlayPoints} Points!
            </div>
          )}
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
};

export default Quiz;