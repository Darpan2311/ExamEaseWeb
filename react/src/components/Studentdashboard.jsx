import React, { useEffect, useState } from "react";
import { ExamCard } from "../components/ExamCard";
import axiosInstance from "../axiosConfig"; // Import axios instance
import "../css/studentdashboard.css";
import Sidenav from "./Sidenav";
import Header from "./header";

export default function StudentHome() {
  const [exams, setExams] = useState([]); // Ensure exams is an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axiosInstance.get("/api/exams/get");
  
        console.log("API Response:", response.data); // ✅ Debug log
  
        setExams(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching exams:", error.response?.data || error.message);
        setError("Failed to load exams.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchExams();
  }, []);
  

  return (
    <div className="container">
      <Header />
      <div className="home-container">
        <aside className="home-sidebar">
          <Sidenav />
        </aside>
        <div className="student">
          <div className="home-content">
            {loading && <p>Loading exams...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && (
            <div className="subject-grid">
              {exams.length > 0 ? (
                exams.map((exam, index) => (
                  <ExamCard
                    key={index}
                    name={exam.name}
                    id={exam.id} 
                    author={exam.author}
                    subjects={exam.subjects || []}
                    difficulty={exam.difficultyLevel}
                    totalquestions={exam.questions?.length || 0}
                  />
                ))
              ) : (
                <p>No exams available.</p>
              )}
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}