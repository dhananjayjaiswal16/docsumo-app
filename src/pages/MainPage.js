import { useState, useRef } from 'react';
import '../scss/styles/mainPage.scss';
import CityWeather from './CityWeather';
import { getFormattedWeather } from '../services/api';

const MainPage = () => {
  const [inputText, setInputText] = useState('');
  const [weather, setWeather] = useState();
  const inputRef = useRef();
  const handleChange = (e) => {
    setInputText(e.target.value);
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    if (e.target.value !== "") {
      setInputText('');
      inputRef.current.value = '';
      const data = await getFormattedWeather({ q: inputText, units: "metric" });
      setWeather(data)
    }
  }
  return (
    <div className="mainPage">
      <div className="topBar">
        <h1>𝕎𝕖𝕒𝕥𝕙𝕖𝕣 𝔸𝕡𝕡</h1>
        <div className="right">
          <form className="searchBar" onSubmit={onSubmit}>
            <input ref={inputRef} type="text" placeholder="Search..." value={inputText} onChange={handleChange} />
            <i className="fa-solid fa-magnifying-glass"></i>
          </form>
        </div>
      </div>
      <CityWeather inputText={inputText} weather={weather} setWeather={setWeather} />
    </div>
  )
}

export default MainPage;
