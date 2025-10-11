import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="max-w-md mx-auto mt-10 p-6 rounded-2xl shadow-md bg-white text-gray-800">
      <h2 className="text-2xl font-semibold mb-4 text-center">My Profile</h2>

      <div className="mb-3">
        <strong>Name:</strong> {user.name || "Unknown"}
      </div>
      <div className="mb-3">
        <strong>Email:</strong> {user.email}
      </div>
      <div className="mb-3">
        <strong>Role:</strong> {user.role || "User"}
      </div>

      <button
        onClick={handleLogout}
        className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}
