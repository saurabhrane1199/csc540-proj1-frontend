import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { csrftoken } from '../csrftoken';

function Query() {
    const [data, setData] = useState(null);

    const navigate = useNavigate();

    const handleSelectedPage = (queryId) => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/query/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,  // CSRF token from the cookie
            },
            body: JSON.stringify({
                "query_number": parseInt(queryId),
            }),

        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setData(data.results)
            })
            .catch((error) => console.error(error));
    };



    const renderPage = () => {
        return (<p>{data?.map((dataVal, index) => (
            <p>{JSON.stringify(dataVal)}</p>
        ))}</p>)
    };

    return (
        <div>
            <h2>Menu</h2>
            <ul>
                <li onClick={() => handleSelectedPage("1")}>1. Number of Sections of the first chapter of a textbook</li>
                <li onClick={() => handleSelectedPage("2")}>2. Names of faculty and TAs of all courses. For each person print their role next to their names</li>
                <li onClick={() => handleSelectedPage("3")}>3. For each active course, print the course id, faculty member and total number of students </li>
                <li onClick={() => handleSelectedPage("4")}>4. Find the course which the largest waiting list, print the course id and the total number of people on the list</li>
                <li onClick={() => handleSelectedPage("5")}>5. Print the contents of Chapter 02 of textbook 101 in proper sequence.</li>
                <li onClick={() => handleSelectedPage("6")}>6. For Q2 of Activity0 in Sec02 of Chap01 in textbook 101, print the incorrect answers for that question and their corresponding explanations. </li>
                <li onClick={() => handleSelectedPage("7")}>7. Find any book that is in active status by one instructor but evaluation status by a different instructor.</li>
            </ul>
            <div className="page-content">
                {renderPage()}
            </div>
        </div>
    );
}

export default Query;