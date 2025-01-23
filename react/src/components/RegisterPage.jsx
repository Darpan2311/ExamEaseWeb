import React, { useState } from 'react';
import axios from 'axios';
import '../css/RegisterPage.css';
import axiosInstance from '../axiosConfig';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        role: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', {
                email: formData.email,
                username: formData.username,
                password: formData.password,
                role: formData.role
            });

            alert(response.data);  // Show registration success or failure
        } catch (error) {
            alert(error);
        }
    };
    const handleGoogleSignIn = async () => {
        try {
            const googleOAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=435399769597-9imjl67qptanmrq6deach9ocicpmfrq3.apps.googleusercontent.com&redirect_uri=http://localhost:5173/api/auth/callback&response_type=code&scope=openid%20profile%20email`;
            window.location.href = googleOAuthUrl;
        } catch (error) {
            console.error("Google sign-in failed:", error);
            alert("Failed to sign in with Google. Please try again.");
        }
    };

    return (
        <div className="register-container">
            <h1>Create Account</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
                <input type="text" name="role" placeholder="Role" onChange={handleChange} required />
                <button type="submit">Sign Up</button>
                <button type="submit" onClick={handleGoogleSignIn}>Google</button>
            </form>
        </div>
    );
};

export default RegisterPage;
