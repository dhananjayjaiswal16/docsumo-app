import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage';
import CityWeather from './pages/CityWeather';
import './scss/styles/App.scss'
function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
