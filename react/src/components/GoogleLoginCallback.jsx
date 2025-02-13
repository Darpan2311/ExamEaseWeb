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
                    const { token } = response.data;

                    // Save the token to local storage
                    localStorage.setItem("jwtToken", token);

                    // Validate the token by accessing a protected endpoint
                    const protectedResponse = await axiosInstance.get("/user/home");
                    if (protectedResponse.status === 200) {
                        navigate("/home"); // Navigate to home page
                    } else {
                        setErrorMessage("Failed to validate token.");
                    }
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

    return <div>{errorMessage ? <p>{errorMessage}</p> : <p>Logging you in...</p>}</div>;
};

export default GoogleLoginCallback;
