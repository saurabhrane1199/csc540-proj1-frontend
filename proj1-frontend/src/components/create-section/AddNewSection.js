import React, { useState } from "react";

function AddNewSection({ onGoBack, onGoLandingPage, onAddContentBlock }) {
    const [sectionNumber, setSectionNumber] = useState("");
    const [sectionTitle, setSectionTitle] = useState("");

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
            <br />
            <button onClick={handleAddContentBlock}>1. Add New Content Block</button>
            <button onClick={handleDiscard}>2. Go Back</button>
            <button onClick={handleLandingPage}>3. Landing Page</button>
        </div>
    );
}

export default AddNewSection;