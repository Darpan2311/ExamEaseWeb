import React from "react"
import { Book, CheckCircle, Trophy } from "lucide-react"
import '../css/studentcard.css';

export function SubjectCard({ subject, availableExams, competitiveExams, examsTaken }) {
  return (
    <div className="subject-card">
      <div className="subject-card-header">
        <h3 className="subject-card-title">
          <Book size={20} />
          {subject}
        </h3>
      </div>
      <div className="subject-card-content">
        <div className="subject-card-info">
          <div className="info-item">
            <Trophy size={20} color="#EAB308" />
            <span className="info-text">{availableExams} Exams Available</span>
          </div>
          <div className="info-item">
            <CheckCircle size={20} color="#22C55E" />
            <span className="info-text">{examsTaken} Exams Taken</span>
          </div>
        </div>
      </div>
      <div className="subject-card-footer">
        <div className="exam-tags">
          {competitiveExams.map((exam, index) => (
            <span key={index} className="exam-tag">
              {exam}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

