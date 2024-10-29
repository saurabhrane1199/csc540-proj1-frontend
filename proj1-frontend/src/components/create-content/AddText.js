import React, { useState } from "react";

function AddText({ onGoBack, onGoLandingPage, onSaveText }) {
    const [text, setText] = useState("");

    const handleDiscardAndGoBack = () => {
        // Clear input and go back to the previous page
        setText("");
        onGoBack();
    };

    const handleDiscardAndGoLandingPage = () => {
        // Clear input and go to the landing page
        setText("");
        onGoLandingPage();
    };

    const handleSaveText = () => {
        if (text) {
            onSaveText(text); // Save the text and go back to the previous page
        } else {
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
