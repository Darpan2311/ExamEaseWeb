
import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";
import '../css/Teacherdashboard.css'
import { TeacherCard } from "../components/TeacherCard";
function ExamList() {

    const [exams, setExams] = useState([]); // Ensure exams is an array
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      
      useEffect(() => {
        const fetchExams = async () => {
          try {
            const response = await axiosInstance.get("/api/exams/teacher");
      
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
    <div>
      <div className="teacher">
          <div id="home-content2">
            {loading && <p>Loading exams...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && (
              <div className="subject-grid">
                {exams.length > 0 ? (
                exams.map((exam, index) => (
                  <TeacherCard
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
                  <p>No exams found "</p>
              )}
            </div>
            )}
          </div>
        </div>
    </div>
  );
}

export default ExamList;
