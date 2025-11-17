import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  // 1. State for input fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // 2. State for login error message
  const [error, setError] = useState('');

  // 3. Handle form submission
  const handleSubmit = (event) => {
    // Prevent the default form submission (which causes a page reload)
    event.preventDefault();
    setError(''); // Clear any previous errors

    const reduceData = {
        "email": username,
        "password": password
    }
      console.log(reduceData);
       fetch('http://localhost:9000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify(reduceData),
        body: JSON.stringify({
                email: username,
                password: password
              }),
      })
      .then(async (response) => {
        const data = await response.json(); // always parse JSON first
        if (!response.ok) {
          // If not OK, throw error using the message from the backend (if exists)
          throw new Error(data.message || `HTTP error! Status: ${response.status}`);
        }
        // alert('Login Successful!');
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.payload.name);

        navigate("/profile");


      })
      .catch((error) => {
        setError('Invalid username or password.');
      });

  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>Login</h2>
      {/* 4. Display error message if it exists */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            // 5. Update state on every keystroke
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            // 5. Update state on every keystroke
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
          />
        </div>

        <button
          type="submit"
          style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}
        >
          Log In
        </button>
        {/* Signup button */}
        <button
          type="button"
          onClick={() => navigate('/signup')}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default LoginPage;