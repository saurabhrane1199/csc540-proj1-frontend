import React, { useState } from 'react';

// Mock data for blocks (you can replace this with actual data)
const blocks = [
    { id: 1, type: 'content', content: 'This is content for Block 1.' },
    { id: 2, type: 'activity', content: 'This is a question for Block 2.', options: ['A', 'B', 'C', 'D'], correctAnswer: 'B', explanation: 'Explanation for the correct answer.' },
    { id: 3, type: 'content', content: 'This is content for Block 3.' },
];

const StudentViewBlock = () => {
    const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [showExplanation, setShowExplanation] = useState(false);

    const currentBlock = blocks[currentBlockIndex];

    const handleMenuSelection = (option) => {
        if (option === 1) {
            if (currentBlock.type === 'activity' && userAnswer !== currentBlock.correctAnswer) {
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
                // Logic to go back to the landing page can be added here
            }
        } else if (option === 2) {
            alert("Returning to the previous page.");
            // Logic to return to the previous page
        }
    };

    return (
        <div>
            <h2>View Block</h2>
            <div className="block-content">
                {currentBlock.type === 'content' ? (
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
                )}
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
