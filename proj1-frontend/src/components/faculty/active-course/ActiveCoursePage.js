import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ActiveCoursePage = () => {
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
                navigate(`/faculty/worklist`, { state: { courseID: courseID } });
                break;
            case 2:
                navigate(`/faculty/approve-enrollment`, { state: { courseID: courseID } });
                break;
            case 3:
                navigate(`/faculty/view-students`, { state: { courseID: courseID } });
                break;
            case 4:
                navigate(`/create/chapter/`, { state: { courseID: courseID } }); //TODO
                break;
            case 5:
                navigate(`/create/chapter/`, { state: { isModifyChapter: true, courseID: courseID } });//TODO
                break;
            case 6:
                navigate(`/faculty/add-ta`, { state: { courseID: courseID } });
                break;
            case 7:
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
                <li onClick={() => handleOptionSelect(1)}>View Worklist</li>
                <li onClick={() => handleOptionSelect(2)}>Approve Enrollment</li>
                <li onClick={() => handleOptionSelect(3)}>View Students</li>
                <li onClick={() => handleOptionSelect(4)}>Add New Chapter</li>
                <li onClick={() => handleOptionSelect(5)}>Modify Chapters</li>
                <li onClick={() => handleOptionSelect(6)}>Add TA</li>
                <li onClick={() => handleOptionSelect(7)}>Go Back</li>
            </ol>
        </div>
    );
};

export default ActiveCoursePage;
