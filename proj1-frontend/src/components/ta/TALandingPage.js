import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function TALandingPage() {

    const navigate = useNavigate();



    useEffect(() => {
        let role = localStorage.getItem("role")
        if (role != "ta") {
            navigate(`/${role}`)
        }
    })


    // Function to handle menu option selection
    const handleOptionSelect = (option) => {
        switch (option) {
            case 1:
                navigate('/faculty/active/course', { state: { role: "ta" } });
                break;
            case 2:
                navigate('/faculty/courses');
                break;
            case 3:
                navigate('/change-password');
                break;
            case 4:
                navigate('/logout'); // Redirect to Home page for Logout
                break;
            default:
                break;
        }
    };


    return (
        <div>
            <h1>TA Landing Page</h1>
            <h2>Display Menu</h2>
            <ol>
                <li onClick={() => handleOptionSelect(1)}>Go to Active Course</li>
                <li onClick={() => handleOptionSelect(2)}>View Courses</li>
                <li onClick={() => handleOptionSelect(3)}>Change Password</li>
                <li onClick={() => handleOptionSelect(4)}>Logout</li>
            </ol>
        </div>
    );
}

export default TALandingPage;