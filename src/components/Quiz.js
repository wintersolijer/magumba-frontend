// src/components/quiz.js

import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import FooterSmall from './FooterSmall';

const Quiz = () => {
  const [questionData, setQuestionData] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  useEffect(() => {
    // Fetch the random question when the component mounts
    const fetchQuestion = async () => {
      try {
        const response = await fetch('/get_rand_question');
        const data = await response.json();
        setQuestionData(data);
      } catch (error) {
        console.error('Fehler beim Laden der Frage:', error);
      }
    };

    fetchQuestion();
  }, []);

  const handleAnswerChange = (answerId) => {
    // Toggle the selected answer
    setSelectedAnswers((prevSelected) => {
      if (prevSelected.includes(answerId)) {
        // Remove the answer if it's already selected
        return prevSelected.filter((id) => id !== answerId);
      } else {
        // Add the answer to the selected list
        return [...prevSelected, answerId];
      }
    });
  };

  const handleSubmit = () => {
    // Handle the logic when the user submits their answers
    console.log('Ausgewählte Antworten:', selectedAnswers);
    // Hier kannst du die Logik zum Überprüfen der Antworten implementieren
  };

  return (
    <>
      {/* Navbar */}
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          {/* Hintergrundbild oder Styling bei Bedarf */}
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-8/12 px-4">
                {/* Quiz-Inhalt */}
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white p-6">
                  {questionData ? (
                    <>
                      <h2 className="text-2xl font-semibold mb-4">
                        {questionData.question}
                      </h2>
                      <form>
                        {questionData.answers.map((answer) => (
                          <div key={answer.id} className="flex items-center mb-2">
                            <input
                              type="checkbox"
                              id={`answer-${answer.id}`}
                              name="answers"
                              value={answer.id}
                              checked={selectedAnswers.includes(answer.id)}
                              onChange={() => handleAnswerChange(answer.id)}
                              className="form-checkbox h-5 w-5 text-gray-600"
                            />
                            <label htmlFor={`answer-${answer.id}`} className="ml-2 text-gray-700">
                              {answer.text}
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
                    <p>Frage wird geladen...</p>
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
