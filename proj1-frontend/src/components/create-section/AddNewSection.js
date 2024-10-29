import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { csrftoken } from "../../csrftoken";

function AddNewSection({ onGoBack, onGoLandingPage, onAddContentBlock }) {
    const [sectionNumber, setSectionNumber] = useState("");
    const [sectionTitle, setSectionTitle] = useState("");
    const [showNextOptions, setshowNextOptions] = useState(false)
    const navigate = useNavigate();

    const location = useLocation();

    const [chapterID, setChapterID] = useState(location.state?.chapterID || null)

    const handleCreateSection = () => {

        fetch(`${process.env.REACT_APP_SERVER_URL}/sections/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,  // CSRF token from the cookie
            },
            credentials: 'include',
            body: JSON.stringify({

                "chapter_id": chapterID,
                "number": sectionNumber,      //provided by user
                "title": "Sorting", //provided by user
                "section_id": 1.1, //TODO
                "hidden": false   //default: False

            }),

        })
            .then((response) => {
                console.log(response)
                alert("Section created")
                setshowNextOptions(true)
            })
            .catch((error) => console.error(error));

    }

    const handleDiscard = () => {
        // Clear the input fields and go back to the previous page
        setSectionNumber("");
        setSectionTitle("");
        onGoBack();
    };

    const handleLandingPage = () => {
        // Clear input and navigate to the landing page
        setSectionNumber("");
        setSectionTitle("");
        onGoLandingPage();
    };

    const handleAddContentBlock = () => {
        if (sectionNumber && sectionTitle) {
            onAddContentBlock({ sectionNumber, sectionTitle }); // Redirect to Add New Content Block page
        } else {
            alert("Please fill in all fields before proceeding.");
        }
    };

    return (
        <div>
            <h3>Add New Section</h3>

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
            <label>
                Section Title:
                <input
                    type="text"
                    value={sectionTitle}
                    onChange={(e) => setSectionTitle(e.target.value)}
                />
            </label>
            <button onClick={handleCreateSection}>Create Section</button>
            <br />
            {showNextOptions ?
                <><button onClick={handleAddContentBlock}>1. Add New Content Block</button>
                    <button onClick={handleDiscard}>2. Go Back</button>
                    <button onClick={handleLandingPage}>3. Landing Page</button></> : null}
        </div>
    );
}

export default AddNewSection;