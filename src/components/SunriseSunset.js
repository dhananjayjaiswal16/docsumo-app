import '../scss/styles/sunriseSunset.scss';

const SunriseSunset = ({ text, icon, time }) => {
  return (
    <>
      <div className="container">
        <h4>{text}</h4>
        <h5>{time}</h5>
        <img src={icon} alt="sun" />
      </div>
    </>
  )
}

export default SunriseSunset;
