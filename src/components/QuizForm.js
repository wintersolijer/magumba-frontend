// src/components/QuizForm.js

import React, { useState, useEffect } from 'react';
import FooterSmall from './FooterSmall';
import registerBgImage from '../assets/img/register_bg_2.png';
import Navbar from './NavbarHomepage';
import { useNavigate } from 'react-router-dom';

function QuizForm() {
  const navigate = useNavigate();

  // Function to get a cookie
  const getCookie = (cname) => {
    const name          = cname + '=';
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
    if (!token || userType !== 'lecturer') {
      // Redirect to login page if no token or not a lecturer
      navigate('/');
    }
    // Optional: Validate token
  }, [navigate]);

  // State variables
  const [questionType, setQuestionType] = useState('multiple_choice');
  const [question, setQuestion]         = useState('');
  const [answers, setAnswers]           = useState([{ answer: '', isTrue: false }]);
  const [points, setPoints]             = useState(1);
  const [explanation, setExplanation]   = useState('');

  const handleAddAnswer = () => {
    setAnswers([...answers, { answer: '', isTrue: false }]);
  };

  const handleAnswerChange = (index, field, value) => {
    const newAnswers         = [...answers];
    newAnswers[index][field] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Data validation
    if (!question) {
      alert('Bitte geben Sie eine Frage ein.');
      return;
    }

    if (questionType === 'multiple_choice' && answers.length < 2) {
      alert('Bitte geben Sie mindestens zwei Antworten ein.');
      return;
    }

    if (questionType !== 'fill_in_blank' && !answers.some((ans) => ans.isTrue)) {
      alert('Bitte markieren Sie mindestens eine korrekte Antwort.');
      return;
    }

    // For fill-in-the-blank, all provided answers are correct
    if (questionType === 'fill_in_blank') {
      const updatedAnswers = answers.map((ans) => ({
        ...ans,
        isTrue: true,
      }));
      setAnswers(updatedAnswers);
    }

    // Data to be sent to the backend or stored locally
    const data = { question, answers, points, type: questionType, explanation };
    console.log(data);

    // Store the question locally for this mockup
    const existingQuestions = JSON.parse(localStorage.getItem('questions')) || [];
    localStorage.setItem('questions', JSON.stringify([...existingQuestions, data]));

    // Mock submission
    alert('Frage erfolgreich gespeichert!');

    // Reset form
    setQuestion('');
    setAnswers([{ answer: '', isTrue: false }]);
    setPoints(1);
    setExplanation('');
  };

  return (
    <>
      <Navbar />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage: `url(${registerBgImage})`,
            }}
          ></div>
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-8/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0 animate-fade-in-up">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h2 className="text-2xl font-bold mb-4">Neue Frage erstellen</h2>
                    </div>
                    <hr className="mt-6 border-b-1 border-gray-300" />
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form onSubmit={handleSubmit}>
                      {/* Question Type */}
                      <div className="mb-4">
                        <label className="block text-gray-700">Fragetyp:</label>
                        <select
                          value={questionType}
                          onChange={(e) => {
                            setQuestionType(e.target.value);
                            setAnswers([{ answer: '', isTrue: false }]);
                          }}
                          className="w-full px-3 py-2 border rounded"
                        >
                          <option value="multiple_choice">Multiple Choice</option>
                          <option value="true_false">Wahr / Falsch</option>
                          <option value="fill_in_blank">Lückentext</option>
                        </select>
                      </div>

                      {/* Question */}
                      <div className="mb-4">
                        <label className="block text-gray-700">Frage:</label>
                        <input
                          type="text"
                          value={question}
                          onChange={(e) => setQuestion(e.target.value)}
                          className="w-full px-3 py-2 border rounded"
                        />
                      </div>

                      {/* Answers */}
                      {questionType === 'multiple_choice' && (
                        <>
                          {answers.map((answer, index) => (
                            <div key={index} className="mb-4 flex items-center">
                              <input
                                type="text"
                                value={answer.answer}
                                onChange={(e) => handleAnswerChange(index, 'answer', e.target.value)}
                                className="w-full px-3 py-2 border rounded mr-2"
                                placeholder={`Antwort ${index + 1}`}
                              />
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={answer.isTrue}
                                  onChange={(e) =>
                                    handleAnswerChange(index, 'isTrue', e.target.checked)
                                  }
                                  className="mr-1"
                                />
                                Korrekt
                              </label>
                            </div>
                          ))}

                          <button
                            type="button"
                            onClick={handleAddAnswer}
                            className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 transition duration-300"
                          >
                            Antwort hinzufügen
                          </button>
                        </>
                      )}

                      {questionType === 'true_false' && (
                        <div className="mb-4">
                          <label className="block text-gray-700">Aussage ist:</label>
                          <div className="flex items-center">
                            <label className="flex items-center mr-4">
                              <input
                                type="radio"
                                name="trueFalse"
                                checked={answers[0].isTrue === true}
                                onChange={() =>
                                  setAnswers([{ answer: 'Wahr', isTrue: true }])
                                }
                                className="mr-1"
                              />
                              Wahr
                            </label>
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="trueFalse"
                                checked={answers[0].isTrue === false}
                                onChange={() =>
                                  setAnswers([{ answer: 'Falsch', isTrue: false }])
                                }
                                className="mr-1"
                              />
                              Falsch
                            </label>
                          </div>
                        </div>
                      )}

                      {questionType === 'fill_in_blank' && (
                        <div className="mb-4">
                          <label className="block text-gray-700">Korrekte Antwort(en):</label>
                          {answers.map((answer, index) => (
                            <div key={index} className="mb-2">
                              <input
                                type="text"
                                value={answer.answer}
                                onChange={(e) =>
                                  handleAnswerChange(index, 'answer', e.target.value)
                                }
                                className="w-full px-3 py-2 border rounded"
                                placeholder={`Korrekte Antwort ${index + 1}`}
                              />
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={handleAddAnswer}
                            className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 transition duration-300"
                          >
                            Weitere Antwort hinzufügen
                          </button>
                        </div>
                      )}

                      {/* Explanation */}
                      <div className="mb-4">
                        <label className="block text-gray-700">Erklärung:</label>
                        <textarea
                          value={explanation}
                          onChange={(e) => setExplanation(e.target.value)}
                          className="w-full px-3 py-2 border rounded"
                          placeholder="Erklärung zur Frage eingeben"
                        ></textarea>
                      </div>

                      {/* Points */}
                      <div className="mb-4">
                        <label className="block text-gray-700">Punkte:</label>
                        <input
                          type="number"
                          min="1"
                          value={points}
                          onChange={(e) => setPoints(parseInt(e.target.value))}
                          className="w-full px-3 py-2 border rounded"
                        />
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                      >
                        Frage speichern
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterSmall absolute />
    </>
  );
}

export default QuizForm;
