import React, { useState } from 'react';
import axios from 'axios';
import backgroundImage from '../../assets/img/register_bg_2.png';

function QuizRatingPage({ courseId }) {
  const [rating, setRating] = useState(0);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const submitRating = async () => {
    try {
      const response = await axios.post('/star_course', {
        course_id: courseId,
        points: rating,
      });
      // Erfolgreiche Bewertungshandhabung
      console.log('Bewertung erfolgreich übermittelt:', response.data);
    } catch (error) {
      console.error('Fehler beim Übermitteln der Bewertung:', error);
    }
  };

  return (
    <>
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          {/* Hintergrundbild */}
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage: `url(${backgroundImage})`,
            }}
          ></div>
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                {/* Bewertungsformular */}
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h6 className="text-gray-500 text-sm font-bold">
                        Bewerte das Quiz
                      </h6>
                    </div>
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div className="text-center mb-6">
                      {/* Sterne für Bewertung */}
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleRating(star)}
                          className="focus:outline-none"
                        >
                          <svg
                            className={`w-12 h-12 ${
                              rating >= star ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.98a1 1 0 00.95.69h4.21c.969 0 1.371 1.24.588 1.81l-3.4 2.466a1 1 0 00-.364 1.118l1.286 3.98c.3.921-.755 1.688-1.538 1.118l-3.4-2.466a1 1 0 00-1.176 0l-3.4 2.466c-.782.57-1.838-.197-1.538-1.118l1.286-3.98a1 1 0 00-.364-1.118L2.225 9.407c-.782-.57-.38-1.81.588-1.81h4.21a1 1 0 00.95-.69l1.286-3.98z" />
                          </svg>
                        </button>
                      ))}
                    </div>
                    <div className="text-center mt-6">
                      <button
                        onClick={submitRating}
                        className="bg-gray-800 text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg focus:outline-none w-full"
                      >
                        Bewertung absenden
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default QuizRatingPage;
