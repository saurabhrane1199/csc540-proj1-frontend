import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChangePasswordPage = () => {
    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    // Function to handle password update
    const handleUpdatePassword = () => {
        if (newPassword !== confirmPassword) {
            setMessage('Failure: New passwords do not match.');
        } else if (currentPassword && newPassword) {
            fetch(`${process.env.REACT_APP_SERVER_URL}/changepassword/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    "current_password": currentPassword,
                    "new_password": newPassword
                }),

            })
                .then((response) => {
                    console.log(response)
                    if (response.ok) {
                        alert("Password Changed")
                    } else {
                        return
                    }

                })
                .catch((error) => console.error(error));

            setMessage('Success: Password updated successfully.');
            setTimeout(() => navigate('/logout'), 2000); // Redirect after 2 seconds
        } else {
            setMessage('Failure: Please fill in all fields.');
        }
    };

    // Function to handle the "Go Back" option
    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <h1>Change Password</h1>

            <div>
                <label>
                    Enter Current Password:
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </label>
            </div>

            <div>
                <label>
                    Enter New Password:
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </label>
            </div>

            <div>
                <label>
                    Confirm New Password:
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </label>
            </div>

            <h2>Menu</h2>
            <ol>
                <li onClick={handleUpdatePassword}>Update</li>
                <li onClick={handleGoBack}>Go Back</li>
            </ol>

            {message && <p>{message}</p>}
        </div>
    );
};

export default ChangePasswordPage;
