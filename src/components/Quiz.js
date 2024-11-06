// src/components/Quiz.js

import React, { useState, useEffect } from 'react';
import Navbar from './NavbarHomepage';
import FooterSmall from './FooterSmall';
import { useNavigate } from 'react-router-dom';

let correctAnswersList;
let questionPoints;

const Quiz = () => {
  const [questionData, setQuestionData] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [fillInAnswer, setFillInAnswer] = useState(''); // For fill-in-the-blank
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayPoints, setOverlayPoints] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const navigate = useNavigate();

  // Function to get a cookie
  const getCookie = (cname) => {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca            = decodedCookie.split(';');
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
    const token    = sessionStorage.getItem('token') || getCookie('token');
    const userType = sessionStorage.getItem('userType');
    if (!token || userType !== 'student') {
      // Redirect to login page if no token or not a student
      navigate('/');
    }
    // Optional: Validate token
  }, [navigate]);

  // Function to fetch a new question
  const fetchQuestion = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch questions from localStorage
      const questions = JSON.parse(localStorage.getItem('questions')) || [];
      if (questions.length === 0) {
        setError('Keine Fragen verfügbar. Bitte später erneut versuchen.');
        setQuestionData(null);
        return;
      }
      // Randomly select a question
      const randomIndex = Math.floor(Math.random() * questions.length);
      const data        = questions[randomIndex];

      correctAnswersList = data.answers
        .filter((ans) => ans.isTrue)
        .map((ans) => ans.answer.toLowerCase().trim());
      questionPoints = data.points;
      setQuestionData(data);
    } catch (error) {
      console.error('Fehler beim Laden der Frage:', error);
      setError('Fehler beim Laden der Frage. Bitte versuche es erneut.');
    } finally {
      setIsLoading(false);
      setIsCorrect(null);
      setShowExplanation(false);
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
    let isAnswerCorrect = false;

    if (questionData.type === 'multiple_choice') {
      if (selectedAnswers.length === 0) {
        alert('Bitte wähle mindestens eine Antwort aus.');
        return;
      }

      let selected = selectedAnswers
        .map((index) => questionData.answers[index].answer.toLowerCase().trim())
        .sort();
      let correct = [...correctAnswersList].sort();

      isAnswerCorrect = JSON.stringify(selected) === JSON.stringify(correct);
    } else if (questionData.type === 'true_false') {
      if (selectedAnswers.length === 0) {
        alert('Bitte wähle eine Antwort aus.');
        return;
      }

      let selected = questionData.answers[selectedAnswers[0]].isTrue;
      isAnswerCorrect = selected === true;
    } else if (questionData.type === 'fill_in_blank') {
      if (fillInAnswer.trim() === '') {
        alert('Bitte fülle die Antwort aus.');
        return;
      }
      isAnswerCorrect = correctAnswersList.includes(fillInAnswer.trim().toLowerCase());
    }

    setIsCorrect(isAnswerCorrect);
    setShowExplanation(true);

    if (isAnswerCorrect) {
      const points = questionPoints;
      setOverlayPoints(points);
      setShowOverlay(true);

      // Mock API call to update student's points
      setTimeout(() => {
        setShowOverlay(false);
      }, 2000);
    }
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    setSelectedAnswers([]);
    setFillInAnswer('');
    fetchQuestion();
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
                  className={`relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white p-6 animate-fade-in-up ${
                    isCorrect === true
                      ? 'bg-green-100'
                      : isCorrect === false
                      ? 'bg-red-100'
                      : ''
                  }`}
                >
                  {isLoading ? (
                    <p>Frage wird geladen...</p>
                  ) : error ? (
                    <p className="text-red-500">{error}</p>
                  ) : questionData ? (
                    <>
                      <h2 className="text-2xl font-semibold mb-4">
                        {questionData.question + ' +' + questionData.points + ' Punkte'}
                      </h2>
                      <form>
                        {questionData.type === 'multiple_choice' && (
                          <>
                            {questionData.answers.map((answer, index) => (
                              <div
                                key={index}
                                className={`flex items-center mb-2 p-2 rounded ${
                                  isCorrect !== null
                                    ? answer.isTrue
                                      ? 'bg-green-200'
                                      : selectedAnswers.includes(index)
                                      ? 'bg-red-200'
                                      : ''
                                    : ''
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  id={`answer-${index}`}
                                  name={`answers-${index}`}
                                  value={index}
                                  checked={selectedAnswers.includes(index)}
                                  onChange={() => handleAnswerChange(index)}
                                  className="form-checkbox h-5 w-5 text-gray-600"
                                  disabled={isCorrect !== null}
                                />
                                <label htmlFor={`answer-${index}`} className="ml-2 text-gray-700">
                                  {answer.answer}
                                </label>
                              </div>
                            ))}
                          </>
                        )}
                        {questionData.type === 'true_false' && (
                          <>
                            {questionData.answers.map((answer, index) => (
                              <div
                                key={index}
                                className={`flex items-center mb-2 p-2 rounded ${
                                  isCorrect !== null
                                    ? answer.isTrue
                                      ? 'bg-green-200'
                                      : selectedAnswers.includes(index)
                                      ? 'bg-red-200'
                                      : ''
                                    : ''
                                }`}
                              >
                                <input
                                  type="radio"
                                  id={`answer-${index}`}
                                  name="true_false"
                                  value={index}
                                  checked={selectedAnswers.includes(index)}
                                  onChange={() => setSelectedAnswers([index])}
                                  className="form-radio h-5 w-5 text-gray-600"
                                  disabled={isCorrect !== null}
                                />
                                <label htmlFor={`answer-${index}`} className="ml-2 text-gray-700">
                                  {answer.answer}
                                </label>
                              </div>
                            ))}
                          </>
                        )}
                        {questionData.type === 'fill_in_blank' && (
                          <>
                            <input
                              type="text"
                              value={fillInAnswer}
                              onChange={(e) => setFillInAnswer(e.target.value)}
                              className="w-full px-3 py-2 border rounded"
                              placeholder="Deine Antwort"
                              disabled={isCorrect !== null}
                            />
                            {isCorrect === false && (
                              <p className="mt-2 text-red-600">
                                Falsche Antwort. Korrekte Antwort(en):{' '}
                                {correctAnswersList.join(', ')}
                              </p>
                            )}
                          </>
                        )}
                        {isCorrect === null && (
                          <button
                            type="button"
                            className="mt-4 bg-gray-800 text-white text-sm font-bold uppercase px-6 py-2 rounded shadow hover:shadow-lg focus:outline-none hover:bg-gray-700 transition duration-300"
                            onClick={handleSubmit}
                          >
                            Abschicken
                          </button>
                        )}
                      </form>
                      {showExplanation && questionData.explanation && (
                        <div className="mt-4 p-4 bg-gray-100 rounded">
                          <h3 className="text-lg font-semibold">Erklärung:</h3>
                          <p className="text-gray-700">{questionData.explanation}</p>
                        </div>
                      )}
                      {showExplanation && (
                        <button
                          onClick={handleNextQuestion}
                          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                        >
                          Weiter
                        </button>
                      )}
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
            <div className="absolute inset-0 bg-green-500 bg-opacity-75 flex justify-center items-center text-white text-4xl animate-fade-in">
              +{overlayPoints} Punkte!
            </div>
          )}
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
};

export default Quiz;
