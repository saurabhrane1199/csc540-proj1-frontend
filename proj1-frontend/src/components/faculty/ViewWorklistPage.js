import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { csrftoken } from '../../csrftoken';

const ViewWorklistPage = () => {


    const navigate = useNavigate();
    const location = useLocation();
    const [courseId, setCourseId] = useState(location.state?.courseID || null);
    const [worklist, setWorkList] = useState([])

    // Sample waiting list of students (replace with data fetched from API or state)
    const waitingList = [
        { id: 'S001', name: 'John Doe', email: 'johndoe@example.com' },
        { id: 'S002', name: 'Jane Smith', email: 'janesmith@example.com' },
        { id: 'S003', name: 'Alice Johnson', email: 'alicejohnson@example.com' },
    ];

    useEffect(() => {
        // Define an async function to fetch data
        const fetchData = async () => {
            try {
                fetch(`${process.env.REACT_APP_SERVER_URL}/courses/${courseId}/worklist/`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrftoken,  // CSRF token from the cookie
                    },
                    credentials: 'include',
                }
                ).then((res) => {
                    const result = res.json();
                    return result
                })
                    .then((data) => {
                        console.log(data)
                        setWorkList(data.pending_students);
                    });


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the function to fetch data
        fetchData();
    }, []);

    // Function to handle "Go Back" option
    const handleGoBack = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <div>
            <h1>Student Worklist</h1>
            <ul>
                {worklist.map((student) => (
                    <li key={student.student_id}>
                        {student.student_id} ({student.student_name})
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

export default ViewWorklistPage;
