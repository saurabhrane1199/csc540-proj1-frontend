import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ViewStudentsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [students, setStudents] = useState([])
    const [courseId, setCourseId] = useState(location.state?.courseId || null)

    // const students = [
    //     { id: 'S001', name: 'John Doe', email: 'johndoe@example.com' },
    //     { id: 'S002', name: 'Jane Smith', email: 'janesmith@example.com' },
    // ];


    useEffect(() => {
        // Define an async function to fetch data
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/courses/${courseId}/worklist/`);
                const result = await response.json();
                setStudents(result);
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
                    <li key={student.id}>
                        {student.name} ({student.email})
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
