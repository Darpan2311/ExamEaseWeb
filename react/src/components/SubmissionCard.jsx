import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { CheckCircle, Clock, Trophy } from "lucide-react";
import "../css/studentcard.css"; // Make sure the styling is appropriate for this new component

export function SubmissionCard({ id, examName, submittedAt, totalQuestions }) {
  const navigate = useNavigate(); // ✅ Initialize navigation

  const handleViewResult = () => {
    navigate(`/result/${id}`); // ✅ Navigate to ExamResult with submission ID
  };

  return (
    <div className="subject-card" onClick={handleViewResult} style={{ cursor: "pointer" }}>
      <div className="subject-card-header">
        <h3 className="subject-card-title">
          <Trophy size={20} />
          {examName}
        </h3>
      </div>
      <div className="subject-card-content">
        <div className="subject-card-info">
          <div className="info-item">
            <Clock size={20} color="#22C55E" />
            <span className="info-text">Submitted At: {new Date(submittedAt).toLocaleString()}</span>
          </div>
          <div className="info-item">
            <CheckCircle size={20} color="#3B82F6" />
            <span className="info-text">Questions: {totalQuestions}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
