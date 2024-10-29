import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { csrftoken } from "../../csrftoken";

function AddNewChapter({ onGoBack, onGoLandingPage, onAddSection }) {
    const [chapterID, setChapterID] = useState("");
    const [chapterTitle, setChapterTitle] = useState("");
    const [showNextOptions, setshowNextOptions] = useState(false)

    const navigate = useNavigate();

    const location = useLocation();

    const [textbookId, setETextbookID] = useState(location.state?.textbookId || null)

    const handleCreateChapter = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/chapters/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,  // CSRF token from the cookie
            },
            credentials: 'include',
            body: JSON.stringify({
                "textbook_id": textbookId,
                "title": chapterTitle,
                "chapter_id": chapterID,
                "hidden": false
            }),

        })
            .then((response) => {
                console.log(response)
                alert("Chapter created")
                setshowNextOptions(true)
            })
            .catch((error) => console.error(error));
    }

    const handleDiscard = () => {
        // Clear the input fields and go back to the previous page
        setChapterID("");
        setChapterTitle("");
        onGoBack();
    };

    const handleLandingPage = () => {
        // Clear input and navigate to the landing page
        setChapterID("");
        setChapterTitle("");
        onGoLandingPage();
    };

    const handleAddSection = () => {
        if (chapterID && chapterTitle) {
            navigate("/create/section", { state: { chapterID: chapterID } })
        } else {
            alert("Please fill in all fields before proceeding.");
        }
    };

    return (
        <div>
            <h3>Add New Chapter</h3>

            {!textbookId ? (<label>
                Textbook ID:
                <input
                    type="text"
                    value={textbookId}
                    onChange={(e) => setETextbookID(e.target.value)}
                />
            </label>) : null}

            <label>
                Unique Chapter ID:
                <input
                    type="text"
                    value={chapterID}
                    onChange={(e) => setChapterID(e.target.value)}
                />
            </label>
            <br />
            <label>
                Chapter Title:
                <input
                    type="text"
                    value={chapterTitle}
                    onChange={(e) => setChapterTitle(e.target.value)}
                />
            </label>
            <button onClick={handleCreateChapter}>Create Chapter</button>
            <br />
            {showNextOptions ? <><button onClick={handleAddSection}>1. Add New Section</button>
                <button onClick={handleDiscard}>2. Go Back</button>
                <button onClick={handleLandingPage}>3. Landing Page</button></> : null}
        </div>
    );
}

export default AddNewChapter;
