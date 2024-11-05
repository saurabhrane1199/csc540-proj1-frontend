import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const StudentViewSection = () => {
    const [chapterID, setChapterID] = useState('');
    const [sectionID, setSectionID] = useState('');
    const [textbookID, setTextbookID] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    const [studentData, setStudentData] = useState(location.state?.studentData?.[0] || {})

    const filterOutStudentData = () => {
        let contentBlocks = [];
        studentData.textbooks.forEach((textbook) => {
            if (textbook.textbook_id == textbookID) {
                textbook.chapters.forEach((chapter) => {
                    if (chapter.chapter_name == chapterID) {
                        chapter.sections.forEach((section) => {
                            if (section.number == sectionID) {
                                contentBlocks.push(...section.content);
                            }
                        });
                    }
                });
            }
        });
        console.log(contentBlocks)
        return contentBlocks;

    }


    const handleMenuSelection = (option) => {
        setSelectedOption(option);

        if (option === 1) {
            alert(`Navigating to Chapter ${chapterID}, Section ${sectionID}`);
            navigate('/student/block', { state: { contentBlocks: filterOutStudentData() } })
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
                    A. TextBook ID:
                    <input
                        type="text"
                        value={textbookID}
                        onChange={(e) => setTextbookID(e.target.value)}
                        placeholder="Enter Chapter ID"
                    />
                </label>
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
