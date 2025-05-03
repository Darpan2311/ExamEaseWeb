import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import TeacherHome from './components/TeacherHome';
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import GoogleAuthCallback from './components/GoogleAuthCallback';
import GoogleLoginCallback from './components/GoogleLoginCallback';
import ExamInterface from './components/exam-interface';
import TestBuilder from './components/TestBuilder';
import ExamResults from './components/ExamResult';
import StudentHome from './components/Studentdashboard';
import Home from './components/Home';
import Roleselect from './components/Roleselect';
import ExamSummary from './components/ExamSummary';
import StudentExamsDisplay from './components/StudentExamsDisplay';
import StudentReports from './components/StudentReports';
import SDashboard from './components/Sdashboard';

function App() {

  return (
   
    <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path='/api/auth/callback' element={<GoogleAuthCallback/>}/>
      <Route path="/api/auth/login/callback" element={<GoogleLoginCallback/>}/>
      <Route path="/exam/:examId" element={<ExamInterface />} />
      {/* <Route path="/exam/create" element={<TestBuilder/>}/> */}
      <Route path="/result/:submissionId" element={<ExamResults/>}/>
      <Route path="/student" element={<StudentHome />}>
        <Route path="dashboard" element={<SDashboard />} />
        <Route path="exams" element={<StudentExamsDisplay />} />
        {/* <Route path="profile" element={<StudentProfile />} /> */}
        <Route path="reports" element={<StudentReports />} />
      </Route>
      <Route path="/teacher" element={<TeacherHome />}>
        {/* <Route path="dashboard" element={<TeacherDashboard />} /> */}
        <Route path="exam/create" element={<TestBuilder/>} />
        {/* <Route path="exams" element={<ExamList />} /> */}
        {/* <Route path="reports" element={<ReportPage />} /> */}
      </Route>

      <Route path='/api/auth/roleselect' element={<Roleselect/>}/>
      <Route path="/summary/:submissionId" element={<ExamSummary />} />
      <Route path='/' element={<Home/>}/>
    </Routes>
  </Router>

  )
}

export default App
