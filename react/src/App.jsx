import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import LoginPage from './components/LoginPage'

import RegisterPage from './components/RegisterPage'
import GoogleAuthCallback from './components/GoogleAuthCallback';
import GoogleLoginCallback from './components/GoogleLoginCallback';
import ExamInterface from './components/exam-interface';
import TestBuilder from './components/TestBuilder';
import ExamResults from './components/ExamResult';
import StudentHome from './components/Studentdashboard';
import Home from './components/home';
import Roleselect from './components/Roleselect';

function App() {
  

  return (
   
    <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path='/api/auth/callback' element={<GoogleAuthCallback/>}/>
      <Route path="/api/auth/login/callback" element={<GoogleLoginCallback/>}/>
      <Route path="/exam/:examId" element={<ExamInterface />} />
      <Route path="/exam/create" element={<TestBuilder/>}/>
      <Route path="/exam/result" element={<ExamResults/>}/>
      <Route path='/student' element={<StudentHome/>}/>
      <Route path='/api/auth/roleselect' element={<Roleselect/>}/>
      <Route path='/' element={<Home/>}/>
    </Routes>
  </Router>
      
   
  )
}

export default App
