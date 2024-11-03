import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { csrftoken } from '../../csrftoken';

const HideSection = () => {
    const [input, setInput] = useState('');
    const [message, setMessage] = useState('');

    const location = useLocation()
    const navigate = useNavigate()

    const [textbookId, setTextbookId] = useState(location.state?.textbookId || null)
    const [chapterName, setChapterName] = useState(location.state?.chapterName || null)

    // Handle input changes
    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    // Handle the "Save" action
    const handleSave = () => {
        if (input.trim()) {
            fetch(`${process.env.REACT_APP_SERVER_URL}/sections/${input}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,  // CSRF token from the cookie
                },
                credentials: 'include',
                body: JSON.stringify({//TODO
                    "textbook_id": textbookId,
                    "chapter_name": chapterName,
                    "hidden": true
                }),

            })
                .then((response) => {
                    console.log(response)
                    alert("Chapter Delete")
                })
                .catch((error) => console.error(error));
            setMessage('Success: Your input has been saved!');
            // Add logic to save the input if needed
        } else {
            setMessage('Fail: No input to save.');
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
            <h2>Hide Section</h2>

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

export default HideSection;
