
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home/HomePage"
import LoginPage from "../pages/Login/LoginPage";
import SignupPage from "../pages/Signup/SignupPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import Layout from "../components/Layout";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
         </Route>
      </Routes>
    </Router>
  );
}
