// Weather.jsx
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { API_URL, API_KEY } from '../api_details';

function Weather() {
  const [city, setCity] = useState("Vijayawada");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
      });
      setWeatherData(res.data);
    } catch (error) {
      setWeatherData(null);
    } finally {
      setLoading(false);
      setCity("");
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md text-center text-white border border-white border-opacity-20">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-blue-400">🌦️ Weather Details</h2>

      <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="px-4 py-2 rounded-full text-gray-800 font-semibold outline-none w-full sm:w-2/3"
        />
        <button
          onClick={fetchWeather}
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-full transition w-full sm:w-auto"
        >
          Get Weather
        </button>
      </div>

      {
        loading ? (
          <p className="animate-pulse text-lg font-medium">Loading...</p>
        ) : weatherData ? (
          <div className="space-y-3 sm:space-y-4 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl font-bold">{weatherData.name}</h2>
            <p className="text-4xl sm:text-5xl font-bold">🌡️ {weatherData.main.temp}°C</p>
            <p className="capitalize text-base sm:text-lg">🌥️ {weatherData.weather[0].description}</p>

            <div className="flex flex-col sm:flex-row justify-around mt-4 font-semibold text-sm sm:text-base gap-2">
              <div>💧 Humidity: {weatherData.main.humidity}%</div>
              <div>💨 Wind: {weatherData.wind.speed} km/h</div>
            </div>
          </div>
        ) : (
          <p className="text-red-300 text-lg mt-4 font-semibold animate-bounce">❌ City not found</p>
        )
      }
    </div>
  );
}

export default Weather;
