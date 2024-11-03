import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { csrftoken } from '../../csrftoken';

const ViewStudentsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [students, setStudents] = useState([])
    const [courseId, setCourseId] = useState(location.state?.courseID || null)

    // const students = [
    //     { id: 'S001', name: 'John Doe', email: 'johndoe@example.com' },
    //     { id: 'S002', name: 'Jane Smith', email: 'janesmith@example.com' },
    // ];


    useEffect(() => {
        // Define an async function to fetch data
        const fetchData = async () => {
            try {
                fetch(`${process.env.REACT_APP_SERVER_URL}/courses/${courseId}/students/`, {
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
                        setStudents(data.enrolled_students);
                    });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the function to fetch data
        fetchData();
    }, []);

    return (
        <div>
            <h1>Students List</h1>
            <ul>
                {students.map((student) => (
                    <li key={student.student_id}>
                        {student.student_id} ({student.student_name})
                    </li>
                ))}
            </ul>

            <h2>Menu</h2>
            <ol>
                <li onClick={() => navigate(-1)}>Go Back</li>
            </ol>
        </div>
    );
};

export default ViewStudentsPage;
