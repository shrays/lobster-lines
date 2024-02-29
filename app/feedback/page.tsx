'use client'

import './feedback.css';
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

  return (
    <>
      <h1>Feedback Form</h1>
      <p className='description'>
        Have a question? Suggestion? Bug Report? Something Else?<br />Let me know and I'll try to respond (if you leave your email).
      </p>
      <form id="feedback-form" action="https://api.sheetmonkey.io/form/2G6YLnabhn8kxuWR7WJzrh" method="POST">
        <input className="input_field" type="text" placeholder="Name" name="name" id="fname" />
        <input className="input_field" type="email" placeholder="Email Address" name="email" id="email" />
        <select className="input_field" name="responsetype" id="responsetype" onChange={handleSelectChange} style={{ color: selectColor }} defaultValue="">
          <option disabled value="">Select an Option*</option>
          <option value="suggestion">Suggestion</option>
          <option value="bug">Bug Report</option>
          <option value="question">Question</option>
          <option value="feedback">Other</option>
        </select>
        <textarea className="input_field" placeholder="Your Feedback*" name="feedback" id="yourfeedback" required></textarea>
        <input className="btn" type="submit" value="Submit" disabled={!isValidForm} />
      </form>
    </>
  );
}
