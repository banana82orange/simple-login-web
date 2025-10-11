import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
function SignupPage() {
  const navigate = useNavigate();
  // 1. State for all input fields
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // 2. State for handling errors
  const [errors, setErrors] = useState({});
  // 3. State for success message
  const [success, setSuccess] = useState('');
  // 3.5. State for fail message
  const [fail   , setFail]    = useState('');

  // 4. Handle input changes (one function for all fields)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error for the field being changed
    if (errors[name]) {
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: '',
        }));
    }
  };

  // 5. Basic form validation
  const validate = () => {
    let newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 6) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    // Return true if the newErrors object is empty
    return Object.keys(newErrors).length === 0;
  };

  // 6. Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Stop page reload

    setSuccess(''); // Clear previous success messages
    setFail('')
    if (validate()) {
      // If validation passes
      console.log('Signup Data:', formData);

      const reduceData = {
              "name": formData.username,
              "email": formData.email,
              "password": formData.password
        }

      // In a real application, you would send formData to a backend API:
       fetch('http://localhost:9000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reduceData),
      })
      .then(async (response) => {
        const data = await response.json(); // always parse JSON first
        if (!response.ok) {
          // If not OK, throw error using the message from the backend (if exists)
          throw new Error(data.message || `HTTP error! Status: ${response.status}`);
        }
        setSuccess(data.message || "Signup successful!");
        // Optionally reset the form after successful submission
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        navigate("/");
      })
      .catch((error) => {
        setFail(error.message);
      });

    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '450px', margin: '50px auto', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <h2>Create an Account</h2>

      {/* Success Message */}
      {success && <p style={{ color: 'green', fontWeight: 'bold' }}>{success}</p>}
      {fail && <p style={{ color: 'red', fontWeight: 'bold' }}>{fail}</p>}

      <form onSubmit={handleSubmit}>

        {/* Username Input */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', marginTop: '5px', border: errors.username ? '1px solid red' : '1px solid #ccc', borderRadius: '4px' }}
          />
          {errors.username && <p style={{ color: 'red', fontSize: '12px', margin: '3px 0 0' }}>{errors.username}</p>}
        </div>

        {/* Email Input */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', marginTop: '5px', border: errors.email ? '1px solid red' : '1px solid #ccc', borderRadius: '4px' }}
          />
          {errors.email && <p style={{ color: 'red', fontSize: '12px', margin: '3px 0 0' }}>{errors.email}</p>}
        </div>

        {/* Password Input */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', marginTop: '5px', border: errors.password ? '1px solid red' : '1px solid #ccc', borderRadius: '4px' }}
          />
          {errors.password && <p style={{ color: 'red', fontSize: '12px', margin: '3px 0 0' }}>{errors.password}</p>}
        </div>

        {/* Confirm Password Input */}
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', marginTop: '5px', border: errors.confirmPassword ? '1px solid red' : '1px solid #ccc', borderRadius: '4px' }}
          />
          {errors.confirmPassword && <p style={{ color: 'red', fontSize: '12px', margin: '3px 0 0' }}>{errors.confirmPassword}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={{ width: '100%', padding: '12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupPage;