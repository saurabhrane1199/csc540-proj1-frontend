import React, { useState, useEffect } from 'react';

// Mock function to simulate fetching participation points from a database
const fetchParticipationPoints = () => {
    return 85; // Example participation points, replace with actual data fetch logic if needed
};

const StudentParticipationPoints = () => {
    const [points, setPoints] = useState(null);

    useEffect(() => {
        // Simulate fetching participation points when the component loads
        const fetchedPoints = fetchParticipationPoints();
        setPoints(fetchedPoints);
    }, []);

    return (
        <div>
            <h2>Participation Activity Points</h2>
            {points !== null ? (
                <p>Your current participation points: {points}</p>
            ) : (
                <p>Loading...</p>
            )}

            <div className="menu">
                <p>Menu:</p>
                <button onClick={() => alert("Returning to the landing page.")}>
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default StudentParticipationPoints;
