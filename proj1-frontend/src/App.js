import React, { useState } from 'react';
import Login from './components/login';
import { useNavigate } from 'react-router-dom';

function App() {
  const [currentUserType, setCurrentUserType] = useState('');
  const navigate = useNavigate();

  const handleMenuChoice = (choice) => {
    switch (choice) {
      case '1':
        setCurrentUserType('admin');
        navigate('/login', { state: { currentUserType }, });
        break;
      case '2':
        setCurrentUserType('faculty');
        navigate('/login', { state: { currentUserType }, });
        break;
      case '3':
        setCurrentUserType('ta');
        navigate('/login', { state: { currentUserType }, });
        break;
      case '4':
        navigate('/student/prelogin')
        break;
      case '5':
        alert('Exiting program...');
        break;
      default:
        alert('Invalid choice. Please enter a number between 1 and 5.');
    }



  };

  return (
    <div>

      <h1>Menu</h1>
      <ul>
        <li>1. Admin Login</li>
        <li>2. Faculty Login</li>
        <li>3. TA Login</li>
        <li>4. Student Login</li>
        <li>5. Exit</li>
      </ul>
      <input
        type="text"
        placeholder="Enter Choice (1-5)"
        onChange={(e) => handleMenuChoice(e.target.value)} />
    </div >
  );
}

export default App;