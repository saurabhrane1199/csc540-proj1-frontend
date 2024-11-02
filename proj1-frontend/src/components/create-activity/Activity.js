import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const ActivityForm = () => {

    const [activityId, setActivityId] = useState('');
    const [menuChoice, setMenuChoice] = useState(null);
    const [contentBlockID, setcontentID] = useState("Block01") //TODO

    const navigate = useNavigate();

    const handleAddQuestion = () => {
        navigate("/create/content/activity/question", { state: { activityId: activityId } })
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
                "activity_id": activityId,
                " ": contentBlockID
            }),

        })
            .then((response) => {
                console.log(response)
                alert("Textbook created")
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