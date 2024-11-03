import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { csrftoken } from "../../csrftoken";
import userRole from "../../getRoleFromStorage";

function AddNewChapter() {
    const [chapterID, setChapterID] = useState("");
    const [chapterTitle, setChapterTitle] = useState("");
    const [showNextOptions, setshowNextOptions] = useState(false)
    const [role, setRole] = useState()

    useEffect(() => {
        setRole(localStorage.getItem('role'))
    })


    const navigate = useNavigate();

    const location = useLocation();

    const [isModifyEnabled, setModifyEnabled] = useState(location.state?.isModifyChapter || null)
    const [textbookId, setETextbookID] = useState(location.state?.textbookId || null)
    const isTextbookNull = textbookId === null ? true : false

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
                "chapter_name": chapterID,
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
        navigate(-1)
        //onGoBack(); //TODO
    };

    const handleLandingPage = () => {
        // Clear input and navigate to the landing page
        setChapterID("");
        setChapterTitle("");
        navigate(-1)
        //onGoLandingPage(); //TODO
    };

    const handleAddSection = (isModifySectionEnabled) => {
        if (chapterID) {
            navigate("/create/section", { state: { chapterID: chapterID, textbookId: textbookId, isModifySectionEnabled: isModifySectionEnabled } })
        } else {
            alert("Please fill in all fields before proceeding.");
        }
    };

    return (
        <div>
            <h3>{isModifyEnabled ? <>Modify</> : <>Add New</>} Chapter</h3>

            {isTextbookNull ? (<label>
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
            {!isModifyEnabled ? <label>
                Chapter Title:
                <input
                    type="text"
                    value={chapterTitle}
                    onChange={(e) => setChapterTitle(e.target.value)}
                />
            </label> : null}
            {!isModifyEnabled ? <button onClick={handleCreateChapter}>Create Chapter</button> : null}
            <br />
            {showNextOptions || isModifyEnabled ?
                <><button onClick={() => handleAddSection(false)}>Add New Section</button>
                    {isModifyEnabled ? <button onClick={() => handleAddSection(isModifyEnabled)}>Modify Section</button> : <></>}
                    {isModifyEnabled & role === "faculty" ? <button onClick={() => { navigate("/hide/chapter", { state: { textbookId: textbookId } }) }}>Hide Chapter</button> : <></>}
                    {isModifyEnabled & role === "faculty" ? <button onClick={() => { navigate("/delete/chapter", { state: { textbookId: textbookId } }) }}>Delete Chapter</button> : <></>}
                    <button onClick={handleDiscard}>Go Back</button>
                    <button onClick={handleLandingPage}>Landing Page</button></> : null}
        </div>
    );
}

export default AddNewChapter;
