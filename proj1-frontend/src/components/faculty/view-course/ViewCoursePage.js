
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { csrftoken } from '../../../csrftoken';

const ViewCoursesPage = () => {

    const navigate = useNavigate();
    const [assignedCourses, setAssignedCourses] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                fetch(`${process.env.REACT_APP_SERVER_URL}/courses/all/`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrftoken,  // CSRF token from the cookie
                    },
                    credentials: 'include',
                })
                    .then((result) => {
                        return result.json();
                    }).then((data) => {
                        console.log(data)
                        setAssignedCourses(data.enrolled_students);
                    });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the function to fetch data
        fetchData();

    }, [])

    // Function to handle the "Go Back" option
    const handleGoBack = () => {
        navigate('/faculty');
    };

    return (
        <div>
            <h1>Assigned Courses</h1>
            <ul>
                {assignedCourses?.map((course) => (
                    <li key={course.id}>
                        {course.id}: {course.name}
                    </li>
                ))}
            </ul>

            <h2>Menu</h2>
            <ol>
                <li onClick={handleGoBack}>Go Back</li>
            </ol>
        </div>
    );
};

export default ViewCoursesPage;
