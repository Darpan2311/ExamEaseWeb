import React from 'react';
import "../css/sidenav.css";

const Sidenav = () => {
  const menuItems = [
    { name: "Dashboard", emoji: "📊" },
    { name: "Notes", emoji: "📝" },
    { name: "Profile", emoji: "👤" },
    { name: "Reports", emoji: "📑" },
    { name: "Log Out", emoji: "🚪" }
  ];

  return (
    <div className="sidebar-header">
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button key={item.name} className="sidebar-nav-item">
            {item.emoji} {item.name}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidenav;
