import React, { useState } from 'react';

// Mock function to simulate saving to a database
const saveToDatabase = (record) => {
    console.log("Record saved:", record);
};

const StudentLanding = () => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleMenuSelection = (option) => {
        setSelectedOption(option);

        if (option === 1) {
            saveToDatabase("Viewed a section");
            alert("Record saved. Returning to previous page.");
            setSelectedOption(null); // Reset to go back to the previous page
        } else if (option === 2) {
            alert("Participation activity points viewed. Returning to previous page.");
            setSelectedOption(null);
        } else if (option === 3) {
            alert("Logging out. Redirecting to User Landing Page.");
            setSelectedOption(null);
            // Redirect or handle logout logic here
        }
    };

    return (
        <div>
            <h2>Student Landing</h2>
            <div className="content">
                <p>E-book 1</p>
                <ul>
                    <li>Chapter 1
                        <ul>
                            <li>Section 1
                                <ul>
                                    <li>Block 1</li>
                                </ul>
                            </li>
                            <li>Section 2
                                <ul>
                                    <li>Block 2</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>Chapter 2
                        <ul>
                            <li>Section 1
                                <ul>
                                    <li>Block 1</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>

            <div className="menu">
                <p>Menu:</p>
                <button onClick={() => handleMenuSelection(1)}>1. View a section</button>
                <button onClick={() => handleMenuSelection(2)}>2. View participation activity point</button>
                <button onClick={() => handleMenuSelection(3)}>3. Logout</button>
            </div>
        </div>
    );
};

export default StudentLanding;
