import React, { useState, useEffect } from 'react';

const StudentParticipationPoints = () => {
    const [points, setPoints] = useState(null);

    useEffect(() => {
        // Simulate fetching participation points when the component loads
        const fetchParticipationPoints = async () => {
            setPoints(fetchedPoints);

        };
        fetchParticipationPoints();
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
