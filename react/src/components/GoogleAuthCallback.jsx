import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosConfig";

const GoogleAuthCallback = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const code = queryParams.get("code");
        
        const authenticateWithGoogle = async () => {
            try {
                const response = await axiosInstance.post(`/api/auth/google/callback`, {
                    code,
                });
                if (response.status === 200 && response.data.token) {
                    const { token } = response.data;

                    localStorage.setItem("jwtToken", token);

                    const protectedResponse = await axiosInstance.get("/user/home");
                    if (protectedResponse.status === 200) {
                        navigate("/roleselect");
                    } else {
                        setErrorMessage("Failed to validate token.");
                    }
                } else {
                    setErrorMessage("Authentication failed. Try again.");
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 409) {
                        alert(error.response.data.message); // Display message from backend
                        navigate("/login"); // Redirect to login page
                    } else {
                        setErrorMessage(error.response.data || "Authentication failed. Please try again.");
                    }
                } else {
                    setErrorMessage("Network error. Please check your connection.");
                }
            }
        };

        authenticateWithGoogle();
    }, [navigate]);

    return <div>{errorMessage ? <p>{errorMessage}</p> : <p>Loading...</p>}</div>;
};

export default GoogleAuthCallback;