import React from 'react'

export default function Button({ label, onClick, color = "#007bff" }) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: color,
        color: "white",
        border: "none",
        padding: "10px",
        borderRadius: "5px",
        width: "100%",
        cursor: "pointer",
        marginTop: "10px",
      }}
    >
      {label}
    </button>
  );
}
