import React from "react";
// import WelcomeBanner from "./WelcomeBanner"; // You can reuse or make a teacher-specific one
// import "../css/TearcherDashboard.css"; // Create and style this CSS

export default function TeacherDashboard() {
  return (
    <div className="teacher-dashboard">
      <WelcomeBanner />
      <div className="dashboard-sections">
        {/* <CreatedExamsSection /> */}
        {/* <RecentResultsSection /> */}
        {/* <LineChartActivity /> */}
      </div>
    </div>
  );
}
