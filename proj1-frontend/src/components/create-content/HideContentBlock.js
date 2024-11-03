import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { csrftoken } from '../../csrftoken';



const HideContentBlock = () => {
    const [input, setInput] = useState('');
    const [message, setMessage] = useState('');

    const location = useLocation()
    const navigate = useNavigate()

    const [textbookID, setTextbookID] = useState(location.state?.textbookID)
    const [chapterName, setChapterName] = useState(location.state?.chapterName || null)
    const [sectionNumber, setSectionNumber] = useState(location.state?.sectionNumber || null)

    // Handle input change
    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    // Handle the "Save" action
    const handleSave = () => {
        if (input.trim()) {

            fetch(`${process.env.REACT_APP_SERVER_URL}/contents/${input}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,  // CSRF token from the cookie
                },
                credentials: 'include',
                body: JSON.stringify({//TODO
                    "section_number": sectionNumber,
                    "chapter_name": chapterName,
                    "textbook_id": textbookID,
                    "hidden": true
                }),

            })
                .then((response) => {
                    console.log(response)
                    alert("Chapter Delete")
                })
                .catch((error) => console.error(error));
            setMessage('Success: Content block has been hidden!');
            // Add logic to hide the content block if needed
        } else {
            setMessage('Fail: No content block specified to hide.');
        }
    };

    // Handle the "Cancel" action
    const handleCancel = () => {
        setInput(''); // Clear the input
        setMessage(''); // Clear any messages
        navigate(-1)
    };

    return (
        <div>
            <h2>Hide Content Block</h2>

            <div>
                <label>Input: </label>
                <input
                    type="text"
                    value={input}
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

export default HideContentBlock;
