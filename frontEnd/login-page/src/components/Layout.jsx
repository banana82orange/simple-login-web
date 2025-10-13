import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import ThemeSwitch from "./ThemeSwitch";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout() {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);


  return (
      <div
      style={{
        backgroundColor: theme === "light" ? "#f8f9fa" : "#121212",
        color: theme === "light" ? "#000" : "#fff",
        minHeight: "100vh",
        transition: "all 0.3s ease",
      }}
    >

      <Navbar></Navbar>

      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>

      <Footer>

      </Footer>
    </div>
  );
}
