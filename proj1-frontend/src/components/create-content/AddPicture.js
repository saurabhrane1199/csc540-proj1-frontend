import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AddPicture() {
    const [picture, setPicture] = useState(null);
    const navigate = useNavigate()
    const location = useLocation()


    const [chapterID, setChapterID] = useState(location.state?.chapterID || null)
    const [textbookId, setTextbookId] = useState(location.state?.textbookId || null)
    const [contentBlockID, setContentBlockID] = useState(location.state?.contentBlockID || null);
    const [sectionNumber, setSectionNumber] = useState(location.state?.sectionNumber || null);

    const handlePictureChange = (e) => {
        setPicture(e.target.files[0]);
    };

    const handleDiscardAndGoBack = () => {
        setPicture(null); // Clear the picture and go back to the previous page
        navigate(-1)

    };

    const handleDiscardAndGoLandingPage = () => {
        setPicture(null); // Clear the picture and go to the landing page
        navigate(-1)

    };

    const handleSavePicture = () => {
        if (picture) {
            const formdata = new FormData();
            formdata.append("image_data", picture);
            formdata.append("section_number", sectionNumber);
            formdata.append("chapter_name", chapterID);
            formdata.append("textbook_id", textbookId);

            const requestOptions = {
                method: "POST",
                body: formdata,
                redirect: "follow",
                credentials: 'include',
            };

            // Make the fetch call
            fetch(`${process.env.REACT_APP_SERVER_URL}/contents/${contentBlockID}/image/`, requestOptions)
                .then((response) => response.text())
                .then((result) => {
                    console.log(result);
                })
                .catch((error) => console.error("Error:", error));
        } else {
            alert("Please upload a picture before saving.");
        }
    };

    return (
        <div>
            <h3>Add Picture</h3>
            <label>
                Picture:
                <input type="file" accept="image/*" onChange={handlePictureChange} />
            </label>
            <br />
            <button onClick={handleSavePicture}>1. Add</button>
            <button onClick={handleDiscardAndGoBack}>2. Go Back</button>
            <button onClick={handleDiscardAndGoLandingPage}>3. Landing Page</button>
        </div>
    );
}

export default AddPicture;