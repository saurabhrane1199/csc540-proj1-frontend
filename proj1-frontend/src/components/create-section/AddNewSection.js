import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { csrftoken } from "../../csrftoken";

function AddNewSection() {
    const [sectionNumber, setSectionNumber] = useState("");
    const [sectionTitle, setSectionTitle] = useState("");
    const [sectionId, setSectionId] = useState("1.1");
    const [showNextOptions, setshowNextOptions] = useState(false)
    const [role, setRole] = useState()
    const navigate = useNavigate();

    const location = useLocation();

    useEffect(() => {
        setRole(localStorage.getItem('role'))
    })

    const [chapterID, setChapterID] = useState(location.state?.chapterID || null)
    const [textbookId, setTextbookId] = useState(location.state?.textbookId || null)
    const [isModifyEnabled, setIsModifyEnabled] = useState(location.state?.isModifySectionEnabled || null)

    const handleCreateSection = () => {

        fetch(`${process.env.REACT_APP_SERVER_URL}/sections/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,  // CSRF token from the cookie
            },
            credentials: 'include',
            body: JSON.stringify({

                "chapter_name": chapterID,
                "number": sectionNumber,      //provided by user
                "title": sectionTitle, //provided by user
                "hidden": false,   //default: False
                "textbook_id": textbookId

            }),

        })
            .then((response) => {
                const data = response.json()
                return data
            })
            .then((data) => {
                console.log(data)
                alert("Section created")
                setSectionId(data.section_id)
                setshowNextOptions(true)
            })
            .catch((error) => console.error(error));

    }

    const handleDiscard = () => {
        // Clear the input fields and go back to the previous page
        setSectionNumber("");
        setSectionTitle("");
        navigate(-1)
    };

    const handleLandingPage = () => {
        // Clear input and navigate to the landing page
        setSectionNumber("");
        setSectionTitle("");
        navigate(-1)
    };

    const handleAddContentBlock = (isModifyEnabled) => {
        if (sectionNumber) {
            navigate("/create/content", { state: { textbookId: textbookId, sectionNumber: sectionNumber, chapterID: chapterID, isModifyEnabled: isModifyEnabled } })
        } else {
            alert("Please fill in all fields before proceeding.");
        }
    };

    return (
        <div>
            <h3>{isModifyEnabled ? <>Modify</> : <>Add New</>}Section</h3>

            {!textbookId ? (<label>
                Textbook ID:
                <input
                    type="text"
                    value={textbookId}
                    onChange={(e) => setTextbookId(e.target.value)}
                />
            </label>) : null}

            {!chapterID ? (<label>
                Chapter ID:
                <input
                    type="text"
                    value={chapterID}
                    onChange={(e) => setChapterID(e.target.value)}
                />
            </label>) : null}


            <label>
                Section Number:
                <input
                    type="text"
                    value={sectionNumber}
                    onChange={(e) => setSectionNumber(e.target.value)}
                />
            </label>
            <br />
            {!isModifyEnabled ? <label>
                Section Title:
                <input
                    type="text"
                    value={sectionTitle}
                    onChange={(e) => setSectionTitle(e.target.value)}
                />
            </label> : <></>}
            {!isModifyEnabled ? <button onClick={handleCreateSection}>Create Section</button> : <></>}
            <br />
            {showNextOptions || isModifyEnabled ?
                <><button onClick={() => handleAddContentBlock(false)}>Add New Content Block</button>
                    {isModifyEnabled ? <button onClick={() => handleAddContentBlock(isModifyEnabled)}>Modify Content Block</button> : <></>}
                    {isModifyEnabled && role === "faculty" ? <button onClick={() => { navigate("/hide/section", { state: { textbookId: textbookId, chapterName: chapterID } }) }}>Hide Section</button> : <></>}
                    {isModifyEnabled && role === "faculty" ? <button onClick={() => { navigate("/delete/section", { state: { textbookId: textbookId, chapterName: chapterID } }) }}>Delete Section</button> : <></>}
                    <button onClick={handleDiscard}>Go Back</button>
                    <button onClick={handleLandingPage}>Landing Page</button></> : null}
        </div>
    );
}

export default AddNewSection;