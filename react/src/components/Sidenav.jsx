import React from 'react';
import "../css/sidenav.css";

const Sidenav = () => {
  return (
    <div className="sidebar-header">
    
      <nav className="sidebar-nav">
        {["Dashboard", "Notes", "Profile", "Reports", "LogOut"].map((item) => (
          <button key={item} className="sidebar-nav-item">
            {item}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidenav;
