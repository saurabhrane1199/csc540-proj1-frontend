import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { csrftoken } from "../../csrftoken";

function AddNewContentBlock() {
    const [contentBlockID, setContentBlockID] = useState("");
    const [contentBlockCreated, setContentBlockCreated] = useState(false)

    const location = useLocation();
    const [sectionId, setSectionId] = useState(location.state?.sectionId || null);
    const [isModifiedEnabled, setIsModifiedEnabled] = useState(location.state?.isModifyEnabled || null);

    const navigate = useNavigate();



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
        if (!contentBlockCreated || !isModifiedEnabled) {
            fetch(`${process.env.REACT_APP_SERVER_URL}/contents/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,  // CSRF token from the cookie
                },
                credentials: 'include',
                body: JSON.stringify({
                    "content_id": contentBlockID, //provided by user (unique)
                    "section_id": sectionId,
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
            navigate("/create/content/text", { state: { sectionId: sectionId, contentBlockID: contentBlockID } })
        } else {
            alert("Please enter the Content Block ID before proceeding.");
        }
    };

    const handleAddPicture = async () => {
        if (contentBlockID) {
            await createContentBlock()
            navigate("/create/content/image", { state: { sectionId: sectionId, contentBlockID: contentBlockID } })
        } else {
            alert("Please enter the Content Block ID before proceeding.");
        }
    };

    const handleAddActivity = async () => {
        if (contentBlockID) {
            await createContentBlock()
            navigate("/create/content/activity", { state: { sectionId: sectionId, contentBlockID: contentBlockID } })
        } else {
            alert("Please enter the Content Block ID before proceeding.");
        }
    };

    return (
        <div>
            <h3>Add New Content Block</h3>
            <label>
                Content Block ID:
                <input
                    type="text"
                    value={contentBlockID}
                    onChange={(e) => setContentBlockID(e.target.value)}
                />
            </label>
            <br />
            <button onClick={handleAddText}>1. Add Text</button>
            <button onClick={handleAddPicture}>2. Add Picture</button>
            <button onClick={handleAddActivity}>3. Add Activity</button>
            <button onClick={handleDiscard}>4. Go Back</button>
            <button onClick={handleLandingPage}>5. Landing Page</button>
        </div>
    );
}

export default AddNewContentBlock;
