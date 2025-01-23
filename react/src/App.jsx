import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import LoginPage from './components/LoginPage'
import HomePage  from './components/HomePage'
import RegisterPage from './components/RegisterPage'
import GoogleAuthCallback from './components/GoogleAuthCallback';

function App() {
  

  return (
   
    <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<HomePage/>} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path='api/auth/callback' element={<GoogleAuthCallback/>}/>
    </Routes>
  </Router>
      
   
  )
}

export default App
