import React from 'react'
import "../scss/styles/cityWeather.scss";
// import { iconUrlFromCode } from '../services/api';
import Forecast from './Forecast';
const LeftSide = ({ weather, unit, setUnit, formatToLocalTime, iconUrlFromCode }) => {
  return (
    <>
      <div className="topBarContainer">
        <div className="weatherDetailsContainer">
          <img src={iconUrlFromCode(weather?.icon)} alt="weather" />
          <h1>{weather?.details}</h1>
        </div>
        <div style={{ cursor: "pointer" }}>
          <span onClick={() => setUnit("metric")}>°C</span> | <span onClick={() => setUnit("imperial")}>°F</span>
        </div>
      </div>
      <h1>{Math.floor(weather?.temp)}<span>{unit === "metric" ? '°C' : '°F'}</span></h1>
      <div className="dateAndTime">
        <span>{formatToLocalTime(parseInt(weather?.dt), weather?.timezone)}</span>
      </div>
      <div className="weatherDetails">
        <span><i className="fa-solid fa-wind"></i> Wind  <strong>{`${weather?.speed} ${unit === "metric" ? "m/sec" : "miles/hour"}`}</strong> |</span>
        <span><i className="fa-solid fa-droplet"></i> Hum  <strong>{weather?.humidity}%</strong> |</span>
        <span><i className="fa-solid fa-cloud-rain"></i> Rain  <strong>{weather?.rain ? `${weather?.rain} mm` : "Not Predicted"}</strong> </span>
      </div>
      <div className="forecast">
        {weather?.daily?.map((d, index) => (
          <Forecast key={index} description={d?.description} icon={iconUrlFromCode(d?.icon)} temperature={Math.floor(d?.temp)} day={d?.title} unit={unit} />
        ))}
      </div>
    </>
  )
}

export default LeftSide;
