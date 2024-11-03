import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EvaluationCoursePage = () => {
    const navigate = useNavigate();
    const [courseID, setCourseID] = useState('');

    // Function to handle the Course ID input
    const handleCourseIDChange = (e) => {
        setCourseID(e.target.value);
    };

    // Function to handle menu option selection
    const handleOptionSelect = (option) => {
        switch (option) {
            case 1:
                navigate(`/create/chapter/`, { state: { courseID: courseID } }); //TODO
                break;
            case 2:
                navigate(`/create/chapter/`, { state: { isModifyChapter: true, courseID: courseID } });//TODO
                break;
            case 3:
                navigate('/faculty'); // Go back to Faculty Landing page
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <h1>Active Course</h1>
            <h2>Enter Course ID</h2>
            <input
                type="text"
                value={courseID}
                onChange={handleCourseIDChange}
                placeholder="Enter Course ID"
            />

            <h2>Menu</h2>
            <ol>
                <li onClick={() => handleOptionSelect(1)}>Add New Chapter</li>
                <li onClick={() => handleOptionSelect(2)}>Modify Chapters</li>
                <li onClick={() => handleOptionSelect(3)}>Go Back</li>
            </ol>
        </div>
    );
};

export default EvaluationCoursePage;
