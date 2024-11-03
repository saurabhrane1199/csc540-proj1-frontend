import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { csrftoken } from '../../csrftoken';

const ApproveEnrollmentPage = () => {
    const navigate = useNavigate();
    const [studentID, setStudentID] = useState('');
    const [message, setMessage] = useState('');

    // Function to handle the Student ID input
    const handleStudentIDChange = (e) => {
        setStudentID(e.target.value);
    };

    // Function to handle the "Save" option
    const handleSave = () => {
        if (studentID) {
            fetch(`${process.env.REACT_APP_SERVER_URL}/courses/${studentID}/enroll/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,  // CSRF token from the cookie
                },
                credentials: 'include',
            })
                .then((response) => {
                    console.log(response)
                    alert("Section created")
                })
                .catch((error) => console.error(error));

            setMessage('Success: Enrollment approved.');
            setTimeout(() => navigate(-1), 2000); // Redirect after 2 seconds
        } else {
            setMessage('Failure: Please enter a valid Student ID.');
        }
    };

    // Function to handle the "Cancel" option
    const handleCancel = () => {
        navigate(-1); // Go back to the previous page without saving
    };

    return (
        <div>
            <h1>Approve Enrollment</h1>

            <div>
                <label>
                    Enter Student ID:
                    <input
                        type="text"
                        value={studentID}
                        onChange={handleStudentIDChange}
                        placeholder="Enter Student ID"
                    />
                </label>
            </div>

            <h2>Menu</h2>
            <ol>
                <li onClick={handleSave}>Save</li>
                <li onClick={handleCancel}>Cancel</li>
            </ol>

            {message && <p>{message}</p>}
        </div>
    );
};

export default ApproveEnrollmentPage;
