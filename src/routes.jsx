// src/routes.jsx

// Import necessary modules from React and react-router-dom
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import components from local files
import Cookies from 'js-cookie';
import Dashboard from './components/Dashboard';
import ItemList from './components/ItemList';
import ItemDetails from './components/ItemDetails';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Logout from './components/Logout';

// Define the main component for handling application routes
const AppRoutes = () => {
  // State to manage logged-in status using cookies
  const [loggedIn, setLoggedIn] = useState(!!Cookies.get('session'));

  // Function to handle login action
  const handleLogin = () => {
    Cookies.set('session', 'active'); // Set a cookie named 'session' with value 'active'
    setLoggedIn(true); // Update state to indicate user is logged in
  };

  // Function to handle logout action
  const handleLogout = () => {
    Cookies.remove('session'); // Remove the 'session' cookie
    setLoggedIn(false); // Update state to indicate user is logged out
  };

  // JSX structure for rendering routes and components
  return (
    <Router>
      {/* Navbar component with props for logged-in status and logout handler */}
      <Navbar loggedIn={loggedIn} handleLogout={handleLogout} />

      <Routes>
        {/* Route for displaying the Dashboard component */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Route for displaying the ItemList component */}
        <Route path="/list" element={<ItemList />} />

        {/* Route for displaying the ItemDetails component (nested under /list) */}
        <Route path="/list/details" element={<ItemDetails />} />

        {/* Default route (landing page) showing the Login component */}
        <Route path="/" element={<Login handleLogin={handleLogin} />} />

        {/* Route for handling logout (not necessarily needed if handled in Navbar) */}
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
};

// Export the main AppRoutes component as the default export
export default AppRoutes;
