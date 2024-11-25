import React, { useState } from "react";
import './ClientRatingForm.css'; // Make sure the CSS file is linked correctly

const ClientRatingForm = () => {
    const [rating, setRating] = useState(0);
    const [submitted, setSubmitted] = useState(false);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setSubmitted(true);
      console.log("Rating:", rating);
    };
  
    return (
      <div className="rating-form-container">
        <div className="rating-form-content">
          <h2 className="rating-form-title">Rate Our Stall</h2>
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <div className="rating-buttons">
                {[1, 2, 3, 4, 5].map((value) => (
                  <span key={value} className="rating-button">
                    <input
                      type="radio"
                      id={`rating-${value}`}
                      name="rating"
                      value={value}
                      onChange={() => setRating(value)}
                      className="rating-input"
                    />
                    <label htmlFor={`rating-${value}`} className="rating-label">
                      {value}
                    </label>
                  </span>
                ))}
              </div>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          ) : (
            <div className="thank-you-message">
              <h3 className="thank-you-title">Thank you for your rating!</h3>
              <p className="thank-you-rating">Your Rating: {rating}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

export default ClientRatingForm;