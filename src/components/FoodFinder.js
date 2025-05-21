// components/FoodFinder.js
import React, { useState } from "react";
import axios from "axios";
import "./css/foodfinder.css";

const FoodFinder = () => {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState("");

  const searchMeal = async () => {
    setMeals([]);
    setError("");

    try {
      const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = res.data;

      if (!data.meals) {
        setError("No meals found.");
      } else {
        setMeals(data.meals);
      }
    } catch (err) {
      setError("Error fetching meal data.");
    }
  };

  return (
    <div className="food-finder-container">
      <h2>🍽️ Food Finder</h2>
      <div className="food-form">
        <input
          type="text"
          placeholder="Search for a food (e.g., pizza)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchMeal}>Find</button>
      </div>

      {error && <p className="error">{error}</p>}

      {meals.length > 0 && (
        <ul className="meals-list">
          {meals.map((meal) => (
            <li key={meal.idMeal} className="meal-info">
              <h3>{meal.strMeal}</h3>
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <p><strong>Category:</strong> {meal.strCategory}</p>
              <p><strong>Area:</strong> {meal.strArea}</p>
              <p><strong>Instructions:</strong> {meal.strInstructions.slice(0, 200)}...</p>
              <a href={meal.strSource || meal.strYoutube} target="_blank" rel="noopener noreferrer">
                View Full Recipe
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FoodFinder;
