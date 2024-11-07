import React, { useState } from 'react';
import { csrftoken } from "../../csrftoken";
import { useLocation, useNavigate } from 'react-router-dom';


const DeleteChapter = () => {
    const [input, setInput] = useState('');
    const [message, setMessage] = useState(null);

    const location = useLocation()
    const navigate = useNavigate()

    const [textbookId, setTextbookId] = useState(location.state?.textbookId || null)

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSave = () => {
        // Add your save logic here. This is a placeholder.
        const saveSuccess = true; // Assume the save operation returns true if successful

        if (saveSuccess) {
            fetch(`${process.env.REACT_APP_SERVER_URL}/chapters/${input}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,  // CSRF token from the cookie
                },
                credentials: 'include',
                body: JSON.stringify({//TODO
                    "textbook_id": textbookId,
                }),

            })
                .then((response) => {
                    console.log(response)
                    if (!response.ok) {
                        alert("Error Occured")
                        return
                    }
                    alert("Chapter Delete")
                })
                .catch((error) => console.error(error));
            setMessage('Success: Chapter saved!');
        } else {
            setMessage('Fail: Chapter not saved!');
        }
    };

    const handleCancel = () => {
        setInput(''); // Clear the input
        setMessage(null); // Clear any message
        navigate(-1)
    };

    return (
        <div>
            <h1>Delete Chapter</h1>

            <div>
                <label htmlFor="chapterInput">Input:</label>
                <input
                    type="text"
                    id="chapterInput"
                    value={input}
                    onChange={handleInputChange}
                />
            </div>

            <div>
                <h2>Menu</h2>
                <button onClick={handleSave}>1. Save</button>
                <button onClick={handleCancel}>2. Cancel</button>
            </div>

            {message && <p>{message}</p>}
        </div>
    );
};

export default DeleteChapter;
