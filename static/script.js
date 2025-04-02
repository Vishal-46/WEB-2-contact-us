import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submittedData, setSubmittedData] = useState(
    JSON.parse(localStorage.getItem("contacts")) || []
  );
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSubmitted, setShowSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert("Please fill all fields!");
      return;
    }
    if (!email.includes("@")) {
      alert("Please enter a valid email!");
      return;
    }
    const newEntry = { name, email, message };
    const updatedData = [...submittedData, newEntry];
    setSubmittedData(updatedData);
    localStorage.setItem("contacts", JSON.stringify(updatedData));
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      setName("");
      setEmail("");
      setMessage("");
    }, 2000);
  };

  const toggleSubmitted = () => {
    setShowSubmitted(!showSubmitted);
  };

  return (
    <div className="container">
      <h2 className="header">Contact Us</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="field">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
        </div>
        <div className="field">
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
        </div>
        <div className="field">
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="textarea"
          />
        </div>
        <button type="submit" className="button">Submit</button>
      </form>
      {showConfirmation && (
        <div className="confirmation">
          <p className="confirmation-text">Thank you! Message submitted successfully.</p>
        </div>
      )}
      <button onClick={toggleSubmitted} className="toggle-button">
        {showSubmitted ? "Hide Submitted Data" : "Show Submitted Data"}
      </button>
      {showSubmitted && (
        <div className="submitted-section">
          <h3 className="submitted-header">Submitted Data</h3>
          {submittedData.length === 0 ? (
            <p className="no-data">No submissions yet.</p>
          ) : (
            <ul className="list">
              {submittedData.map((entry, index) => (
                <li key={index} className="list-item">
                  <strong>Name:</strong> {entry.name} <br />
                  <strong>Email:</strong> {entry.email} <br />
                  <strong>Message:</strong> {entry.message}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
