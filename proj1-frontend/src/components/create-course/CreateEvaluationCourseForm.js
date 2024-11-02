import React, { useState } from 'react';
import { csrftoken } from '../../csrftoken';
import apiUrl from '../../env';

const CreateEvaluationCourseForm = ({ onGoBack }) => {
    const [courseDetails, setCourseDetails] = useState({
        courseId: '',
        courseName: '',
        eTextbookId: '',
        facultyMemberId: '',
        startDate: '',
        endDate: ''
    });
    const [menuChoice, setMenuChoice] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourseDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (menuChoice === 1) {
            const response = await fetch(`${apiUrl}/courses/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,  // CSRF token from the cookie
                },
                credentials: 'include',
                body: JSON.stringify({ //TODO
                    //"course_token": courseDetails.token,
                    "course_name": courseDetails.courseName,
                    "course_id": courseDetails.courseId,
                    "course_type": "evaluation",
                    "course_capacity": courseDetails.capacity,
                    "start_date": courseDetails.startDate,
                    "end_date": courseDetails.endDate,
                    "faculty_id": courseDetails.facultyMemberId,
                    "textbook_id": courseDetails.textbook_id
                }),
            });
        } else if (menuChoice === 2) {
            onGoBack();
        } else if (menuChoice === 3) {
            onGoBack();
        }
    };

    return (
        <div>
            <h2>Create New Evaluation Course</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Unique Course ID:
                    <input
                        type="text"
                        name="courseId"
                        value={courseDetails.courseId}
                        onChange={handleInputChange}
                        required
                    />
                </label>

                <label>
                    Course Name:
                    <input
                        type="text"
                        name="courseName"
                        value={courseDetails.courseName}
                        onChange={handleInputChange}
                        required
                    />
                </label>

                <label>
                    Unique ID of the E-textbook:
                    <input
                        type="text"
                        name="eTextbookId"
                        value={courseDetails.eTextbookId}
                        onChange={handleInputChange}
                        required
                    />
                </label>

                <label>
                    Faculty Member ID:
                    <input
                        type="text"
                        name="facultyMemberId"
                        value={courseDetails.facultyMemberId}
                        onChange={handleInputChange}
                        required
                    />
                </label>

                <label>
                    Course Start Date:
                    <input
                        type="date"
                        name="startDate"
                        value={courseDetails.startDate}
                        onChange={handleInputChange}
                        required
                    />
                </label>

                <label>
                    Course End Date:
                    <input
                        type="date"
                        name="endDate"
                        value={courseDetails.endDate}
                        onChange={handleInputChange}
                        required
                    />
                </label>

                <h3>Menu</h3>
                <p>1. Save</p>
                <p>2. Cancel</p>
                <p>3. Landing Page</p>

                <label>
                    Choose an option (1-3):
                    <input
                        type="number"
                        value={menuChoice}
                        onChange={(e) => setMenuChoice(Number(e.target.value))}
                        min="1"
                        max="3"
                        required
                    />
                </label>

                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
};

export default CreateEvaluationCourseForm