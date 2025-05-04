import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../css/Sidenav.css';

const  Sidenav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", emoji: "📊", path: "" },
    { name: "Exams", emoji: "📝", path: "exams" },
    { name: "Profile", emoji: "👤", path: "profile" },
    { name: "Reports", emoji: "📑", path: "reports" },
    { name: "Log Out", emoji: "🚪", path: "/login" },
  ];

  const [activePath, setActivePath] = useState("");

  useEffect(() => {
    // Extract only the last segment for matching "dashboard", "exams", etc.
    const current = location.pathname.split("/").pop();
    setActivePath(current);
  }, [location]);

  const handleNavigation = (path) => {
    if (path === "/login") {
      // Clear any login data here (like token, localStorage, etc.)
      localStorage.clear(); // or sessionStorage.clear()
      
      // Redirect with history replacement
      navigate(path, { replace: true });
    } else {
      navigate(path);
    }
  };
  
  return (
    <div className="sidebar-header">
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => handleNavigation(item.path)}
            className={`sidebar-nav-item ${
              activePath === item.path ? "active" : ""
            }`}
          >
            {item.emoji} {item.name}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidenav;
