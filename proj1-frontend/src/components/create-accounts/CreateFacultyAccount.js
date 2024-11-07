import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiUrl from "../../env";

function CreateFacultyAccount({ onGoBack }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        let role = localStorage.getItem("role")
        if (role != "admin") {
            navigate(`/${role}`)
        }
    })

    const handleSubmit = async () => {
        // Mock API call to save the faculty account
        const newFaculty = { first_name: firstName, last_name: lastName, email: email, password: password };
        try {
            const response = await fetch(`${apiUrl}/createfaculty/`, { //TODO
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newFaculty),
                credentials: 'include'
            });
            if (response.ok) {
                alert("Faculty account created successfully!");
                onGoBack(); // Go back to Admin Landing Page
            } else {
                alert("Error creating account. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    };

    const handleDiscard = () => {
        // Clear the input fields
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        onGoBack(); // Go back to Admin Landing Page
    };

    return (
        <div>
            <h3>Create Faculty Account</h3>
            <label>
                First Name:
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </label>
            <br />
            <label>
                Last Name:
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </label>
            <br />
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <br />
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <br />
            <button onClick={handleSubmit}>1. Add User</button>
            <button onClick={handleDiscard}>2. Go Back</button>
        </div>
    );
}

export default CreateFacultyAccount;