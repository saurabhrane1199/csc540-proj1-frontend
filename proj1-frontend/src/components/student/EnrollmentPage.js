import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { csrftoken } from '../../csrftoken';

const CourseEnrollmentPage = () => {
    const navigate = useNavigate();
    const [studentInfo, setStudentInfo] = useState({ firstName: '', lastName: '', email: '', courseToken: '' });
    const [message, setMessage] = useState('');

    // Handle input change for each field
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStudentInfo({ ...studentInfo, [name]: value });
    };

    // Handle enrollment submission
    const handleEnroll = () => {
        const { firstName, lastName, email, courseToken } = studentInfo;
        if (firstName && lastName && email && courseToken) {
            try {
                fetch(`${process.env.REACT_APP_SERVER_URL}/enroll/`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrftoken,  // CSRF token from the cookie
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        "course_token": studentInfo.courseToken,
                        "first_name": studentInfo.firstName,
                        "last_name": studentInfo.lastName,
                        "email": studentInfo.email
                    })
                })
                    .then((result) => {
                        return result.json();
                    }).then((data) => {
                        console.log(data)
                        setMessage('Success: Enrollment request submitted, and you have been added to the waiting list.');
                        setTimeout(() => navigate(-1), 2000); // Redirect after 2 seconds
                    });
            } catch (error) {
                console.error('Error fetching data:', error);
            }

        } else {
            setMessage('Failure: All fields are required.');
        }
    };

    // Handle "Go Back" option
    const handleGoBack = () => {
        navigate('/student/prelogin'); // Go back to the login page
    };

    return (
        <div>
            <h1>Enroll in a Course</h1>

            <div>
                <input
                    name="firstName"
                    placeholder="First Name"
                    value={studentInfo.firstName}
                    onChange={handleInputChange}
                />
                <input
                    name="lastName"
                    placeholder="Last Name"
                    value={studentInfo.lastName}
                    onChange={handleInputChange}
                />
                <input
                    name="email"
                    placeholder="Email"
                    value={studentInfo.email}
                    onChange={handleInputChange}
                />
                <input
                    name="courseToken"
                    placeholder="Course Token"
                    value={studentInfo.courseToken}
                    onChange={handleInputChange}
                />
            </div>

            <h2>Menu</h2>
            <ol>
                <li onClick={handleEnroll}>Enroll</li>
                <li onClick={handleGoBack}>Go Back</li>
            </ol>

            {message && <p>{message}</p>}
        </div>
    );
};

export default CourseEnrollmentPage;
