import React from 'react';
import './css/about.css';

function About() {
  return (
    <div className="about-background">
      <div className="about-container">
        <h1>About Travique 3</h1>
        <p>
          Travique 3 is your smart travel companion designed to simplify every aspect of trip planning.
          Whether you're looking for itinerary suggestions, nearby food options, weather updates, or
          tracking travel expenses — Travique 3 brings all your travel needs into one powerful platform.
        </p>
        <div className="about-features">
          <div className="feature-box">
            <h3>🗺️ Itinerary Planning</h3>
            <p>Create smart, optimized plans for your trip based on your preferences.</p>
          </div>
          <div className="feature-box">
            <h3>💰 Expense Manager</h3>
            <p>Track your travel spending and generate reports with visual insights.</p>
          </div>
          <div className="feature-box">
            <h3>🏋️‍♂️ Health Tips</h3>
            <p>Stay fit and healthy on the road with wellness suggestions and nearby gyms.</p>
          </div>
          <div className="feature-box">
            <h3>🍔 Food Recommender</h3>
            <p>Find the best local eats tailored to your tastes and location.</p>
          </div>
          <div className="feature-box">
            <h3>🔍 Smart Suggestions</h3>
            <p>AI-driven tips based on your activity, budget, and mood.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
