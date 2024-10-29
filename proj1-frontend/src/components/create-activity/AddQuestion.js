import React, { useState } from 'react';

const AddQuestionForm = ({ onSave, onCancel, onLandingPage }) => {
    const [questionDetails, setQuestionDetails] = useState({
        questionId: '',
        questionText: '',
        options: [
            { text: '', explanation: '', label: 'Incorrect' },
            { text: '', explanation: '', label: 'Incorrect' },
            { text: '', explanation: '', label: 'Incorrect' },
            { text: '', explanation: '', label: 'Incorrect' }
        ]
    });
    const [menuChoice, setMenuChoice] = useState(null);

    const handleOptionChange = (index, field, value) => {
        const updatedOptions = [...questionDetails.options];
        updatedOptions[index][field] = value;
        setQuestionDetails({ ...questionDetails, options: updatedOptions });
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (menuChoice === 1) {
            onSave(questionDetails);
        } else if (menuChoice === 2) {
            onCancel();
        } else if (menuChoice === 3) {
            onLandingPage();
        }
    };

    return (
        <div>
            <h2>Add Question</h2>
            <form onSubmit={handleSave}>
                <label>
                    Question ID:
                    <input
                        type="text"
                        value={questionDetails.questionId}
                        onChange={(e) => setQuestionDetails({ ...questionDetails, questionId: e.target.value })}
                        required
                    />
                </label>

                <label>
                    Question Text:
                    <input
                        type="text"
                        value={questionDetails.questionText}
                        onChange={(e) => setQuestionDetails({ ...questionDetails, questionText: e.target.value })}
                        required
                    />
                </label>

                {questionDetails.options.map((option, index) => (
                    <div key={index}>
                        <h3>Option {index + 1}</h3>
                        <label>
                            Text:
                            <input
                                type="text"
                                value={option.text}
                                onChange={(e) => handleOptionChange(index, 'text', e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Explanation:
                            <input
                                type="text"
                                value={option.explanation}
                                onChange={(e) => handleOptionChange(index, 'explanation', e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Label:
                            <select
                                value={option.label}
                                onChange={(e) => handleOptionChange(index, 'label', e.target.value)}
                            >
                                <option value="Correct">Correct</option>
                                <option value="Incorrect">Incorrect</option>
                            </select>
                        </label>
                    </div>
                ))}

                <h3>Menu</h3>
                <p>1. Save</p>
                <p>2. Cancel</p>
                <p>3. Landing Page</p>

                <label>
                    Choose an option (1-3):
                    <input
                        type="number"
                        value={menuChoice}
                        onChange={(e) => setMenuChoice(Number(e.target.value))}
                        min="1"
                        max="3"
                        required
                    />
                </label>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};