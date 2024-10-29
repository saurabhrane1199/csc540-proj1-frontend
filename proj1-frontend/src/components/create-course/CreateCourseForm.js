import React, { useState } from 'react';

const CreateCourseForm = ({ onSave, onCancel, onLandingPage }) => {
    const [courseDetails, setCourseDetails] = useState({
        courseId: '',
        courseName: '',
        eTextbookId: '',
        facultyMemberId: '',
        startDate: '',
        endDate: '',
        token: '',
        capacity: ''
    });
    const [menuChoice, setMenuChoice] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourseDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (menuChoice === 1) {
            onSave(courseDetails);
        } else if (menuChoice === 2) {
            onCancel();
        } else if (menuChoice === 3) {
            onLandingPage();
        }
    };

    return (
        <div>
            <h2>Create New Active Course</h2>
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

                <label>
                    Unique Token:
                    <input
                        type="text"
                        name="token"
                        value={courseDetails.token}
                        onChange={handleInputChange}
                        required
                    />
                </label>

                <label>
                    Course Capacity:
                    <input
                        type="number"
                        name="capacity"
                        value={courseDetails.capacity}
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

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};