import React, { useState } from 'react';
import './weatherApi.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureHigh, faDroplet, faWind } from '@fortawesome/free-solid-svg-icons';

const WeatherApi = () => {
    const [temp, setTemp] = useState('');
    const [city, setCity] = useState('');
    const [humidity, setHumidity] = useState('');
    const [windSpeed, setWindSpeed] = useState('');
    const apiKey = '3c9bc993494f5010218618641438324e';

    const fetchData = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            if (!response.ok) {
                throw new Error('City not found');
            }
            const data = await response.json();
            setTemp(data.main.temp);
            setHumidity(data.main.humidity);
            setWindSpeed(data.wind.speed);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-primary">
                <div className="container-fluid">
                    
                    <a className="navbar-brand text-light mx-5" href="#"><b>TheWeatherChannel</b></a>

                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item"><a className="nav-link text-light mx-5" href="#">Today</a></li>

                            <li className="nav-item"><a className="nav-link text-light mx-5" href="#">Monthly</a></li>

                            <li className="nav-item"><a className="nav-link text-light mx-5" href='#'>Radar</a></li>
                        </ul>

                        <form className="d-flex" onSubmit={(e) => { e.preventDefault(); fetchData(); }}>
                            <input className="form-control me-2" placeholder="Enter City Name" value={city} onChange={(ele) => setCity(ele.target.value)} />
                            <button className="btn btn-outline-light" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav><br></br>

            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-5 bg-light rounded text-center' id='temperature'>
                        <h3 className='text-center p-3'>Current Weather</h3>
                        {temp && <p> <FontAwesomeIcon icon={faTemperatureHigh} /> Temperature: {temp}°C</p>}<br></br>

                        <h3 className='text-center p-3'>Air Conditions</h3>
                        {humidity && <p> <FontAwesomeIcon icon={faDroplet} /> Humidity: {humidity}%</p>}
                        {windSpeed && <p> <FontAwesomeIcon icon={faWind} /> Wind Speed: {windSpeed} m/s</p>}
                    </div>

                    <div className='col-md-7 bg-light rounded' id='temperature'>
                        <img src='https://images.unsplash.com/photo-1630260667842-830a17d12ec9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2VhdGhlciUyMGZvcmVjYXN0fGVufDB8fDB8fHww' alt="Weather condition" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default WeatherApi;
