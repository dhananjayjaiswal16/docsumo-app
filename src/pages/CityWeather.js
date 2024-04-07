import React, { useEffect, useState, useRef } from 'react'
import "../scss/styles/cityWeather.scss";
import { formatToLocalTime, getFormattedWeather, iconUrlFromCode } from '../services/api'
import LeftSide from '../components/LeftSide';
import RightSide from '../components/RightSide';
import Spinner from '../components/Spinner';
import Error404 from './Error404';

const CityWeather = ({ inputText, weather, setWeather }) => {
  const [unit, setUnit] = useState("metric");
  const prevCountRef = useRef();

  useEffect(() => {
    try {
      navigator.geolocation.getCurrentPosition(async position => {
        const { latitude, longitude } = position.coords;
        const data = await getFormattedWeather({ lat: latitude, lon: longitude, units: unit });
        setWeather(data)
      });
    } catch (error) {
      console.log("Something broke while fetching weather data");
    }
  }, [])

  useEffect(() => {
    const fetchWeather = async () => {
      if (inputText != "") {
        const data = await getFormattedWeather({ q: inputText, units: unit });
        setWeather(data)
      }
    }
    fetchWeather();
    prevCountRef.current = unit;
  }, [unit])

  if (!weather) {
    return <Spinner />;
  }
  
  if (weather?.temp === undefined) {
    return <Error404 />;
  }

  return (
    <div className="weatherPage">
      <div className="cityWeather">
        <div className="left">
          <LeftSide 
            weather={weather} 
            iconUrlFromCode={iconUrlFromCode} 
            formatToLocalTime={formatToLocalTime} 
            unit={unit} 
            setUnit={setUnit} 
          />
        </div>
        <div className="right">
          <RightSide 
            weather={weather} 
            iconUrlFromCode={iconUrlFromCode} 
            formatToLocalTime={formatToLocalTime} 
            unit={unit} 
            setUnit={setUnit} 
          />
        </div>
      </div>
    </div>
  )
}

export default CityWeather;
