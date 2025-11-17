import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        backgroundColor: theme === "light" ? "#333" : "#eee",
        color: theme === "light" ? "#fff" : "#000",
        border: "none",
        padding: "8px 12px",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
