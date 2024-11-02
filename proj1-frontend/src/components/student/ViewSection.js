import React, { useState } from 'react';

const StudentViewSection = () => {
    const [chapterID, setChapterID] = useState('');
    const [sectionID, setSectionID] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);

    const handleMenuSelection = (option) => {
        setSelectedOption(option);

        if (option === 1) {
            alert(`Navigating to Chapter ${chapterID}, Section ${sectionID}`);
            // Navigate to the appropriate page or display the content for Chapter and Section
            setSelectedOption(null); // Reset to go back to the previous page after action
        } else if (option === 2) {
            alert("Going back to the landing page.");
            setChapterID('');
            setSectionID('');
            setSelectedOption(null);
            // Go back to the landing page logic can go here
        }
    };

    return (
        <div>
            <h2>View Section</h2>
            <div className="input-section">
                <label>
                    A. Chapter ID:
                    <input
                        type="text"
                        value={chapterID}
                        onChange={(e) => setChapterID(e.target.value)}
                        placeholder="Enter Chapter ID"
                    />
                </label>
                <br />
                <label>
                    B. Section ID:
                    <input
                        type="text"
                        value={sectionID}
                        onChange={(e) => setSectionID(e.target.value)}
                        placeholder="Enter Section ID"
                    />
                </label>
            </div>

            <div className="menu">
                <p>Menu:</p>
                <button onClick={() => handleMenuSelection(1)}>1. View Block</button>
                <button onClick={() => handleMenuSelection(2)}>2. Go Back</button>
            </div>
        </div>
    );
};

export default StudentViewSection;
