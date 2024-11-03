import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import apiUrl from '../../env';
import { csrftoken } from '../../csrftoken';


const AddTAPage = () => {
    const navigate = useNavigate();

    const [faculty_id, setFacultyId] = useState(null)
    const [taInfo, setTaInfo] = useState({ firstName: '', lastName: '', email: '', password: '' });
    const [message, setMessage] = useState('');

    const location = useLocation

    const [courseId, setCourseId] = useState(location.state?.courseID || null)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTaInfo({ ...taInfo, [name]: value });
    };

    const handleSave = async () => {
        if (taInfo.firstName && taInfo.lastName && taInfo.email && taInfo.password) {

            const response = await fetch(`${apiUrl}/courses/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,  // CSRF token from the cookie
                },
                credentials: 'include',
                body: JSON.stringify({
                    // "username": taInfo
                    // "password": "Williams",
                    // "email": taInfo.email,
                    // "default_password": password,
                    // "course_id": courseId,
                    // "faculty_id": "KeOg1024"
                }),
            });






            setMessage('Success: TA added successfully.');
            setTimeout(() => navigate(-1), 2000);
        } else {
            setMessage('Failure: All fields are required.');
        }
    };

    return (
        <div>
            <h1>Add Teaching Assistant</h1>
            <input name="firstName" placeholder="First Name" onChange={handleInputChange} />
            <input name="lastName" placeholder="Last Name" onChange={handleInputChange} />
            <input name="email" placeholder="Email" onChange={handleInputChange} />
            <input name="password" placeholder="Default Password" type="password" onChange={handleInputChange} />

            <h2>Menu</h2>
            <ol>
                <li onClick={handleSave}>Save</li>
                <li onClick={() => navigate(-1)}>Cancel</li>
            </ol>

            {message && <p>{message}</p>}
        </div>
    );
};

export default AddTAPage;
