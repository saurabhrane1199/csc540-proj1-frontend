import React from 'react';
import './AdminLandingPage.css'
import CreateFacultyAccount from '../create-accounts/CreateFacultyAccount';
import CreateETextbook from '../create-textbook/CreateETextbook';
import { useState } from 'react';

function AdminLandingPage() {
    const [selectedPage, setSelectedPage] = useState(null);

    const handleGoBack = () => {
        setSelectedPage(null);
    };

    

    const renderPage = () => {
        switch (selectedPage) {
            case "1":
                return <CreateFacultyAccount onGoBack={handleGoBack} />;
            case "2":
                return <CreateETextbook onGoBack={handleGoBack} />;
            // case "3":
            //     return <ModifyETextbooks />;
            // case "4":
            //     return <ActiveCourse />;
            // case "5":
            //     return <EvaluationCourse />;
            case "6":
                return <div>Logging out... Returning to Home page.</div>;
            default:
                return <div>Select a menu option</div>;
        }
    };

    return (
        <div>
            <h2>Menu</h2>
            <ul>
                <li onClick={() => setSelectedPage("1")}>1. Create a Faculty Account</li>
                <li onClick={() => setSelectedPage("2")}>2. Create E-textbook</li>
                <li onClick={() => setSelectedPage("3")}>3. Modify E-textbooks</li>
                <li onClick={() => setSelectedPage("4")}>4. Create New Active Course</li>
                <li onClick={() => setSelectedPage("5")}>5. Create New Evaluation Course</li>
                <li onClick={() => setSelectedPage("6")}>6. Logout</li>
            </ul>
            <div className="page-content">
                {renderPage()}
            </div>
        </div>
    );
}

export default AdminLandingPage;