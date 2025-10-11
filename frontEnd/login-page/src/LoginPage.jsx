import React, { useState } from 'react';

function LoginPage() {
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

    // Basic Validation/Authentication (for demonstration)
    if (username === 'user' && password === 'pass') {
      alert('Login Successful!');
      // In a real application, you would typically:
      // 1. Store a token (e.g., in localStorage)
      // 2. Redirect the user to a dashboard page
    } else {
      setError('Invalid username or password.');
    }
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
      </form>
    </div>
  );
}

export default LoginPage;