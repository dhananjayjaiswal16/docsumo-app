import axios from "axios"
import { DateTime } from 'luxon'

const BASE_URL = "https://api.openweathermap.org/data";

const getWeather = async (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: process.env.REACT_APP_API_KEY });
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    return ("Err in getWeather : " + err);
  }
};

const formatWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  };
}

const formatForecastWeather = (data) => {
  let { timezone, daily, hourly } = data;
  let rain = daily[0].rain;
  daily = daily.slice(1, 5).map(d => {
    return {
      title: formatToLocalTime(d.dt, timezone, "ccc"),
      temp: d.temp.day,
      icon: d.weather[0].icon,
      description: d.weather[0].description
    };
  })

  return { timezone, daily, hourly, rain };
}

export const getFormattedWeather = async (searchParams) => {
  try {
    const formattedCurrentWeather = await getWeather('2.5/weather', searchParams).then(formatWeather);
    const { lat, lon } = formattedCurrentWeather;

    const formattedForecast = await getWeather("3.0/onecall", {
      lat, lon, exclude: "currently,minutely,alerts,hourly", units: searchParams.units
    }).then(formatForecastWeather);

    return { ...formattedCurrentWeather, ...formattedForecast };
  } catch (err) {
    return ("Error in getFormattedWeather : " + err);
  }
}

export const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

export const iconUrlFromCode = (iconCode) =>
  `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
