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
  const [scoreDistribution, setScoreDistribution] = useState(null);
  const [currentScoreRange, setCurrentScoreRange] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExamResult = async () => {
      try {
        const response = await axiosInstance.get(`/api/exams/${submissionId}/result`);
        setExamResult(response.data);
  
        // Ensure totalQuestions is properly calculated
        const totalQuestions =
          response.data.correctAnswers +
          response.data.incorrectAnswers +
          response.data.unattemptedQuestion;
  
        if (totalQuestions > 0) {
          const totalMarks = totalQuestions * 4;
          const scorePercentage = Math.round((response.data.totalScore / totalMarks) * 100);
          const index = Math.min(Math.floor(scorePercentage / 10), 9);
          const range = `${index * 10}-${(index + 1) * 10}%`;
          setCurrentScoreRange(range);
        } else {
          setCurrentScoreRange("0-10%"); // Default fallback for edge cases
        }
      } catch (err) {
        setError(err.response?.data || "Failed to fetch exam results");
      }
    };
  
    const fetchScoreDistribution = async () => {
      try {
        const response = await axiosInstance.get(`/api/exams/${submissionId}/score-distribution`);
        setScoreDistribution(response.data);
      } catch (err) {
        setError(err.response?.data || "Failed to fetch score distribution");
      } finally {
        setLoading(false);
      }
    };
  
    fetchExamResult();
    fetchScoreDistribution();
  }, [submissionId]);
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  const totalQuestions = examResult.correctAnswers + examResult.incorrectAnswers + examResult.unattemptedQuestion;
  const totalMarks = totalQuestions * 4;
  const passingMarks = (totalMarks * 0.3).toFixed(2);
  const isPassed = examResult.totalScore >= passingMarks;

  const labels = scoreDistribution ? Object.keys(scoreDistribution) : [];
  const dataValues = scoreDistribution ? Object.values(scoreDistribution) : [];

  // Highlight the current submission's range
  const backgroundColors = labels.map(label => 
    label === currentScoreRange ? "#FF5733" : "#36A2EB"
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Number of Submissions",
        data: dataValues,
        backgroundColor: backgroundColors,
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  console.log("Chart Labels:", chartData.labels);
  console.log("Chart Data:", chartData.datasets[0].data);

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
        <h3>Score Distribution</h3>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            scales: {
              x: { title: { display: true, text: "Score Ranges (%)" } },
              y: { title: { display: true, text: "Number of Submissions" }, beginAtZero: true, ticks: { stepSize: 1 } }
            },
            plugins: { legend: { display: false } }
          }}
        />
        {currentScoreRange && <p><strong>Your Score Range:</strong> {currentScoreRange}</p>}
      </section>
    </div>
  );
};

export default ExamResults;
