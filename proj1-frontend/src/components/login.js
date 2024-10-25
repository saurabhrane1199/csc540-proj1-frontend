import React, { useState } from 'react';

function Login({ userType, onGoBack }) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'userId') {
      setUserId(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = () => {
    // Replace with actual authentication logic
    if (userId === 'admin' && password === 'password') {
      setMessage(`Welcome to the ${userType} Landing Page!`);
    } else {
      setMessage('Login Incorrect. Please try again.');
    }
  };

  return (
    <div>
      <h1>{userType} Login</h1>
      <input
        type="text"
        name="userId"
        value={userId}
        onChange={handleInputChange}
        placeholder="User ID"
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={handleInputChange}
        placeholder="Password"
      />
      <button onClick={handleSubmit}>Sign-In</button>
      <button onClick={onGoBack}>Go Back</button>
      <p>{message}</p>
    </div>
  );
}

export default Login;