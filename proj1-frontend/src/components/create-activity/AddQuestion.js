import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AddQuestionForm = () => {
    const [questionDetails, setQuestionDetails] = useState({
        questionId: '',
        questionText: '',
        answer: '',
        options: [
            { text: '', explanation: '' },
            { text: '', explanation: '' },
            { text: '', explanation: '' },
            { text: '', explanation: '' }
        ]
    });

    const [role, setRole] = useState('')

    useEffect(() => {
        setRole(localStorage.getItem('role'))
    })


    const [menuChoice, setMenuChoice] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const [activityId, setActivityId] = useState(location.state?.activityId || null)

    const [chapterID, setChapterID] = useState(location.state?.chapterID || null)
    const [textbookId, setTextbookId] = useState(location.state?.textbookId || null)
    const [contentBlockID, setContentBlockID] = useState(location.state?.contentBlockID || null);
    const [sectionNumber, setSectionNumber] = useState(location.state?.sectionNumber || null);


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
                    "textbook_id": textbookId,
                    "chapter_name": chapterID,
                    "section_number": sectionNumber,
                    "content_name": contentBlockID,
                    "activity_number": activityId,
                    "question_name": questionDetails.questionId,
                    "question_text": questionDetails.questionText,
                    "option_1_text": questionDetails.options[0].text,
                    "option_1_explanation": questionDetails.options[0].explanation,
                    "option_2_text": questionDetails.options[1].text,
                    "option_2_explanation": questionDetails.options[1].explanation,
                    "option_3_text": questionDetails.options[2].text,
                    "option_3_explanation": questionDetails.options[2].explanation,
                    "option_4_text": questionDetails.options[3].text,
                    "option_4_explanation": questionDetails.options[3].explanation,
                    "answer": 2,
                }),

            })
                .then((response) => {
                    console.log(response)
                    alert("Question created")
                })
                .catch((error) => console.error(error));

        } else if (menuChoice === 2) {
            navigate(-1)
        } else if (menuChoice === 3) {
            navigate(`/${role}`)
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
                    </div>

                ))}
                <label>
                    Correct Answer:
                    <input
                        type="text"
                        value={questionDetails.answer}
                        onChange={(e) => setQuestionDetails({ ...questionDetails, answer: e.target.value })}
                        required
                    />
                </label>

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

                <button onClick={handleSave}>Submit</button>
            </form>
        </div>
    );
};

export default AddQuestionForm