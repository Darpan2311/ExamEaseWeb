import React from "react";
import "../css/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">ExamEase</div>
      <ul className="navbar-links">
        <li><a href="#benefits">About</a></li>
        <li><a href="#features">Exams</a></li>
        <li><a href="#faq">Contact Us</a></li>
        <li><a href="#language">Material</a></li>
      </ul>
      <div className="navbar-buttons">
        <button className="btn login">Login</button>
        <button className="btn signup">Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;
