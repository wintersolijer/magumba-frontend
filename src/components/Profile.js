// src/components/Profile.js

import React, { useState, useEffect } from 'react';
import Navbar from './NavbarHomepage';
import FooterSmall from './FooterSmall';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Profile = () => {
  const navigate = useNavigate();

  // State for user data
  const [userData, setUserData] = useState({
    username: sessionStorage.getItem('username') || 'johndoe',
    email: 'johndoe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    birthday: '1995-05-15',
    bio: 'Software engineer with a passion for learning and teaching.',
    location: 'Berlin, Germany',
    department: 'Informatik',
    courses: ['Programmieren I', 'Datenbanken', 'Webentwicklung'],
    // Add more fields as needed
  });

  // State for editing mode
  const [isEditing, setIsEditing] = useState(false);

  const userType = sessionStorage.getItem('userType');

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
    const token = sessionStorage.getItem('token') || getCookie('token');
    if (!token) {
      // Redirect to login page if no token
      navigate('/');
    }
    // Optional: Fetch user data from backend and update userData based on userType
    if (userType === 'lecturer') {
      setUserData((prevData) => ({
        ...prevData,
        firstName: 'Dr. Maria',
        lastName: 'Schneider',
        email: 'maria.schneider@university.edu',
        bio: 'Professorin für Informatik mit Schwerpunkt künstliche Intelligenz.',
        department: 'Informatik',
        courses: ['Künstliche Intelligenz', 'Maschinelles Lernen'],
        location: 'München, Deutschland',
      }));
    } else {
      setUserData((prevData) => ({
        ...prevData,
        firstName: 'Max',
        lastName: 'Mustermann',
        email: 'max.mustermann@student.uni.de',
        bio: 'Informatikstudent im dritten Semester mit Interesse an Webentwicklung.',
        department: 'Informatik',
        courses: ['Programmieren I', 'Datenbanken', 'Webentwicklung'],
        location: 'Berlin, Deutschland',
      }));
    }
  }, [navigate, userType]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    // Mock save function
    alert('Profil aktualisiert!');
    setIsEditing(false);
    // Optional: Send updated data to backend
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Optional: Reset changes by re-fetching data from backend
  };

  const handleProfilePictureUpload = (e) => {
    // Handle profile picture upload
    const file = e.target.files[0];
    console.log('Uploaded file:', file);
    alert('Profilbild hochgeladen!');
  };

  return (
    <>
      <Navbar />
      <main>
        <section className="w-full h-full py-20 bg-gray-100">
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center">
              <div className="w-full lg:w-8/12 px-4">
                <div className="bg-white shadow-lg rounded-lg p-6 animate-fade-in">
                  <div className="flex items-center mb-6">
                    <div className="mr-6 relative">
                      {/* Profile Picture Placeholder */}
                      <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        <FaUserCircle className="text-gray-400 text-8xl" />
                      </div>
                      {/* Upload Button */}
                      {isEditing && (
                        <div className="absolute bottom-0 right-0">
                          <label
                            htmlFor="profilePicture"
                            className="bg-blue-500 text-white rounded-full p-2 cursor-pointer hover:bg-blue-600 transition duration-300"
                          >
                            <i className="fas fa-camera"></i>
                          </label>
                          <input
                            type="file"
                            id="profilePicture"
                            name="profilePicture"
                            accept="image/*"
                            onChange={handleProfilePictureUpload}
                            className="hidden"
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <h2 className="text-3xl font-semibold">
                        {userData.firstName} {userData.lastName}
                      </h2>
                      <p className="text-gray-600">@{userData.username}</p>
                      <p className="text-gray-600">{userData.location}</p>
                    </div>
                    <div className="ml-auto">
                      {!isEditing ? (
                        <button
                          onClick={handleEditProfile}
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                        >
                          Profil bearbeiten
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={handleSaveChanges}
                            className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600 transition duration-300"
                          >
                            Speichern
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
                          >
                            Abbrechen
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  {/* Profile Details */}
                  <form onSubmit={handleSaveChanges}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* First Name */}
                      <div>
                        <label className="block text-gray-700">Vorname:</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="firstName"
                            value={userData.firstName}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded"
                          />
                        ) : (
                          <p className="text-gray-800">{userData.firstName}</p>
                        )}
                      </div>
                      {/* Last Name */}
                      <div>
                        <label className="block text-gray-700">Nachname:</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="lastName"
                            value={userData.lastName}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded"
                          />
                        ) : (
                          <p className="text-gray-800">{userData.lastName}</p>
                        )}
                      </div>
                      {/* Username */}
                      <div>
                        <label className="block text-gray-700">Benutzername:</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="username"
                            value={userData.username}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded"
                          />
                        ) : (
                          <p className="text-gray-800">@{userData.username}</p>
                        )}
                      </div>
                      {/* Email */}
                      <div>
                        <label className="block text-gray-700">E-Mail:</label>
                        {isEditing ? (
                          <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded"
                          />
                        ) : (
                          <p className="text-gray-800">{userData.email}</p>
                        )}
                      </div>
                      {/* Department */}
                      <div>
                        <label className="block text-gray-700">Fachbereich:</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="department"
                            value={userData.department}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded"
                          />
                        ) : (
                          <p className="text-gray-800">{userData.department}</p>
                        )}
                      </div>
                      {/* Courses */}
                      <div>
                        <label className="block text-gray-700">
                          {userType === 'lecturer' ? 'Unterrichtete Kurse:' : 'Belegte Kurse:'}
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="courses"
                            value={userData.courses.join(', ')}
                            onChange={(e) =>
                              setUserData({ ...userData, courses: e.target.value.split(', ') })
                            }
                            className="w-full px-3 py-2 border rounded"
                          />
                        ) : (
                          <p className="text-gray-800">{userData.courses.join(', ')}</p>
                        )}
                      </div>
                      {/* Location */}
                      <div>
                        <label className="block text-gray-700">Standort:</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="location"
                            value={userData.location}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded"
                          />
                        ) : (
                          <p className="text-gray-800">{userData.location}</p>
                        )}
                      </div>
                      {/* Bio */}
                      <div className="md:col-span-2">
                        <label className="block text-gray-700">Über mich:</label>
                        {isEditing ? (
                          <textarea
                            name="bio"
                            value={userData.bio}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded"
                            rows="4"
                          ></textarea>
                        ) : (
                          <p className="text-gray-800">{userData.bio}</p>
                        )}
                      </div>
                    </div>
                    {/* Save and Cancel Buttons for mobile view */}
                    {isEditing && (
                      <div className="mt-6 md:hidden flex justify-end">
                        <button
                          type="submit"
                          className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600 transition duration-300"
                        >
                          Speichern
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
                        >
                          Abbrechen
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterSmall />
    </>
  );
};

export default Profile;
