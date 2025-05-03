import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosConfig";

const GoogleLoginCallback = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const code = queryParams.get("code");

        const loginWithGoogle = async () => {
            try {
                const response = await axiosInstance.post(`/api/auth/google/login`, { code });

                if (response.status === 200 && response.data.token) {
                    const { token, roles } = response.data;

                if (token) {
                    localStorage.setItem("jwtToken", token);
                    console.log("Login successful, token saved");
                    console.log("User roles:", roles);
                    if (roles.includes("ROLE_TEACHER")) {
                        navigate("/teacher");
                    } else if (roles.includes("ROLE_USER") ) {
                        navigate("/student");
                    } else {
                        navigate("/"); // fallback
                    }
                } else {
                    setErrorMessage("Failed to retrieve token.");
                } // Navigate to home page
                } else {
                    setErrorMessage("Authentication failed. Try again.");
                }
            } catch (error) {
                console.error("Google login error:", error);
                setErrorMessage("Authentication failed. Please try again.");
            }
        };

        loginWithGoogle();
    }, [navigate]);

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <p>{errorMessage || "Logging you in..."}</p>
        </div>
    );
};

export default GoogleLoginCallback;