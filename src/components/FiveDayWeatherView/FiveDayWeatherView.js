import React, { Component } from "react";
import { weatherIconBaseUrl } from "../../constants/weatherConstants.js";

class FiveDayWeatherView extends Component {
  render() {
    const { fiveDayWeather } = this.props;
    return (
      <div className="weather-app-five-day">
        {/* checks if five day weather object and necessary nested objects exist, as well as if the single day weather view is set to false  */}
        {fiveDayWeather &&
        fiveDayWeather.list &&
        !this.props.singleDayWeatherViewVisible ? (
          <div className="weather-app-five-day-result">
            <div className="weather-app-five-day-result--title">
              Five Day Weather For {fiveDayWeather.city.name},
              {fiveDayWeather.city.country}
            </div>
            {fiveDayWeather.list.map((li) => {
              return (
                <li className="weather-app-five-day-result-li" key={li.dt}>
                  <div className="weather-app-five-day-result-li--date">
                    {li.dt_txt}
                  </div>
                  <div className="weather-app-five-day-result-li--icon">
                    <img
                      className="weather-app-five-day-result-li--img"
                      alt={li.weather[0].description}
                      src={`${weatherIconBaseUrl}${li.weather[0].icon}.png`}
                    />
                  </div>
                  <div className="weather-app-five-day-result-li--temp">
                    {Math.round(li.main.temp_max)} °
                  </div>
                </li>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default FiveDayWeatherView;
