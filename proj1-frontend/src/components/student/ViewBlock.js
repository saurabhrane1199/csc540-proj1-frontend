import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { csrftoken } from '../../csrftoken';

// Mock data for blocks (you can replace this with actual data)
// const blocks = [
//     { id: 1, type: 'content', content: 'This is content for Block 1.' },
//     { id: 2, type: 'activity', content: 'This is a question for Block 2.', options: ['A', 'B', 'C', 'D'], correctAnswer: 'B', explanation: 'Explanation for the correct answer.' },
//     { id: 3, type: 'content', content: 'This is content for Block 3.' },
// ];

const StudentViewBlock = () => {
    const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState({});
    const [userAnswerSubmitted, setUserAnswerSubmitted] = useState({});
    const [showExplanation, setShowExplanation] = useState(false);

    const navigate = useNavigate();

    const location = useLocation();

    const [blocks, setBlocks] = useState(location.state?.contentBlocks || [])
    const [chapterID, setChapterID] = useState(location.state?.chapterID || [])
    const [sectionID, setSectionID] = useState(location.state?.sectionID || [])
    const [textbookID, setTextbookID] = useState(location.state?.textbookID || [])
    const [courseID, setCourseID] = useState(location.state?.courseID || [])

    const currentBlock = blocks[currentBlockIndex];

    const renderActivity = (activities) => {
        return (
            activities.map((activity, activityIndex) => (
                <div key={activityIndex}>
                    <p>{activity.activity_number}</p>
                    <p>Question {activity.question.question_text}</p>
                    <p>Please select the correct answer:</p>
                    {activity.question.options.map((option, index) => (
                        <div key={index}>
                            <label>
                                <input
                                    type="radio"
                                    value={option.option}
                                    name={`option-${activityIndex}`}
                                    checked={userAnswer?.[activityIndex] == option.option}
                                    onChange={(e) => setUserAnswer((prevDetails) => ({ ...prevDetails, [activityIndex]: e.target.value }))}
                                />
                                {`${option.option} : ${option.text}`}
                            </label>
                            {showExplanation && (
                                <div className="explanation">
                                    <p>Explanation: {option.explanation}</p>
                                    <p>Score: {userAnswer === activity.question.answer ? "1" : "0"}</p>
                                </div>
                            )}
                        </div>
                    ))}
                    <button disabled={userAnswerSubmitted?.[activityIndex] || false} onClick={() => handleMenuSelection(1, activityIndex)}>
                        {currentBlock.type === 'content' ? 'Next' : 'Next/Submit'}
                    </button>
                </div>
            ))
        );
    };

    const renderPage = (block) => {
        switch (block.block_type) {
            case "text":
                return <p>{block.text_data}</p>;
            case "image":
                return <img src={block.image_data}></img>;
            case "":
                return renderActivity(block.activities)
        }
    };

    const handleMenuSelection = (option, activityIndex) => {
        if (option === 1) {
            if (currentBlock.block_type === '' && userAnswer[activityIndex] != currentBlock.activities[activityIndex].question.answer) {
                alert("Incorrect answer. Please try again or view the explanation.");
                setShowExplanation(true);
                return;
            }

            if (currentBlockIndex < blocks.length - 1) {
                if (currentBlock.block_type === '') {
                    userAnswerSubmitted[activityIndex] = true

                    fetch(`${process.env.REACT_APP_SERVER_URL}/students/submit_activity/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRFToken': csrftoken,  // CSRF token from the cookie
                        },
                        credentials: 'include',
                        body: JSON.stringify({

                            "course_id": courseID,
                            "textbook_id": textbookID,      //provided by user
                            "section_id": sectionID, //provided by user
                            "content_id": currentBlock.content_name,   //default: False
                            "activities": [{
                                "activity_number": currentBlock.activities[activityIndex].activity_number,
                                "question_id": currentBlock.activities[activityIndex].question.question_name,
                                "option_selected": parseInt(userAnswer[activityIndex]),
                                "correct_ans": parseInt(currentBlock.activities[activityIndex].question.answer),
                                "attempted": true
                            }]

                        }),

                    })
                        .then((response) => {
                            const data = response.json()
                            return data
                        })
                        .then((data) => {
                            console.log(data)
                            alert("Section created")
                        })
                        .catch((error) => console.error(error));

                }
                setCurrentBlockIndex(currentBlockIndex + 1);
                setUserAnswer('');
                setShowExplanation(false);
            } else {
                if (currentBlock.block_type === '') {
                    userAnswerSubmitted[activityIndex] = true
                    fetch(`${process.env.REACT_APP_SERVER_URL}/students/submit_activity/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRFToken': csrftoken,  // CSRF token from the cookie
                        },
                        credentials: 'include',
                        body: JSON.stringify({

                            "course_id": courseID,
                            "textbook_id": textbookID,      //provided by user
                            "section_id": sectionID, //provided by user
                            "chapter_id": chapterID,
                            "content_id": currentBlock.content_name,   //default: False
                            "activities": [{
                                "activity_number": currentBlock.activities[activityIndex].activity_number,
                                "question_id": currentBlock.activities[activityIndex].question.question_id,
                                "option_selected": parseInt(userAnswer[activityIndex]),
                                "correct_ans": parseInt(currentBlock.activities[activityIndex].question.answer),
                                "attempted": true
                            }]

                        }),

                    })
                        .then((response) => {
                            const data = response.json()
                            return data
                        })
                        .then((data) => {
                            console.log(data)
                            alert("Section created")
                        })
                        .catch((error) => console.error(error));
                }
                alert("End of blocks. Returning to the landing page.");
                navigate('/student')

            }
        } else if (option === 2) {
            alert("Returning to the previous page.");
            navigate(-1)
        }
    };



    return (
        <div>
            <h2>View Block</h2>
            <div className="block-content">
                {renderPage(currentBlock)}
            </div>

            <div className="menu">
                <p>Menu:</p>
                <button onClick={() => handleMenuSelection(1, null)}>
                    {currentBlock.type === 'content' ? 'Next' : 'Next/Submit'}
                </button>
                <button onClick={() => handleMenuSelection(2, null)}>Go Back</button>
            </div>
        </div>
    );
};

export default StudentViewBlock;
