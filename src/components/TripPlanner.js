import React, { useState } from "react";
import "./css/tripPlanner.css";

const TripPlanner = () => {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activities, setActivities] = useState("");
  const [tripPlan, setTripPlan] = useState(null);

  const suggestedDestinations = [
    "Cape Town, South Africa",
    "Durban, South Africa",
    "Kruger National Park",
    "Victoria Falls",
    "Garden Route",
  ];

  // Updated mediaMap with Cape Town YouTube embed url and types
  const mediaMap = {
    "Cape Town, South Africa": {
      type: "youtube",
      url: "https://www.youtube.com/embed/69DzEF_RAcA",
    },
    "Durban, South Africa": {
      type: "youtube",
      url: "https://www.youtube.com/embed/klliZHotGN4",
    },
    "Kruger National Park": {
  type: "youtube",
  url: "https://www.youtube.com/embed/ZnbsthIPMiw",
},

    "Victoria Falls": {
  type: "youtube",
  url: "https://www.youtube.com/embed/H0LG5rOo_9w",
},

    "Garden Route": {
  type: "youtube",
  url: "https://www.youtube.com/embed/HKhLL80Z_b4", // Use the embed version
},

  };

  const handlePlanTrip = () => {
    if (!destination || !startDate || !endDate) return;

    const plan = {
      destination,
      startDate,
      endDate,
      activities: activities.split(",").map((a) => a.trim()),
    };

    setTripPlan(plan);
  };

  const selectedMedia = mediaMap[destination];

  return (
    <div className="trip-planner-container">
      <h2>🗺️ Trip Planner</h2>

      <div className="form">
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

        {/* Suggested Destinations */}
        <div className="suggestions">
          <h4>🌍 Suggested Destinations:</h4>
          <div className="suggestion-tags">
            {suggestedDestinations.map((place, idx) => (
              <button
                key={idx}
                onClick={() => setDestination(place)}
                className="tag"
              >
                {place}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic media preview */}
        {selectedMedia && (
          <div className="media-preview">
            {selectedMedia.type === "image" ? (
              <img src={selectedMedia.url} alt={destination} />
            ) : selectedMedia.type === "youtube" ? (
              <iframe
                width="560"
                height="315"
                src={selectedMedia.url}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <video controls autoPlay muted loop>
                <source src={selectedMedia.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <textarea
          placeholder="Enter activities separated by commas (e.g., hiking, museum, beach)"
          value={activities}
          onChange={(e) => setActivities(e.target.value)}
        ></textarea>
        <button onClick={handlePlanTrip}>Create Plan</button>
      </div>

      {tripPlan && (
        <div className="trip-details">
          <h3>📝 Your Trip Plan</h3>
          <p>
            <strong>Destination:</strong> {tripPlan.destination}
          </p>
          <p>
            <strong>Start:</strong> {tripPlan.startDate}
          </p>
          <p>
            <strong>End:</strong> {tripPlan.endDate}
          </p>
          <p>
            <strong>Activities:</strong>
          </p>
          <ul>
            {tripPlan.activities.map((activity, index) => (
              <li key={index}>✅ {activity}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TripPlanner;
