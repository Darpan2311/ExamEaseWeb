import React, { useState } from 'react';
import '../css/LoginPage.css';
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosConfig";
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

     const navigate = useNavigate();
     const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage(""); // Clear previous errors
    
        try {
            const response = await axiosInstance.post("/api/auth/login", {
                email,
                password,
            });
    
            if (response.status === 200) {
                const token = response.data;
    
                if (token) {
                    localStorage.setItem("jwtToken", token);
                    console.log("Login successful, token saved");
    
                    // Validate the token by accessing a protected endpoint
                    try {
                        const protectedResponse = await axiosInstance.get("/user/home");
                        if (protectedResponse.status === 200) {
                            navigate("/home");
                        } else {
                            setErrorMessage("Failed to validate token.");
                        }
                    } catch (protectedError) {
                        console.error("Token validation failed:", protectedError);
                        setErrorMessage("Token validation failed. Please log in again.");
                    }
                } else {
                    setErrorMessage("Failed to retrieve token.");
                }
            } else {
                setErrorMessage("Unexpected response from server.");
            }
        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage("Invalid credentials. Please try again.");
        }
    };
    
    const handleGoogleLogin = () => {
        const googleOAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=435399769597-9imjl67qptanmrq6deach9ocicpmfrq3.apps.googleusercontent.com&redirect_uri=http://localhost:5173/api/auth/login/callback&response_type=code&scope=openid%20profile%20email`;
        window.location.href = googleOAuthUrl;
    };
    
    

    return (
        <div className='login'>
        <div className="login-container">
            <h1>Log In</h1>
            <form id="login-form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        id="show-password"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <a href="#" className="forgot-password">Forgot Password?</a>
                <button type="submit" className="btn-login">Log in</button>
                <div className="separator">
                    <span>or</span>
                </div>
                <div >
                    <button type="button" className="social-login" onClick={handleGoogleLogin}>Google</button>
                </div>
                <p className="create-account">New to ExamEase? <a href="/register">Create an account</a></p>
            </form>
        </div>
        </div>
    );
};

export default LoginPage;