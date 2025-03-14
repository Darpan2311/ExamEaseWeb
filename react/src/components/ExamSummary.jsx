import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosConfig";
import "../css/ExamSummary.css";

const ExamSummary = () => {
  const { submissionId } = useParams();
  const [summaryData, setSummaryData] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axiosInstance.get(`/api/exam-summary/${submissionId}`);
        setSummaryData(response.data);
      } catch (error) {
        console.error("Error fetching summary:", error.response?.data || error.message);
      }
    };
    fetchSummary();
  }, [submissionId]);

  if (!summaryData) return <p id="loading-summary">Loading summary...</p>;

  return (
    <div id="summary-container">
      <h2 id="summary-title">Exam Summary</h2>
      <p id="score">
        Score: <span id="obtained-marks">{summaryData.obtainedMarks}</span> / <span id="total-marks">{summaryData.totalMarks}</span>
      </p>
      <div id="questions-list">
        {summaryData.questions.map((q, index) => (
          <div key={index} id="question-card-id" className="question-card">
            <p id={`question-text-${index}`}><strong>Q{index + 1}:</strong> {q.questionText}</p>
            <p id={`user-response-${index}`}><strong>Your Answer:</strong> {q.userResponse || "Not Answered"}</p>
            <p id={`correct-response-${index}`}><strong>Correct Answer:</strong> {q.correctResponse}</p>
            <p id={`answer-status-${index}`} className={q.isCorrect ? "correct" : "incorrect"}>
              {q.isCorrect ? "✔ Correct" : "✘ Incorrect"}
            </p>
            <p id={`marks-awarded-${index}`}><strong>Marks:</strong> {q.marksAwarded}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamSummary;
