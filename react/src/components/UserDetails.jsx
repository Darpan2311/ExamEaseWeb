import { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";

function UserName() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    axiosInstance.get("/api/user/me")
        .then(response => setUsername(response.data))
        .catch(error => {
          console.error("Error fetching username:", error);
          setUsername("Guest");
        });
  }, []);

  return <span>{username || "Loading..."}</span>;
}

export default UserName;
