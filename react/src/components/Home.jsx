import React, { useState, useEffect } from "react";
import "../css/home.css";
import HeroImage from "../assets/std-Photoroom.png";
import ClassMarkerSteps from "../components/ClassMarkerSteps";

const Home = () => {
    const text = "Learning Made Easy";
    const [displayText, setDisplayText] = useState("");
    const [index, setIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let timeout;
        if (!isDeleting && index < text.length) {
            timeout = setTimeout(() => {
                setDisplayText((prev) => prev + text[index]);
                setIndex(index + 1);
            }, 150);
        } else if (isDeleting && index > 0) {
            timeout = setTimeout(() => {
                setDisplayText((prev) => prev.slice(0, -1));
                setIndex(index - 1);
            }, 100);
        } else if (index === text.length && !isDeleting) {
            timeout = setTimeout(() => setIsDeleting(true), 1000);
        } else if (index === 0 && isDeleting) {
            setIsDeleting(false);
        }
        return () => clearTimeout(timeout);
    }, [index, isDeleting, text]);

    return (

        <div>
            <div className="hero-container">
                <nav className="navbar">
                    <div className="logo">ExamEase</div>
                    <div className="nav-links">
                        <a href="#">Exams</a>
                        <a href="#">Benefits</a>
                        <a href="#">About</a>
                        <a href="#">Contact</a>
                    </div>
                    <button className="sign-in" id="loginbtn">Log In</button>
                </nav>
                <div className="hero-content">
                    <div className="hero-text">
                        <h1>{displayText}</h1>
                        <p id="hero-para">
                            ExamEase is an online exam system that delivers exam management,
                            question bank management, automated grading, an analytical dashboard, and more...
                        </p>
                        <div className="btn-try">
                            <button id="try-it">Sign Up</button>
                        </div>
                    </div>
                    <div className="hero-image">
                        <img src={HeroImage} alt="Exam Illustration" />
                    </div>
                </div>


            </div>
            <div id="classmarkersteps">
                <ClassMarkerSteps/>
            </div>
        </div>

    );
};

export default Home;