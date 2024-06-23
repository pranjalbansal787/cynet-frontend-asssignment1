import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Importing the js-cookie library for handling cookies

const Logout = () => {
  const navigate = useNavigate(); // Hook from react-router-dom for navigation

  // Function to handle logout process
  const handleLogout = () => {
    Cookies.remove('session'); // Removing the 'session' cookie
    navigate('/'); // Redirecting to the home page after logout
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button> {/* Logout button with click event */}
    </div>
  );
};

export default Logout;
