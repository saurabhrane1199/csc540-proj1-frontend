import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

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
    const location = useLocation();
    const [activityId, setActivityId] = useState(location.state?.activityId || null)


    const handleOptionChange = (index, field, value) => {
        const updatedOptions = [...questionDetails.options];
        updatedOptions[index][field] = value;
        setQuestionDetails({ ...questionDetails, options: updatedOptions });
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (menuChoice === 1) {
            fetch(`${process.env.REACT_APP_SERVER_URL}/questions/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    "activity_id": activityId,
                    "question_id": questionDetails.questionId,
                    "question_text": questionDetails.questionText,
                    "option_1_text": questionDetails.options[0].text,
                    "option_1_explanation": questionDetails.options[0].explanation,
                    "option_1_label": questionDetails.options[0].label === 'Correct',
                    "option_2_text": questionDetails.options[1].text,
                    "option_2_explanation": questionDetails.options[1].explanation,
                    "option_2_label": questionDetails.options[1].label === 'Correct',
                    "option_3_text": questionDetails.options[2].text,
                    "option_3_explanation": questionDetails.options[2].explanation,
                    "option_3_label": questionDetails.options[2].label === 'Correct',
                    "option_4_text": questionDetails.options[3].text,
                    "option_4_explanation": questionDetails.options[3].explanation,
                    "option_4_label": questionDetails.options[3].label === 'Correct',

                }),

            })
                .then((response) => {
                    console.log(response)
                    alert("Question created")
                })
                .catch((error) => console.error(error));

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

export default AddQuestionForm