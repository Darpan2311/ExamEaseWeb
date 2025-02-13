import React from "react";
import { SubjectCard } from "../components/SubjectCard";
import '../css/studentdashboard.css';
import Sidenav from "./sidenav";
import Header from "./header";
export default function StudentHome() {
  const subjects = [
    { subject: "Mathematics", availableExams: 10, competitiveExams: ["JEE", "SAT", "GMAT"], examsTaken: 3 },
    { subject: "Physics", availableExams: 8, competitiveExams: ["JEE", "NEET", "KVPY"], examsTaken: 2 },
    { subject: "Computer Science", availableExams: 12, competitiveExams: ["GATE", "ICPC", "Google Kickstart"], examsTaken: 5 },
    { subject: "Mathematics", availableExams: 10, competitiveExams: ["JEE", "SAT", "GMAT"], examsTaken: 3 },
    { subject: "Physics", availableExams: 8, competitiveExams: ["JEE", "NEET", "KVPY"], examsTaken: 2 },
    { subject: "Computer Science", availableExams: 12, competitiveExams: ["GATE", "ICPC", "Google Kickstart"], examsTaken: 5 },
    { subject: "Mathematics", availableExams: 10, competitiveExams: ["JEE", "SAT", "GMAT"], examsTaken: 3 },
    { subject: "Physics", availableExams: 8, competitiveExams: ["JEE", "NEET", "KVPY"], examsTaken: 2 },
    { subject: "Computer Science", availableExams: 12, competitiveExams: ["GATE", "ICPC", "Google Kickstart"], examsTaken: 5 },
    { subject: "Mathematics", availableExams: 10, competitiveExams: ["JEE", "SAT", "GMAT"], examsTaken: 3 },
    { subject: "Physics", availableExams: 8, competitiveExams: ["JEE", "NEET", "KVPY"], examsTaken: 2 },
    { subject: "Computer Science", availableExams: 12, competitiveExams: ["GATE", "ICPC", "Google Kickstart"], examsTaken: 5 },
  ];

  return (
    <div className="container">
      <Header/>
       <div className="home-container">

<aside className="home-sidebar">
  <Sidenav />
</aside>
<div className="home-content">
  <div className="subject-grid">
    {subjects.map((subject, index) => (
      <SubjectCard key={index} {...subject} />
    ))}
  </div>
</div>
</div>
    </div>
   
  );
}
