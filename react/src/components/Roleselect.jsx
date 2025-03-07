import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosConfig";
import "../css/RegisterPage.css";

const Roleselect = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        code: "",
        role: [],
    });

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const code = queryParams.get("code");
        if (code) {
            setFormData((prev) => ({ ...prev, code }));
        }
    }, []);

    const handleRoleChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            role: checked
                ? [...prevFormData.role, value]
                : prevFormData.role.filter((r) => r !== value),
        }));
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const payload = { 
            ...formData, 
            roles: formData.role.join(",")  // Convert array to comma-separated string
        };
    
        try {
            const response = await axiosInstance.post("/api/auth/google/callback", payload);
            console.log("Success:", response.data);
            const { token } = response.data;
            localStorage.setItem("jwtToken", token);
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
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
        }
    };
    
    

    return (
        <div className="register">
            <div className="register-container">
                <h2 id="user-profile-info">User Profile Information</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="role-group">
                        <label>Select Role</label>
                        <div className="checkbox-group">
                            <label>
                                <input
                                    type="checkbox"
                                    name="role"
                                    value="USER"
                                    onChange={handleRoleChange}
                                    checked={formData.role.includes("USER")}
                                />{" "}
                                USER
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="role"
                                    value="TEACHER"
                                    onChange={handleRoleChange}
                                    checked={formData.role.includes("TEACHER")}
                                />{" "}
                                TEACHER
                            </label>
                        </div>
                    </div>

                    <button type="submit">Continue</button>
                </form>
            </div>
        </div>
    );
};

export default Roleselect;
