import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button.jsx";
export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Load user data from localStorage (for example)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");


    if (!token) {
      // no login token → go back to login page
      navigate("/");
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // fetch user info from server if needed
      fetch("http://localhost:9000/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setUser(data.user))
        .catch((err) => console.error("Failed to load profile:", err));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/"); // back to login
  };

  if (!user) {
    return <div className="p-8 text-center">Loading profile...</div>;
  }

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px" }}>
      <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px" }}>
      <h2>Welcome, {user.name || "User"} 👋</h2>
        <Button label="Logout" color="#dc3545" onClick={handleLogout} />

    </div>
    </div>
  );
}
