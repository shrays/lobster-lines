import './feedback.css'

export default function FeedbackPage() {
  return (
    <>
      <h1>Feedback Form</h1>
      <p>
        This page is intended to verify that Redux state is persisted across
        page navigations.
      </p>
      <form id="myform">
        <div className="input_field">
            <input type="text" placeholder="First Name" id="fname" />
        </div>
        <div className="input_field">
            <input type="text" placeholder="Last Name" id="lname" />
        </div>
        <div className="input_field">
            <input type="text" placeholder="Phone" id="phone" />
        </div>
        <div className="input_field">
            <input type="text" placeholder="Email" id="email" />
        </div>
        <div className="input_field">
            <textarea placeholder="Your Feedback" id="yourfeedback"></textarea>
        </div>
        <div className="btn">
            <input type="submit" />
        </div>
      </form>
      
    </>
  )
}
