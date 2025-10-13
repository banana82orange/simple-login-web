import React from "react";

export default function InputField({ label, type, value, onChange }) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required
        style={{ width: "100%", padding: "8px", marginTop: "5px" }}
      />
    </div>
  );
}
