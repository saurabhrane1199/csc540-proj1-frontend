import React, { useState } from 'react';

const ActivityForm = ({ onAddQuestion, onGoBack, onLandingPage }) => {
    const [activityId, setActivityId] = useState('');
    const [menuChoice, setMenuChoice] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (menuChoice === 1) {
            onAddQuestion();
        } else if (menuChoice === 2) {
            onGoBack();
        } else if (menuChoice === 3) {
            onLandingPage();
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

const App = () => {
    const handleAddQuestion = () => {
        console.log('Redirecting to Add Question page...');
        // Implement Add Question page navigation
    };

    const handleGoBack = () => {
        console.log('Going back to the previous page...');
        // Implement Go Back functionality
    };

    const handleLandingPage = () => {
        console.log('Redirecting to Landing Page...');
        // Implement Landing Page navigation
    };

    return (
        <ActivityForm
            onAddQuestion={handleAddQuestion}
            onGoBack={handleGoBack}
            onLandingPage={handleLandingPage}
        />
    );
};

export default App;