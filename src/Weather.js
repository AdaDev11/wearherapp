import React from 'react';
import './Weather.css';
import { useState } from 'react';

const Weather = () => {

    const [search, setSearch] = useState("");
    const [weather, setWeather] = useState({});

    const api = {
        key: '168f1f84e4d3423f951100651240709',
        base: 'http://api.weatherapi.com/v1/current.json'
    };
    const searchCity = () => {
        console.log(search);
        fetch(`${api.base}?key=${api.key}&q=${search}&aqi=yes`)
            .then((res) => res.json())
            .then((result) => {
                setWeather(result);
                console.log(result);
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
            });
    }
    return (
        <div className='app'>
            <div className='container'>
                <div className='iconsDiv'>
                    <h1 className='weatherApp'>Wearher App</h1>
                    <div className='aboutsDiv'>
                        <div className='iconWeather'>
                            <h1>{weather.location.name}</h1>
                            <h1>{weather.location.region}</h1>
                        </div>
                        <div className='timeGradus'>
                            <div className='time'>{weather.location.localtime}</div>
                        </div>
                    </div>
                </div>
                <div className='aboutDiv'>
                    <div className='aboutWeatherIcon'>
                        <h1>{weather.location.name}</h1>
                        <img src={weather.current.condition.icon} alt='' />
                    </div>

                    <div className='weatherFunctions'>
                        <div className='inputSearch'>
                            <input
                                type='text'
                                placeholder='Enter city/town'
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button onClick={searchCity}>Search</button>
                        </div>
                        <br/> <br/>
                        <div className='humidityDiv'>
                            <h1>Gradus: {weather.current.heatindex_c}</h1>
                            <h4>Humidity: {weather.current.humidity}</h4>
                        </div>
                        <div className='speedDiv'>
                            <h4>Speed: {weather.current.vis_km} </h4>
                        </div>
                        <br />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather