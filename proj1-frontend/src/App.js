import React, { useState } from 'react';
import Login from './components/login';

function App() {
  const [page, setPage] = useState('home');
  const [currentUserType, setCurrentUserType] = useState('');

  const handleMenuChoice = (choice) => {
    switch (choice) {
      case '1':
        setCurrentUserType('Admin');
        setPage('login');
        break;
      case '2':
        setCurrentUserType('Faculty');
        setPage('login');
        break;
      case '3':
        setCurrentUserType('TA');
        setPage('login');
        break;
      case '4':
        setCurrentUserType('Student');
        setPage('login');
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
      {page === 'home' && (
        <>
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
            onChange={(e) => handleMenuChoice(e.target.value)}
          />
        </>
      )}

      {page === 'login' && (
        <Login userType={currentUserType} onGoBack={() => setPage('home')} onLoginSuccess={handleLoginSuccess} />
      )}

      {page === 'adminHome' && <AdminLandingPage />}
      {page === 'facultyHome' && <FacultyLandingPage />}
      {page === 'taHome' && <TALandingPage />}
      {page === 'studentHome' && <StudentLandingPage />}
    </div >
  );
}

export default App;