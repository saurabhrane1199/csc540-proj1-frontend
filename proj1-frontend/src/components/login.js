import React, { useState } from 'react';
import apiUrl from '../env';
import { csrftoken } from './../csrftoken';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

function Login() {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const userType = location.state.currentUserType || '';

  const onGoBack = () => {
    navigate('/')
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') {
      setusername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async () => {
    try {
      fetch(`${apiUrl}/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken,  // CSRF token from the cookie
        },
        credentials: 'include',
        body: JSON.stringify({
          "user_id": username,
          "password": password,
        }),
      })
        .then((result) => {
          return result.json()
        })
        .then((data) => {
          if (data.message === 'success') {
            setMessage(`Welcome ${userType}!`);
            navigate('/admin')
          } else {
            setMessage('Login Incorrect. Please try again.');
          }

          const cookieValue = Cookies.get('role');
          if (cookieValue) {
            localStorage.setItem('role', cookieValue);
          }
          navigate(`/${cookieValue}`)
        });
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
    }

  };

  return (
    <div>
      <h1>{userType} Login</h1>
      <input
        type="text"
        name="username"
        value={username}
        onChange={handleInputChange}
        placeholder="Username"
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