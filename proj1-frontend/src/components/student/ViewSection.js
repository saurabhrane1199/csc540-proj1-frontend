import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const StudentViewSection = () => {
    const [chapterID, setChapterID] = useState('');
    const [sectionID, setSectionID] = useState('');
    const [textbookID, setTextbookID] = useState('');
    const [courseID, setCourseID] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);


    const navigate = useNavigate();
    const location = useLocation();

    const [studentData, setStudentData] = useState(location.state?.studentData || {})


    const filterOutStudentData = () => {
        let contentBlocks = [];
        studentData.forEach((course) => {
            if (course.course_id == courseID) {
                console.log("Inside Textbook")
                course.textbooks.forEach((textbook) => {
                    if (textbook.textbook_id == textbookID) {
                        console.log("Inside Textbook")
                        textbook.chapters.forEach((chapter) => {
                            if (chapter.chapter_name == chapterID) {
                                console.log("Inside Chapter")
                                chapter.sections.forEach((section) => {
                                    if (section.number == sectionID) {
                                        console.log("Inside Block")
                                        contentBlocks.push(...section.content);
                                    }
                                });
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
            navigate('/student/block', { state: { courseID: courseID, chapterID: chapterID, sectionID: sectionID, textbookID: textbookID, contentBlocks: filterOutStudentData() } })
            setSelectedOption(null); // Reset to go back to the previous page after action
        } else if (option === 2) {
            alert("Going back to the landing page.");
            setChapterID('');
            setSectionID('');
            setSelectedOption(null);
            navigate(-1)
            // Go back to the landing page logic can go here
        }
    };

    return (
        <div>
            <h2>View Section</h2>
            <div className="input-section">
                <label>
                    A. Course ID:
                    <input
                        type="text"
                        value={courseID}
                        onChange={(e) => setCourseID(e.target.value)}
                        placeholder="Enter Course ID"
                    />
                </label>
                <label>
                    B. TextBook ID:
                    <input
                        type="text"
                        value={textbookID}
                        onChange={(e) => setTextbookID(e.target.value)}
                        placeholder="Enter Textbook ID"
                    />
                </label>
                <label>
                    C. Chapter ID:
                    <input
                        type="text"
                        value={chapterID}
                        onChange={(e) => setChapterID(e.target.value)}
                        placeholder="Enter Chapter ID"
                    />
                </label>
                <br />
                <label>
                    D. Section ID:
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
