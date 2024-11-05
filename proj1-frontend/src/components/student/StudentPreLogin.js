import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function StudentPreLogin() {
    const [currentUserType, setCurrentUserType] = useState('');
    const navigate = useNavigate();

    const handleMenuChoice = (choice) => {
        switch (choice) {
            case '1':
                navigate('/student/enroll')
                break;
            case '2':
                navigate('/login', { state: { currentUserType } })
                break;
            case '3':
                navigate(-1)
                break;
            default:
                alert('Invalid choice. Please enter a number between 1 and 5.');
        }
    };

    return (
        <div>

            <h1>Menu</h1>
            <ul>
                <li>1. Enroll</li>
                <li>2. Sign-In</li>
                <li>3. Go Back</li>
            </ul>
            <input
                type="text"
                placeholder="Enter Choice (1-3)"
                onChange={(e) => handleMenuChoice(e.target.value)} />
        </div >
    );
}

export default StudentPreLogin;