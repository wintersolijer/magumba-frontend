// js/QuizForm.js
import React from "react";
import FooterSmall from './FooterSmall';
import registerBgImage from '../assets/img/register_bg_2.png';

import Navbar from "./Navbar";


function QuizForm() {
    // Lokale State-Variablen verwenden Sie mit React.useState
    const [question, setQuestion] = React.useState('');
    const [answers, setAnswers] = React.useState([{ answer: '', isTrue: false }]);
    const [points, setPoints] = React.useState(1);
    const [explaination, setExplainiation] = React.useState('');
  
    const handleAddAnswer = () => {
      setAnswers([...answers, { answer: '', isTrue: false }]);
    };
  
    const handleAnswerChange = (index, field, value) => {
      const newAnswers = [...answers];
      newAnswers[index][field] = value;
      setAnswers(newAnswers);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Daten, die an das Backend gesendet werden sollen
      const data = { question, answers, points , explaination };
  
      // AJAX-Anfrage an das Flask-Backend
      fetch('/add_question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log('Erfolg:', result);
          // Hier können Sie den Nutzer informieren oder das Formular zurücksetzen
        })
        .catch((error) => {
          console.error('Fehler:', error);
        });
    };
  
    return (
    <>
      <Navbar />

        <main>
            <section className="relative w-full h-full py-40 min-h-screen">
          {/* Hintergrundbild */}
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage: `url(${registerBgImage})`,
            }}
          ></div>
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
      <form onSubmit={handleSubmit} className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Neue Frage erstellen</h2>
  
        {/* Frage */}
        <div className="mb-4">
          <label className="block text-gray-700">Frage:</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
  
        {/* Antworten */}
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
                onChange={(e) => handleAnswerChange(index, 'isTrue', e.target.checked)}
                className="mr-1"
              />
              Korrekt
            </label>
          </div>
        ))}
  
        <button
          type="button"
          onClick={handleAddAnswer}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Antwort hinzufügen
        </button>
  
        {/* Punkte */}
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
        {/* Erklärung */}
        <div className="mb-4">
          <label className="block text-gray-700">Erklärung:</label>
          <input
            type="text"
            value={explaination}
            onChange={(e) => setExplainiation(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>


  
        {/* Absenden */}
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Frage speichern
        </button>
      </form>
      </div>
        </div>
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

  export default QuizForm;
  