import React from "react";
import UserName from "./UserDetails";
export default function WelcomeBanner() {
  
  return (
    <div className="welcome-banner">
      <h2>Welcome,<UserName/> 👋</h2>
    </div>
  );
}
