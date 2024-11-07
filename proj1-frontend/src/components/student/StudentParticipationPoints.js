import React, { useState, useEffect } from 'react';
import { csrftoken } from '../../csrftoken';
import { useNavigate } from 'react-router-dom';

const Course = ({ course }) => (
    <div style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
        <h3>Course ID: {course.course_id}</h3>
        <p>Total Activities: {course.total_activities}</p>
        <p>Total Points: {course.total_points}</p>
    </div>
);

const StudentParticipationPoints = () => {
    const [points, setPoints] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        // Simulate fetching participation points when the component loads
        const fetchParticipationPoints = async () => {
            try {
                fetch(`${process.env.REACT_APP_SERVER_URL}/students/points/`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrftoken,  // CSRF token from the cookie
                    },
                    credentials: 'include',
                })
                    .then((result) => {
                        return result.json();
                    }).then((data) => {
                        console.log(data)
                        setPoints(data);
                    });
            } catch (error) {
                console.error('Error fetching data:', error);
            }

        };
        fetchParticipationPoints();
    }, []);

    return (
        <div>
            <h3>Participation Points</h3>
            <div style={{ padding: "20px" }}>
                {points?.map((course, index) => (
                    <Course key={index} course={course} />
                ))}
            </div>

            <div className="menu">
                <p>Menu:</p>
                <button onClick={() => navigate("/student")}>
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default StudentParticipationPoints;
