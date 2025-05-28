import React, { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "./firebase/firebase"; // adjust path if needed
import "./css/tripPlanner.css";

const TripPlanner = () => {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activities, setActivities] = useState("");
  const [tripPlan, setTripPlan] = useState(null);
  const [savedPlans, setSavedPlans] = useState([]);

  const suggestedDestinations = [
    "Cape Town, South Africa",
    "Durban, South Africa",
    "Kruger National Park",
    "Victoria Falls",
    "Garden Route",
  ];

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
      url: "https://www.youtube.com/embed/HKhLL80Z_b4",
    },
  };

  const handlePlanTrip = async () => {
    if (!destination || !startDate || !endDate) return;

    const user = auth.currentUser;
    if (!user) {
      alert("Please log in to save your trip.");
      return;
    }

    const plan = {
      destination,
      startDate,
      endDate,
      activities: activities.split(",").map((a) => a.trim()),
      userId: user.uid,
      userEmail: user.email,
      timestamp: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "trip_plans"), plan);
      setTripPlan(plan);
      fetchSavedPlans(); // Refresh
    } catch (error) {
      console.error("Error saving trip plan:", error);
    }
  };

  const fetchSavedPlans = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(collection(db, "trip_plans"), where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    const plans = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setSavedPlans(plans);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchSavedPlans();
      }
    });

    return () => unsubscribe();
  }, []);

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

        <div className="suggestions">
          <h4>🌍 Suggested Destinations:</h4>
          <div className="suggestion-tags">
            {suggestedDestinations.map((place, idx) => (
              <button key={idx} onClick={() => setDestination(place)} className="tag">
                {place}
              </button>
            ))}
          </div>
        </div>

        {selectedMedia && (
          <div className="media-preview">
            {selectedMedia.type === "youtube" && (
              <iframe
                width="560"
                height="315"
                src={selectedMedia.url}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
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
          <p><strong>Destination:</strong> {tripPlan.destination}</p>
          <p><strong>Start:</strong> {tripPlan.startDate}</p>
          <p><strong>End:</strong> {tripPlan.endDate}</p>
          <p><strong>Activities:</strong></p>
          <ul>
            {tripPlan.activities.map((activity, index) => (
              <li key={index}>✅ {activity}</li>
            ))}
          </ul>
        </div>
      )}

      {savedPlans.length > 0 && (
        <div className="saved-trips">
          <h3>📌 Your Saved Trips</h3>
          {savedPlans.map((plan, idx) => (
            <div key={idx} className="trip-card">
              <p><strong>Destination:</strong> {plan.destination}</p>
              <p><strong>Start:</strong> {plan.startDate}</p>
              <p><strong>End:</strong> {plan.endDate}</p>
              <p><strong>Activities:</strong></p>
              <ul>
                {plan.activities.map((act, i) => (
                  <li key={i}>🗒️ {act}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TripPlanner;
