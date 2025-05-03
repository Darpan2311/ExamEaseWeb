import React from "react";
import WelcomeBanner from "./WelcomeBanner";
import UpcomingExamsSection from "./UpcomingExamsSection";
import RecentSubmissionsSection from "./RecentSubmissionsSection";
import "../css/SDashboard.css";

import LineChartActivity from "./Activity";
export default function SDashboard() {
  return (
    <div className="student-dashboard">
      <WelcomeBanner />
      <div className="dashboard-sections">
        <UpcomingExamsSection />
        <RecentSubmissionsSection />
        <LineChartActivity/>
      </div>
    </div>
  );
}
