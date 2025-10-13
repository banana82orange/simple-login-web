import React from 'react'
import { useTheme } from "../context/ThemeContext";

export default function Footer() {
    const { theme } = useTheme();

  return (
        <div
        style={{
          textAlign: "center",
          padding: "10px",
          borderTop: `1px solid ${theme === "light" ? "#ccc" : "#444"}`,
        }}
      >
        © {new Date().getFullYear()} MyApp
      </div>
  )
}
