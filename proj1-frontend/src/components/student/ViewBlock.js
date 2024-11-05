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
    const [userAnswer, setUserAnswer] = useState(1);
    const [showExplanation, setShowExplanation] = useState(false);

    const navigate = useNavigate();

    const location = useLocation();

    const [blocks, setBlocks] = useState(location.state?.contentBlocks || [])

    const currentBlock = blocks[currentBlockIndex];

    const renderActivity = (activity) => {
        return (<div>
            <p>{activity.activity_number}</p>
            <p>Question {activity.question.question_text}</p>
            <p>Please select the correct answer:</p>
            {activity.question.options.map((option, index) => (
                <div key={index}>
                    <label>
                        <input
                            type="radio"
                            value={option.option}
                            name="option"
                            checked={userAnswer == option.option}
                            onChange={(e) => setUserAnswer(e.target.value)}
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

        </div>)

    }

    const renderPage = (block) => {
        switch (block.block_type) {
            case "text":
                return <p>{block.text_data}</p>;
            case "image":
                return <img src={block.image_data}></img>;
            case "":
                return renderActivity(block.activities[0])
        }
    };

    const handleMenuSelection = (option) => {
        if (option === 1) {
            if (currentBlock.type === '' && userAnswer !== currentBlock.correctAnswer) {
                alert("Incorrect answer. Please try again or view the explanation.");
                setShowExplanation(true);
                return;
            }

            if (currentBlockIndex < blocks.length - 1) {
                setCurrentBlockIndex(currentBlockIndex + 1);
                setUserAnswer('');
                setShowExplanation(false);
            } else {
                alert("End of blocks. Returning to the landing page.");
                navigate('/student')
                // Logic to go back to the landing page can be added here
            }
        } else if (option === 2) {
            alert("Returning to the previous page.");
            navigate(-1)
            // Logic to return to the previous page
        }
    };



    return (
        <div>
            <h2>View Block</h2>
            <div className="block-content">
                {/* {currentBlock.type === 'content' ? (
                    <div>
                        <p>{currentBlock.content}</p>
                    </div>
                ) : (
                    <div>
                        <p>{currentBlock.content}</p>
                        <p>Please select the correct answer:</p>
                        {currentBlock.options.map((option, index) => (
                            <div key={index}>
                                <label>
                                    <input
                                        type="radio"
                                        value={option}
                                        checked={userAnswer === option}
                                        onChange={(e) => setUserAnswer(e.target.value)}
                                    />
                                    {option}
                                </label>
                            </div>
                        ))}
                        {showExplanation && (
                            <div className="explanation">
                                <p>Explanation: {currentBlock.explanation}</p>
                                <p>Score: {userAnswer === currentBlock.correctAnswer ? "1" : "0"}</p>
                            </div>
                        )}
                    </div>
                )} */}
                {renderPage(currentBlock)}
            </div>

            <div className="menu">
                <p>Menu:</p>
                <button onClick={() => handleMenuSelection(1)}>
                    {currentBlock.type === 'content' ? 'Next' : 'Next/Submit'}
                </button>
                <button onClick={() => handleMenuSelection(2)}>Go Back</button>
            </div>
        </div>
    );
};

export default StudentViewBlock;
