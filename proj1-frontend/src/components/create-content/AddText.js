import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { csrftoken } from "../../csrftoken";
import { useNavigate } from "react-router-dom";


function AddText() {
    const [text, setText] = useState("");

    const location = useLocation();
    const navigate = useNavigate();
    const [chapterID, setChapterID] = useState(location.state?.chapterID || null)
    const [textbookId, setTextbookId] = useState(location.state?.textbookId || null)
    const [contentBlockID, setContentBlockID] = useState(location.state?.contentBlockID || null);
    const [sectionNumber, setSectionNumber] = useState(location.state?.sectionNumber || null);

    const handleDiscardAndGoBack = () => {
        // Clear input and go back to the previous page
        setText("");
        navigate(-1);
    };

    const handleDiscardAndGoLandingPage = () => {
        // Clear input and go to the landing page
        setText("");
        navigate(-1);
    };

    const handleSaveText = () => {
        if (text) {
            fetch(`${process.env.REACT_APP_SERVER_URL}/contents/${contentBlockID}/text/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,  // CSRF token from the cookie
                },
                credentials: 'include',
                body: JSON.stringify({
                    "text_data": text,
                    "section_number": sectionNumber,
                    "chapter_name": chapterID,
                    "textbook_id": textbookId,
                    "hidden": false
                }),

            })
                .then((response) => {
                    console.log(response)
                })
                .catch((error) => console.error(error));
        }
        else {
            alert("Please enter some text before saving.");
        }
    };




    return (
        <div>
            <h3>Add Text</h3>
            <label>
                Text:
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter the text content here..."
                    rows={4}
                    cols={50}
                />
            </label>
            <br />
            <button onClick={handleSaveText}>1. Add</button>
            <button onClick={handleDiscardAndGoBack}>2. Go Back</button>
            <button onClick={handleDiscardAndGoLandingPage}>3. Landing Page</button>
        </div>
    );
}

export default AddText;
