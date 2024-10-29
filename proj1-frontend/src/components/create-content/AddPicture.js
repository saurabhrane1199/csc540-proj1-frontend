import React, { useState } from "react";

function AddPicture({ onGoBack, onGoLandingPage, onSavePicture }) {
    const [picture, setPicture] = useState(null);

    const handlePictureChange = (e) => {
        setPicture(e.target.files[0]);
    };

    const handleDiscardAndGoBack = () => {
        setPicture(null); // Clear the picture and go back to the previous page
        onGoBack();
    };

    const handleDiscardAndGoLandingPage = () => {
        setPicture(null); // Clear the picture and go to the landing page
        onGoLandingPage();
    };

    const handleSavePicture = () => {
        if (picture) {
            onSavePicture(picture); // Save the picture and go back to the previous page
        } else {
            alert("Please upload a picture before saving.");
        }
    };

    return (
        <div>
            <h3>Add Picture</h3>
            <label>
                Picture:
                <input type="file" accept="image/*" onChange={handlePictureChange} />
            </label>
            <br />
            <button onClick={handleSavePicture}>1. Add</button>
            <button onClick={handleDiscardAndGoBack}>2. Go Back</button>
            <button onClick={handleDiscardAndGoLandingPage}>3. Landing Page</button>
        </div>
    );
}

export default AddPicture;