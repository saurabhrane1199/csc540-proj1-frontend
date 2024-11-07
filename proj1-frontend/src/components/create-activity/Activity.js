import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const ActivityForm = () => {

    const [activityId, setActivityId] = useState('');
    const [menuChoice, setMenuChoice] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    const [chapterID, setChapterID] = useState(location.state?.chapterID || null)
    const [textbookId, setTextbookId] = useState(location.state?.textbookId || null)
    const [contentBlockID, setContentBlockID] = useState(location.state?.contentBlockID || null);
    const [sectionNumber, setSectionNumber] = useState(location.state?.sectionNumber || null);


    const handleAddQuestion = () => {
        navigate("/create/content/activity/question", { state: { chapterID: chapterID, textbookId: textbookId, sectionNumber: sectionNumber, contentBlockID: contentBlockID, activityId: activityId } })
    };

    const handleGoBack = () => {
        console.log('Going back to the previous page...');
        navigate(-1)
    };

    const handleLandingPage = () => {
        console.log('Redirecting to Landing Page...');
        navigate(-1)
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_SERVER_URL}/activities/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                "activity_number": activityId,
                "content_name": contentBlockID,
                "section_number": sectionNumber,
                "chapter_name": chapterID,
                "textbook_id": textbookId,
                "hidden": false
            }),

        })
            .then((response) => {
                console.log(response)
                if (!response.ok) {
                    alert("Error Occured")
                    return
                }
                alert("Activity created")
            })
            .catch((error) => console.error(error));



        if (menuChoice === 1) {
            handleAddQuestion();
        } else if (menuChoice === 2) {
            handleGoBack();
        } else if (menuChoice === 3) {
            handleLandingPage();
        }
    };

    return (
        <div>
            <h2>Add Activity</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Unique Activity ID:
                    <input
                        type="text"
                        value={activityId}
                        onChange={(e) => setActivityId(e.target.value)}
                        required
                    />
                </label>

                <h3>Menu</h3>
                <p>1. Add Question</p>
                <p>2. Go Back</p>
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



export default ActivityForm;