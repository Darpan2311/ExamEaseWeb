import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";
import { ExamCard } from "./ExamCard";

export default function UpcomingExamsSection() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    axiosInstance.get("/api/exams/get").then(res => setExams(res.data));
  }, []);

  return (
    <div className="dashboard-section">
      <h3>Upcoming Exams</h3>
      <div className="subject-grid">
        {exams.length > 0 ?exams.slice(0, 3).map(exam => (
          <ExamCard key={exam.id} {...exam} />
        )) : <p>No upcoming exams.</p>}
      </div>
    </div>
  );
}
