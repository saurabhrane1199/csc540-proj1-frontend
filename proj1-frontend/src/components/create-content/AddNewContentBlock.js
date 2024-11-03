import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { csrftoken } from "../../csrftoken";

function AddNewContentBlock() {
    const [contentBlockID, setContentBlockID] = useState("");
    const [contentBlockCreated, setContentBlockCreated] = useState(false)
    const [role, setRole] = useState()

    const location = useLocation();
    const [sectionNumber, setSectionNumber] = useState(location.state?.sectionNumber || null);
    const [isModifiedEnabled, setIsModifiedEnabled] = useState(location.state?.isModifyEnabled || null);
    const [textbookId, setTextbookId] = useState(location.state?.textbookId || null);
    const [chapterID, setChapterID] = useState(location.state?.chapterID || null);

    const navigate = useNavigate();

    useEffect(() => {
        setRole(localStorage.getItem('role'))
    })



    const handleDiscard = () => {
        // Clear the input field and go back to the previous page
        setContentBlockID("");
        //onGoBack();
    };

    const handleLandingPage = () => {
        // Clear input and navigate to the landing page
        setContentBlockID("");
        //onGoLandingPage();
    };

    const createContentBlock = () => {
        if (!isModifiedEnabled) {
            fetch(`${process.env.REACT_APP_SERVER_URL}/contents/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,  // CSRF token from the cookie
                },
                credentials: 'include',
                body: JSON.stringify({
                    "content_name": contentBlockID, //provided by user (unique)
                    "section_number": sectionNumber,
                    "chapter_name": chapterID,
                    "textbook_id": textbookId,
                    "hidden": "False"
                }),

            })
                .then((response) => {
                    console.log(response)
                    alert("Content Block created")
                    setContentBlockCreated(true)
                })
                .catch((error) => console.error(error));
        }

    }

    const handleAddText = async () => {
        if (contentBlockID) {
            await createContentBlock()
            navigate("/create/content/text", { state: { textbookId: textbookId, sectionNumber: sectionNumber, chapterID: chapterID, contentBlockID: contentBlockID } })
        } else {
            alert("Please enter the Content Block ID before proceeding.");
        }
    };

    const handleAddPicture = async () => {
        if (contentBlockID) {
            await createContentBlock()
            navigate("/create/content/image", { state: { textbookId: textbookId, sectionNumber: sectionNumber, chapterID: chapterID, contentBlockID: contentBlockID } })
        } else {
            alert("Please enter the Content Block ID before proceeding.");
        }
    };

    const handleAddActivity = async () => {
        if (contentBlockID) {
            await createContentBlock()
            navigate("/create/content/activity", { state: { textbookId: textbookId, sectionNumber: sectionNumber, chapterID: chapterID, contentBlockID: contentBlockID } })
        } else {
            alert("Please enter the Content Block ID before proceeding.");
        }
    };

    return (
        <div>
            <h3>{isModifiedEnabled ? <>Modify</> : <>Add New</>}Content Block</h3>
            <label>
                Content Block ID:
                <input
                    type="text"
                    value={contentBlockID}
                    onChange={(e) => setContentBlockID(e.target.value)}
                />
            </label>
            <br />
            {isModifiedEnabled & role === "faculty" ? <button onClick={() => { navigate("/hide/content", { state: { textbookId: textbookId, chapterName: chapterID, sectionNumber: sectionNumber } }) }}>Hide Content Block</button> : <></>}
            {isModifiedEnabled & role === "faculty" ? <button onClick={() => { navigate("/delete/content", { state: { textbookId: textbookId, chapterName: chapterID, sectionNumber: sectionNumber } }) }}>Delete Content Block</button> : <></>}
            <button onClick={handleAddText}>Add Text</button>
            <button onClick={handleAddPicture}>Add Picture</button>
            {isModifiedEnabled & role === "faculty" || role === "ta" ? <button onClick={() => { navigate("/hide/activity", { state: { textbookId: textbookId, chapterName: chapterID, sectionNumber: sectionNumber, contentBlockId: contentBlockID } }) }}>Hide Activity</button> : <></>}
            {isModifiedEnabled & role === "faculty" ? <button onClick={() => { navigate("/delete/activity", { state: { textbookId: textbookId, chapterName: chapterID, sectionNumber: sectionNumber, contentBlockId: contentBlockID } }) }}>Delete Activity</button> : <></>}
            <button onClick={handleAddActivity}>Add Activity</button>
            <button onClick={handleDiscard}>Go Back</button>
            <button onClick={handleLandingPage}>Landing Page</button>
        </div>
    );
}

export default AddNewContentBlock;
