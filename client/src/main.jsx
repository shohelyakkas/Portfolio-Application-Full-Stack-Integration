
/*
  File: main.jsx
  Student: Shohely Akkas
  Student ID: 301257632
  Date: Sept 24, 2025
  Description: This file contains the main entry point for the portfolio site.
*/

/* ===== IMPORTS ===== */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

/* ===== APPLICATION INITIALIZATION ===== */
/* Render the main App component to the DOM */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
