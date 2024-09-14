import React, { useState } from 'react';
import './App.css';

const Weather = () => {
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const api = {
    key: '168f1f84e4d3423f951100651240709',
    base: 'https://api.weatherapi.com/v1/current.json',
  };

  const fetchWeather = (cityName) => {
    fetch(`${api.base}?key=${api.key}&q=${cityName}&aqi=yes`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((result) => {
        setWeather(result);
        setSearch('');
        setSuggestions([]);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  };

  const fetchCitySuggestions = (value) => {
    if (value.length > 0) {
      fetch(`${api.base}?key=${api.key}&q=${value}&aqi=no`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((result) => {
          const city = result.location.name;
          setSuggestions([city]);
        })
        .catch((error) => {
          console.error('Error fetching city suggestions:', error);
        });
    } else {
      setSuggestions([]);
    }
  };

  const onInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchCitySuggestions(value);
  };

  return (
    <div className="app">
      <div className="container">
        <div className="inputSearch">
          <input
            type="text"
            placeholder="Enter city/town"
            value={search}
            onChange={onInputChange}
          />
          <div className="suggestions">
            {suggestions.length > 0 && (
              <ul>
                {suggestions.map((city, index) => (
                  <li key={index} onClick={() => fetchWeather(city)}>
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {weather && (
          <div className="weatherInfo">
            <h1>{weather.location.name}</h1>
            <h1>{weather.location.region}</h1>

            <h2>{weather.current.temp_c}°C</h2>
            <p>{weather.current.condition.text}</p>
            <img
              src={weather.current.condition.icon}
              alt={weather.current.condition.text}
            />
            <p>Humidity: {weather.current.humidity}%</p>
            <p>Wind Speed: {weather.current.wind_kph} kph</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
