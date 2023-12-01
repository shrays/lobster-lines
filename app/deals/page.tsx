import './deals.css'

export default function DealsPage() {
  return (
    <>
      <h1>Daily Deals</h1>
      <p>
        Take a look at the daily deals Red Lobster has to offer:
      </p>
      <div className='content'>
        <table>
          <thead>
              <tr>
                  <th>Day</th>
                  <th>Deal Title</th>
                  <th>Deal Description</th>
                  <th>Price*</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td>Monday</td>
                  <td>NEW LOBSTER & SHRIMP SCAMPI</td>
                  <td>A Maine lobster tail paired with our signature Garlic Shrimp Scampi.</td>
                  <td>$20</td>
              </tr>
              <tr>
                  <td>Tuesday</td>
                  <td>NEW CRAB YOUR WAY</td>
                  <td>Enjoy a full pound of snow crab legs prepared your way over our crispy potatoes, with your choice of side. Enjoy simply steamed or with roasted garlic butter.</td>
                  <td>$20</td>
              </tr>
              <tr>
                  <td>Wednesday</td>
                  <td>STEAK & LOBSTER</td>
                  <td>There’s a reason it’s a classic pairing: A Maine lobster tail paired with a 7 oz. sirloin*, served with your choice of side.</td>
                  <td>$25</td>
              </tr>
              <tr>
                  <td>Thursday</td>
                  <td>NEW SEA SCALLOPS & SHRIMP</td>
                  <td>A grilled skewer of Sea Scallops and Shrimp, served over rice.</td>
                  <td>$15</td>
              </tr>
              <tr>
                  <td>Friday</td>
                  <td>FISH & CHIPS</td>
                  <td>Indulge in hand-battered, wild-caught cod served with fries and coleslaw.</td>
                  <td>$14</td>
              </tr>
          </tbody>
        </table>
      </div>
      <div className='order-link'>
        <p>
          Ready to order? Visit the <a href="https://www.redlobster.com/menu" target="_blank" rel="noopener noreferrer">Red Lobster Menu</a> to place your order now.
        </p>
      </div>
    </>
  )
}
