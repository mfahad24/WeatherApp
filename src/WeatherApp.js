import React from "react";
import "./WeatherApp.css";

function WeatherApp() {
  const apiDetails = {
    api: "b431550be97d0c0f119aaca3f10beb26",
    baseUrl: "https://api.openweathermap.org/data/2.5/",
  };
  return (
    <div className="weather-app-container">
      <div className="weather-app-current">
        <div className="weather-app-current-search">
          <input
            className="weather-app-current-search--input"
            placeholder="Search for a city..."
          ></input>
        </div>
        <div className="weather-app-current-result">
          <div className="weather-app-current-result--city">Detroit</div>
          <div className="weather-app-current-result--condition">cloudy</div>
          <div className="weather-app-current-result--temp">81°</div>
        </div>
      </div>
      {/* <div className="weather-app-five-day">
        <div className="weather-app-five-day-search">
          <input
            className="weather-app-five-day-search--input"
            placeholder="Search for a city..."
          ></input>
        </div>
        <div className="weather-app-five-day-result"></div>
      </div> */}
    </div>
  );
}

export default WeatherApp;
