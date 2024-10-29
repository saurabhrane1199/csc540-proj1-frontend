import React, { useState } from "react";
import { csrftoken } from "../../csrftoken";
import { useNavigate } from 'react-router-dom';

function CreateETextbook({ onGoBack, onAddChapter }) {
  const [title, setTitle] = useState("");
  const [eTextbookID, setETextbookID] = useState("");
  const [showNextOption, setShowNextOption] = useState(false)

  const navigate = useNavigate();

  const handleDiscard = () => {
    // Clear the input fields
    setTitle("");
    setETextbookID("");
    onGoBack(); // Go back to Admin Landing Page
  };

  const handleAddChapter = () => {
    if (title && eTextbookID) {
      ; // Redirect to Add New Chapter page //TODO
      navigate("/create/chapter", { state: { textbookId: eTextbookID } })
    } else {
      alert("Please fill in all fields before proceeding.");
    }
  };

  const handleOnSubmit = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/textbooks/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,  // CSRF token from the cookie
      },
      credentials: 'include',
      body: JSON.stringify({
        "title": title,
        "textbook_id": eTextbookID,
      }),

    })
      .then((response) => {
        console.log(response)
        alert("Textbook created")
        setShowNextOption(true)
      })
      .catch((error) => console.error(error));
  }

  return (
    <div>
      <h3>Create E-textbook</h3>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <br />
      <label>
        Unique E-textbook ID:
        <input
          type="text"
          value={eTextbookID}
          onChange={(e) => setETextbookID(e.target.value)}
        />
      </label>
      <button onClick={handleOnSubmit}>Create</button>
      <br />
      {showNextOption ? <><button onClick={handleAddChapter}>1. Add New Chapter</button>
        <button onClick={handleDiscard}>2. Go Back</button></> : null}
    </div >
  );
}

export default CreateETextbook;
