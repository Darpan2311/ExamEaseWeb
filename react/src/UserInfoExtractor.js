import { jwtDecode } from "jwt-decode"; // ✅ Named import


export const getUserFromToken = () => {
  const token = localStorage.getItem("jwtToken"); // Retrieve token
  if (!token) return null;
    
  try {
    return jwtDecode(token); // Decode JWT to get user details
  } catch (error) {
    console.error("Invalid Token:", error);
    return null;
  }
};
