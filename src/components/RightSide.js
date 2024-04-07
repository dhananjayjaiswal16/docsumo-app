import "../scss/styles/cityWeather.scss";
import Details from "./Details";
import SunriseSunset from "./SunriseSunset";
import sunrise from "../sunrise.png";
import sunset from "../sunset.png";
const RightSide = ({ weather, unit, formatToLocalTime }) => {
  return (
    <>
      <div className="cityNameContainer">
        <div className="cityNameContainer-left">
          <i className="fa-solid fa-location-dot"></i>
          <h4>{`${weather?.name} , ${weather?.country}`}</h4>
        </div>
        <div className="plus-icon">
          <i className="fa-solid fa-plus"></i>
        </div>
      </div>
      <div className="sunrise-sunset">
        <SunriseSunset text="Sunrise" icon={sunrise} time={formatToLocalTime(parseInt(weather?.sunrise), weather?.timezone, "hh:mm a")} />
        <SunriseSunset text="Sunset" icon={sunset} time={formatToLocalTime(parseInt(weather?.sunset), weather?.timezone, "hh:mm a")} />
      </div>
      <hr />
      <div className="details">
        <Details heading="Humidity" value={`${weather?.humidity} %`} />
        <Details heading="Rain" value={`${weather?.rain ? `${weather.rain} mm` : "Not Predicted yet"}`} />
        <Details heading="Feels like" value={`${Math.floor(weather?.feels_like)} ${unit === "metric" ? "°C" : "°F"}`} />
        <Details heading="Wind Speed" value={`${weather?.speed} ${unit === "metric" ? "m/sec" : "miles/hour"}`} />
      </div>
    </>
  )
}

export default RightSide
