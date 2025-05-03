import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import { SubmissionCard } from "../components/SubmissionCard"; // Import the new card
import "../css/Studentdashboard.css";

export default function StudentReports() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axiosInstance.get("/api/exams/submissions/my");
        setSubmissions(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("Error fetching submissions:", err);
        setError("Failed to load reports.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const handleCardClick = (submissionId) => {
    navigate(`/result/${submissionId}`);
  };

  return (
    <div className="student">
      <div className="home-content">
        {loading && <p>Loading reports...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && (
          <div className="subject-grid">
            {submissions.length > 0 ? (
              submissions.map((submission, index) => (
                <div key={index} onClick={() => handleCardClick(submission.id)}>
                  <SubmissionCard
                    examName={submission.examName}
                    id={submission.id}
                    submittedAt={submission.submittedAt}
                    totalQuestions={submission.totalQuestions}
                  />
                </div>
              ))
            ) : (
              <p>No submissions found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
