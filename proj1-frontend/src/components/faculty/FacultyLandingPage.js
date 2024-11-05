import React from 'react';
import { useNavigate } from 'react-router-dom';

const FacultyLandingPage = () => {
  const navigate = useNavigate();

  // Function to handle menu option selection
  const handleOptionSelect = (option) => {
    switch (option) {
      case 1:
        navigate('/faculty/active/course');
        break;
      case 2:
        navigate('/faculty/evaluation/course');
        break;
      case 3:
        navigate('/faculty/courses');
        break;
      case 4:
        navigate('/change-password');
        break;
      case 5:
        setTimeout(() => navigate("/logout"), 2000) // Redirect to Home page for Logout
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h1>Faculty Landing Page</h1>
      <h2>Display Menu</h2>
      <ol>
        <li onClick={() => handleOptionSelect(1)}>Go to Active Course</li>
        <li onClick={() => handleOptionSelect(2)}>Go to Evaluation Course</li>
        <li onClick={() => handleOptionSelect(3)}>View Courses</li>
        <li onClick={() => handleOptionSelect(4)}>Change Password</li>
        <li onClick={() => handleOptionSelect(5)}>Logout</li>
      </ol>
    </div>
  );
};

export default FacultyLandingPage;
