import React, { useState } from "react";
import { csrftoken } from "../../csrftoken";
import { useNavigate } from 'react-router-dom';
import './CreateETextbook.css'

function CreateETextbook({ onGoBack, isModifyEnabled }) {
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

  const handleAddChapter = (isModifyChapter) => {
    if (eTextbookID) {
      ; // Redirect to Add New Chapter page //TODO
      navigate("/create/chapter", { state: { textbookId: eTextbookID, isModifyChapter: isModifyChapter } })
    } else {
      alert("Please fill in all fields before proceeding.");
    }
  };

  const handleOnSubmit = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/textbooks/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
      <h3>{!isModifyEnabled ? <span>Create</span> : <span>Modify</span>} E-textbook</h3>
      {!isModifyEnabled ? <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label> : null}
      <br />
      <label>
        Unique E-textbook ID:
        <input
          type="text"
          value={eTextbookID}
          onChange={(e) => setETextbookID(e.target.value)}
        />
      </label>
      {!isModifyEnabled ? <button onClick={handleOnSubmit}>Create</button> : null}
      <br />
      {showNextOption || isModifyEnabled ? <>
        <button onClick={() => handleAddChapter(false)}>Add New Chapter</button>
        {isModifyEnabled ? < button onClick={() => handleAddChapter(isModifyEnabled)}>Modify New Chapter</button> : null}
        <button onClick={handleDiscard}>Go Back</button></> : null
      }
    </div >
  );
}

export default CreateETextbook;
