'use client'

import './feedback.css'
import React, { useState } from 'react';

export default function FeedbackPage() {
  const [selectColor, setSelectColor] = useState('#858585');
  const [isValidForm, setIsValidForm] = useState(false);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === "") {
      setSelectColor('#858585');
      setIsValidForm(false);
    } else {
      setSelectColor('inherit');
      setIsValidForm(true);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const feedbackElement = document.getElementById('yourfeedback');
    const feedbackValue = feedbackElement ? (feedbackElement as HTMLInputElement).value : '';

  
    if (!isValidForm || !feedbackValue) {
      event.preventDefault();
  
      if (!feedbackValue) {
        alert("Please fill in your feedback before submitting.");
      } else if (!isValidForm) {
        alert("Please select a valid option before submitting.");
      }
    }
  };

  return (
    <>
      <h1>Feedback Form</h1>
      <p className='description'>
        Have a question? Suggestion? Bug Report? Something Else?<br />Let me know and I'll try to respond (if you leave your email).
      </p>
      <form id="feedback" onSubmit={handleSubmit}>
        <input className="input_field" type="text" placeholder="Name" id="fname" />
        <input className="input_field" type="email" placeholder="Email Address" id="email" />
        <select className="input_field" id="responsetype" onChange={handleSelectChange} style={{ color: selectColor }}>
          <option disabled selected value="">Select an Option*</option>
          <option value="suggestion">Suggestion</option>
          <option value="bug">Bug Report</option>
          <option value="question">Question</option>
          <option value="feedback">Other</option>
        </select>
        <textarea className="input_field" placeholder="Your Feedback*" id="yourfeedback" required></textarea>
        <input className="btn" type="submit" disabled={!isValidForm} />
    </form>
    </>
  )
}
