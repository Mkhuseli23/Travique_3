// components/Weather.js
import React, { useState } from "react";
import "./css/weather.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [days, setDays] = useState(1);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async () => {
    setLoading(true);
    setError("");
    setForecast(null);

    try {
      const apiKey = "ffec0c65a5424acd998133838252105"; // Replace with your WeatherAPI key
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=${days}&aqi=no&alerts=no`
      );
      const data = await response.json();

      if (data.error) {
        setError(data.error.message || "Error fetching weather");
      } else {
        setForecast(data);
      }
    } catch (err) {
      setError("Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-container">
      <h2>Weather Forecast</h2>
      <div className="weather-form">
        <input
          type="text"
          placeholder="Enter city (e.g. Cape Town)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <select value={days} onChange={(e) => setDays(Number(e.target.value))}>
          <option value={1}>1 Day</option>
          <option value={2}>2 Days</option>
          <option value={3}>3 Days</option>
        </select>
        <button onClick={getWeather}>Get Weather</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {forecast && (
        <div className="weather-result">
          <h3>{forecast.location.name}, {forecast.location.country}</h3>
          {forecast.forecast.forecastday.map((day) => (
            <div key={day.date} className="weather-day">
              <h4>{day.date}</h4>
              <p>🌡 Avg Temp: {day.day.avgtemp_c}°C</p>
              <p>☁️ Condition: {day.day.condition.text}</p>
              <p>💨 Max Wind: {day.day.maxwind_kph} km/h</p>
              <p>💧 Humidity: {day.day.avghumidity}%</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Weather;
