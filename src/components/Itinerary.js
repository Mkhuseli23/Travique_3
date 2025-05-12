import React, { useState } from 'react';
import './css/itinerary.css';

const Itinerary = () => {
  const [items, setItems] = useState([
    { time: '09:00 AM', activity: 'Breakfast at local cafe' },
    { time: '11:00 AM', activity: 'Visit the museum' },
    { time: '02:00 PM', activity: 'Lunch at downtown restaurant' },
    { time: '04:00 PM', activity: 'City walking tour' },
    { time: '07:00 PM', activity: 'Dinner and live music' },
  ]);

  return (
    <div className="itinerary-container">
      <h2>Your Itinerary</h2>
      <ul className="itinerary-list">
        {items.map((item, index) => (
          <li key={index} className="itinerary-item">
            <span className="itinerary-time">{item.time}</span>
            <span className="itinerary-activity">{item.activity}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Itinerary;
