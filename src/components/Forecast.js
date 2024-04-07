import '../scss/styles/forecast.scss';
const Forecast = ({ temperature, day, icon, unit, description }) => {
  return (
    <div className="forecastContainer">
      <p>{temperature}  {unit === "metric" ? "°C" : "°F"}</p>
      <img src={icon} alt="" />
      <p>{day}</p>
    </div>
  )
}

export default Forecast;
