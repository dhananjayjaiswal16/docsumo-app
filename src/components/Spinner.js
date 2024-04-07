import React from 'react'
import spinner from '../spinner.gif'
import "../scss/styles/App.scss";
const Spinner = () => {
  return (
    <div>
      <img src={spinner} alt="Loading..." className="loading-style" />
    </div>
  )
}

export default Spinner;