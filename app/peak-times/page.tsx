import './peaktimes.css'

export default function PeakTimesPage() {
  return (
    <>
      <h1>Peak Times</h1>
      <div className="content">
        <p>
          Lets take a look at some historical availability from a random Wednesday!
          Knowing when you need to make a reservation ahead of time can save alot of headaches.
        </p>

        <div className="grid-container">
          <div className="image-container">
            <img className="photo" src="/wait_1200.webp" alt="Open Restaurants at 12:00pm MST" />
            <p className="caption">12:00pm MST</p>
          </div>

          <div className="image-container">
            <img className="photo" src="/wait_2000.webp" alt="Open Restaurants at 8:00pm MST" />
            <p className="caption">8:00pm MST</p>
          </div>

          <div className="image-container">
            <img className="photo" src="/wait_night.webp" alt="Open Restaurants at 1:00am MST" />
            <p className="caption">1:00am MST</p>
          </div>

          <div className="text-description">
            <strong>Best Time?</strong><br/>
            Red Lobsters tend to be busiest around 6:00pm in their respective time zone. If you plan on visiting, make sure to reserve if you live in a busy area. Just don't expect to get a table at 1:00am!
          </div>
        </div>
      </div>
    </>
  )
}
