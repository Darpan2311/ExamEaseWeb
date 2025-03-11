import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosConfig";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Title, Legend } from "chart.js";
import "../css/ExamResults.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Title, Legend);

const ExamResults = () => {
  const { submissionId } = useParams();
  const [examResult, setExamResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExamResult = async () => {
      try {
        const response = await axiosInstance.get(`/api/exams/${submissionId}/result`);
        setExamResult(response.data);
 
      } catch (err) {
        setError(err.response?.data || "Failed to fetch exam results");
      } finally {
        setLoading(false);
      }
    };

    fetchExamResult();
  }, [submissionId]);
       console.log(examResult);
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;
 
  const totalQuestions = examResult.correctAnswers + examResult.incorrectAnswers + examResult.unattemptedQuestion;
  const totalMarks = totalQuestions * 4;
  const passingMarks = (totalMarks * 0.3).toFixed(2); // Rounded to 2 decimal places
  const isPassed = examResult.totalScore >= passingMarks;

  const chartData = {
    labels: ["You", "Student B", "Student C", "Student D"],
    datasets: [
      {
        label: "Scores",
        data: [examResult.totalScore, 32, 45, 28], 
        backgroundColor: ["#4CAF50", "#FF6384", "#36A2EB", "#FFCE56"],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="exam-results-container">
      <header className="exam-header">
        <h1>Exam Results</h1>
        <div className="exam-info">
          <p><b>Duration:</b> 3 hr</p>
          <p><b>Total Marks:</b> {totalMarks}</p>
          <p><b>Passing Marks:</b> {passingMarks} (30%)</p>
          <p><b>Marking Scheme:</b> +4/-1</p>
          <p><b>Total Questions:</b> {totalQuestions}</p>
        </div>
      </header>

      <section className="exam-summary">
        <div className="stat-box">
          <p>Your Score</p>
          <h3>{examResult.totalScore}</h3>
        </div>
        
        <div className="stat-box">
          <p>Correct Answers</p>
          <h3>{examResult.correctAnswers}</h3>
        </div>
        <div className="stat-box">
          <p>Incorrect Answers</p>
          <h3>{examResult.incorrectAnswers}</h3>

        </div>
        <div className="stat-box">
          <p>Unattempted</p>
          <h3>{examResult.unattemptedQuestion}</h3>
        </div>
        <div className="stat-box">
          <p>Total Time Spent</p>
          <h3>{examResult.totalTimeSpent} sec</h3>
        </div>
        <div className={`stat-box ${isPassed ? "pass" : "fail"}`}>
          <p>Status</p>
          <h3>{isPassed ? "Passed 🎉" : "Failed ❌"}</h3>
        </div>
      </section>

      <section className="chart-container">
        <h3>Student Score Comparison</h3>
         <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
      </section>
    </div>
  );
};

export default ExamResults;
