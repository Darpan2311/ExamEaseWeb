import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";
import { SubmissionCard } from "./SubmissionCard";

export default function RecentSubmissionsSection() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    axiosInstance.get("/api/exams/submissions/my").then(res => setSubmissions(res.data));
  }, []);

  return (
    <div className="dashboard-section">
      <h3>Recent Submissions</h3>
      <div className="subject-grid">
        {submissions.length > 0 ? submissions.slice(0, 3).map((s, i) => (
          <SubmissionCard
            key={i}
            examName={s.examName}
            id={s.id}
            submittedAt={s.submittedAt}
            totalQuestions={s.totalQuestions}
          />
        )) : <p>No submissions yet.</p>}
      </div>
    </div>
  );
}
