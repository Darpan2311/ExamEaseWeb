import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../css/Home.css";

const HomePage = () => {
    const [dynamicText, setDynamicText] = useState("");
    const text = "Learning Made Easy";
    let index = 0;
    let isErasing = false;

    useEffect(() => {
        const textElement = document.getElementById("dynamic-text");
        const typeEffect = () => {
            if (!isErasing) {
                setDynamicText(text.slice(0, index++));
                if (index > text.length) {
                    isErasing = true;
                    setTimeout(typeEffect, 1000);
                } else {
                    setTimeout(typeEffect, 150);
                }
            } else {
                setDynamicText(text.slice(0, index--));
                if (index <= 0) {
                    isErasing = false;
                    setTimeout(typeEffect, 500);
                } else {
                    setTimeout(typeEffect, 100);
                }
            }
        };
        typeEffect();
    }, []);

    useEffect(() => {
        const navbar = document.getElementById("navbar");
        const handleScroll = () => {
            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div>
            <nav className="navbar" id="navbar">
                <div className="logo">ExamEase</div>
                <ul>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/features">Features</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
                    <li><NavLink to="/register" className="register-btn">Register</NavLink></li>
                </ul>
            </nav>

            <section className="hero">
                <div className="container">
                    <div className="text-content">
                        <h1 id="dynamic-text">{dynamicText}</h1>
                        <p>Practice with real-time quizzes, track your progress, and ace your exams.</p>
                        <div className="cta-buttons">
                            <button className="google-btn">Log in with Google</button>
                            <button className="options-btn">See more options</button>
                        </div>
                    </div>
                    <div className="image-content">
                        <img src="/assets/hero-img.png" alt="Hero" />
                    </div>
                </div>
            </section>

            <section id="features" className="features">
                <div className="container">
                    <h2>Our Features</h2>
                    <div className="feature-list">
                        <div className="feature-item">
                            <h3>Mock Tests</h3>
                            <p>Practice with a variety of mock exams designed to help you succeed.</p>
                        </div>
                        <div className="feature-item">
                            <h3>Progress Tracking</h3>
                            <p>Monitor your performance and identify areas of improvement.</p>
                        </div>
                        <div className="feature-item">
                            <h3>Leaderboards</h3>
                            <p>Compete with peers and see where you rank in real time.</p>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="container">
                    <p>© 2024 ExamEase. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
