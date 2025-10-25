
/*
  File: App.jsx
  Student: Shohely Akkas
  Student ID: 301257632
  Date: Sept 24, 2025
  Description: This file contains the main application component that sets up the Router for the portfolio site.
*/

/* ===== IMPORTS ===== */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRouter from '../MainRouter';

/* ===== MAIN APP COMPONENT ===== */
const App = () => {
  /* ----- Component JSX Structure ----- */
  return (
    <Router>
      {/* Main Router Component */}
      <MainRouter />
    </Router>
  );
};

export default App;
