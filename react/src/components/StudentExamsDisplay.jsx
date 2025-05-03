
import React, { useEffect, useState } from "react";
import { ExamCard } from "../components/ExamCard";
import axiosInstance from "../axiosConfig";
import '../css/Studentdashboard.css'
import { useOutletContext } from "react-router-dom";
function StudentExamsDisplay() {
   


    const { searchQuery } = useOutletContext();  // ✅ Use the context provided

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
      const filteredExams = exams.filter((exam) =>
        exam.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
  return (
    <div>
      <div className="student">
          <div className="home-content">
            {loading && <p>Loading exams...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && (
              <div className="subject-grid">
                {filteredExams.length > 0 ? (
                filteredExams.map((exam, index) => (
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
                  <p>No exams found for "{searchQuery}".</p>
              )}
            </div>
            )}
          </div>
        </div>
    </div>
  )
}

export default StudentExamsDisplay
