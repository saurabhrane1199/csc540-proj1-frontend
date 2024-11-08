import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { csrftoken } from '../../csrftoken';

const HideActivity = () => {
    const [activityID, setActivityID] = useState('');
    const [message, setMessage] = useState('');

    const location = useLocation()
    const navigate = useNavigate()

    const [textbookID, setTextbookID] = useState(location.state?.textbookID)
    const [chapterName, setChapterName] = useState(location.state?.chapterName || null)
    const [sectionNumber, setSectionNumber] = useState(location.state?.sectionNumber || null)
    const [contentBlockId, setContentBlockId] = useState(location.state?.contentBlockId || null)

    // Handle input change
    const handleInputChange = (e) => {
        setActivityID(e.target.value);
    };

    // Handle the "Save" action
    const handleSave = () => {
        if (activityID.trim()) {
            fetch(`${process.env.REACT_APP_SERVER_URL}/activities/${activityID}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,  // CSRF token from the cookie
                },
                credentials: 'include',
                body: JSON.stringify({//TODO
                    "content_name": contentBlockId,
                    "section_number": sectionNumber,
                    "chapter_name": chapterName,
                    "textbook_id": textbookID,
                    "hidden": true
                }),

            })
                .then((response) => {
                    console.log(response)
                    if (!response.ok) {
                        alert("Error Occured")
                        return
                    }
                    alert("Activity Hidden")
                })
                .catch((error) => console.error(error));
            setMessage('Success: Activity has been hidden!');
            // Add logic to hide the activity using the unique ID if needed
        } else {
            setMessage('Fail: Unique Activity ID is required.');
        }
    };

    // Handle the "Cancel" action
    const handleCancel = () => {
        setActivityID(''); // Clear the input
        setMessage(''); // Clear any messages
        navigate(-1)
    };

    return (
        <div>
            <h2>Faculty: Hide Activity</h2>

            <div>
                <label>Unique Activity ID: </label>
                <input
                    type="text"
                    value={activityID}
                    onChange={handleInputChange}
                />
            </div>

            <div>
                <h3>Menu</h3>
                <button onClick={handleSave}>1. Save</button>
                <button onClick={handleCancel}>2. Cancel</button>
            </div>

            {message && (
                <div>
                    <p>{message}</p>
                </div>
            )}
        </div>
    );
};

export default HideActivity;
