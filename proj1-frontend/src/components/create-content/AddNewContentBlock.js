import React, { useState } from "react";

function AddNewContentBlock({ onGoBack, onGoLandingPage, onAddText, onAddPicture, onAddActivity }) {
    const [contentBlockID, setContentBlockID] = useState("");

    const handleDiscard = () => {
        // Clear the input field and go back to the previous page
        setContentBlockID("");
        onGoBack();
    };

    const handleLandingPage = () => {
        // Clear input and navigate to the landing page
        setContentBlockID("");
        onGoLandingPage();
    };

    const handleAddText = () => {
        if (contentBlockID) {
            onAddText(contentBlockID); // Redirect to Add Text page
        } else {
            alert("Please enter the Content Block ID before proceeding.");
        }
    };

    const handleAddPicture = () => {
        if (contentBlockID) {
            onAddPicture(contentBlockID); // Redirect to Add Picture page
        } else {
            alert("Please enter the Content Block ID before proceeding.");
        }
    };

    const handleAddActivity = () => {
        if (contentBlockID) {
            onAddActivity(contentBlockID); // Redirect to Add Activity page
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
