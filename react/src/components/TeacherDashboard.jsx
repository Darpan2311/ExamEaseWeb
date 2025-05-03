import React from "react";
import WelcomeBanner from "./WelcomeBanner"; // You can reuse or make a teacher-specific one
import CreatedExamsSection from "./CreatedExamsSection"; // New component
import TeacherActivity from "./TeacherActivity"; // Reused
import "../css/TeacherDashboard.css"; // Create and style this CSS

export default function TDashboard() {
  return (
    <div className="teacher-dashboard">
      <WelcomeBanner />
      <div className="dashboard-sections">
        <CreatedExamsSection />
        <TeacherActivity />
      </div>
    </div>
  );
}
