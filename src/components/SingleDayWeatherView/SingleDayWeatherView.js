import React, { Component } from "react";

class SingleDayWeatherView extends Component {
  render() {
    const { singleDayWeather } = this.props;
    return (
      <div className="weather-app-single-day">
        {/* checks if weather object and necessary nested objects exist, as well as if the single day weather view is visible  */}
        {singleDayWeather &&
        singleDayWeather.weather &&
        singleDayWeather.main.temp &&
        this.props.singleDayWeatherViewVisible ? (
          <div className="weather-app-single-day-result">
            <div className="weather-app-single-day-result--city">
              {singleDayWeather.name}, {singleDayWeather.sys.country}
            </div>
            <div className="weather-app-single-day-result--description">
              {singleDayWeather.weather[0].description}
            </div>
            <div className="weather-app-single-day-result--temperature">
              {Math.round(singleDayWeather.main.temp)}°
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default SingleDayWeatherView;
