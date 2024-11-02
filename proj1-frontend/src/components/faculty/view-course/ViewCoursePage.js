
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ViewCoursesPage = () => {
    const navigate = useNavigate();

    // Sample list of assigned courses (replace with data fetched from API or state)
    const assignedCourses = [
        { id: 'CS101', name: 'Introduction to Computer Science' },
        { id: 'CS102', name: 'Data Structures' },
        { id: 'CS103', name: 'Algorithms' },
    ];

    // Function to handle the "Go Back" option
    const handleGoBack = () => {
        navigate('/faculty');
    };

    return (
        <div>
            <h1>Assigned Courses</h1>
            <ul>
                {assignedCourses.map((course) => (
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
