import React, { useState } from "react";
import "../css/ExamResults.css";

const ExamResults = () => {
  const [examDetails] = useState({
    examTitle: "Gate Exam",
    course: "CSE",
    date: "28 Feb 2023 9:00 AM - 11:00 AM",
    duration: "3 hr",
    totalMarks: 50,
    passMarks: 40,
  });

  const [summaryStats] = useState({
    totalStudents: 400,
    averageScore: 100,
    absentStudents: 12,
    finishedStudents: 365,
    passedStudents: 365,
    failedStudents: 35,
  });

  const [attendedStudents] = useState([
    {
      name: "Abc",
      status: "Passed",
      score: "45/50 (85%)",
      grade: "Excellent",
      timeSpent: "22 MIN",
      submitted: "28 Feb 2023, 10:50 AM",
    },
    {
      name: "xyz",
      status: "Passed",
      score: "35/50 (68%)",
      grade: "Average",
      timeSpent: "22 MIN",
      submitted: "28 Feb 2023, 9:40 AM",
    },
    {
      name: "pqr",
      status: "Failed",
      score: "15/50 (28%)",
      grade: "Poor",
      timeSpent: "22 MIN",
      submitted: "28 Feb 2023, 9:30 AM",
    },
  
  ]); 


  return (
    <div className="exam-results-container" id="exam-res-caonteiner">
      <header className="exam-header">
        <h1>Exam Results</h1>
        <div className="exam-info">
          <h2>{examDetails.examTitle}</h2>
          <p>{examDetails.course}</p>
          <p>{examDetails.date}</p>
          <p>
            <b>Duration:</b> {examDetails.duration} | <b>Total Marks:</b>{" "}
            {examDetails.totalMarks} (Pass marks: {examDetails.passMarks})
          </p>
        </div>
      </header>

      {/* <section className="exam-summary">
        <div className="stat-box">
          <p>Total Students</p>
          <h3>{summaryStats.totalStudents}</h3>
        </div>
        <div className="stat-box">
          <p>Average Score</p>
          <h3>{summaryStats.averageScore}</h3>
        </div>
        <div className="stat-box">
          <p>Absent Students</p>
          <h3>{summaryStats.absentStudents}</h3>
        </div>
        <div className="stat-box">
          <p>Finished Students</p>
          <h3>{summaryStats.finishedStudents}</h3>
        </div>
        <div className="stat-box">
          <p>Passed Students</p>
          <h3>{summaryStats.passedStudents}</h3>
        </div>
        <div className="stat-box">
          <p>Failed Students</p>
          <h3>{summaryStats.failedStudents}</h3>
        </div>
      </section> */}

      <section className="publish-options">
      

      
      </section>

      <section className="student-list">
        <h3>Attended ({attendedStudents.length})</h3>
        <table className="students-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Passed/Failed</th>
              <th>Score</th>
              <th>Grade</th>
              <th>Time Spent</th>
              <th>Submitted</th>
            </tr>
          </thead>
          <tbody>
            {attendedStudents.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td
                  className={
                    student.status === "Passed" ? "status-passed" : "status-failed"
                  }
                >
                  {student.status}
                </td>
                <td>{student.score}</td>
                <td>{student.grade}</td>
                <td>{student.timeSpent}</td>
                <td>{student.submitted}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default ExamResults;