import React, { useEffect, useState } from 'react';
import { csrftoken } from '../../csrftoken';
import { useNavigate } from 'react-router-dom';

// Mock function to simulate saving to a database
const saveToDatabase = (record) => {
    console.log("Record saved:", record);
};

const ContentBlock = ({ block }) => {
    return (
        <div className="content-block">
            <h5>{block.content_name}</h5>
            {block.block_type === 'text' && <p>{block.text_data}</p>}
            {block.block_type === 'image' && <img src={`${process.env.REACT_APP_SERVER_URL}${block.image_data}`}></img>}
            {block.block_type === 'activities' && <p>Activity</p>}
        </div>
    );
};

// Section Component
const Section = ({ section }) => {
    return (
        <div className="section">
            <h4>{section.title}</h4>
            {section.content.map((block) => (
                <ContentBlock key={block.content_id} block={block} />
            ))}
        </div>
    );
};

// Chapter Component
const Chapter = ({ chapter }) => {
    return (
        <div className="chapter">
            <h3>{chapter.title}</h3>
            {chapter.sections.map((section) => (
                <Section key={section.section_id} section={section} />
            ))}
        </div>
    );
};

// Textbook Component
const Textbook = ({ textbook }) => {
    return (
        <div className="textbook">
            <h2>{textbook.title}</h2>
            {textbook.chapters.map((chapter) => (
                <Chapter key={chapter.chapter_id} chapter={chapter} />
            ))}
        </div>
    );
};

// Main Course Component
const Course = ({ course }) => {
    return (
        <div className="course">
            <h1>{course.course_name}</h1>
            {course.textbooks.map((textbook) => (
                <Textbook key={textbook.textbook_id} textbook={textbook} />
            ))}
        </div>
    );
};



const StudentLanding = () => {
    const [selectedOption, setSelectedOption] = useState(null);

    const [data, setData] = useState(null)

    const navigate = useNavigate();

    useEffect(() => {

        let role = localStorage.getItem("role")
        if (role != "student") {
            navigate(`/${role}`)
        }

        const fetchData = async () => {
            try {
                fetch(`${process.env.REACT_APP_SERVER_URL}/students/home/`, {
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
                        setData(data);
                    });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the function to fetch data
        fetchData();

    }, [])

    const handleMenuSelection = (option) => {
        setSelectedOption(option);

        if (option === 1) {
            navigate("/student/section", { state: { studentData: data.courses } })
        } else if (option === 2) {
            navigate("/student/points")
            setSelectedOption(null);
        } else if (option === 3) {
            alert("Logging out. Redirecting to User Landing Page.");
            setTimeout(() => navigate("/logout"), 2000)
            // Redirect or handle logout logic here
        }
    };

    return (
        <div>
            <h2>Student Landing</h2>
            <div className="app">
                {data?.courses.map((course, index) => (
                    <Course key={index} course={course} />
                ))}
            </div>

            <div className="menu">
                <p>Menu:</p>
                <button onClick={() => handleMenuSelection(1)}>1. View a section</button>
                <button onClick={() => handleMenuSelection(2)}>2. View participation activity point</button>
                <button onClick={() => handleMenuSelection(3)}>3. Logout</button>
            </div>
        </div>
    );
};

export default StudentLanding;
