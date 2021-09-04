import React, { Component } from "react";
import { weatherIconBaseUrl } from "../../constants/weatherConstants.js";

class FiveDayWeatherView extends Component {
  convertDate = (currentDate) => {
    let dateWithoutDashes = currentDate.split("-");
    let dateInTextForm = new Date(dateWithoutDashes);
    return dateInTextForm.toString().slice(0, 10);
  };

  convertTime = (currentTime) => {
    if (currentTime.slice(0, 2) < 12) {
      if (currentTime.slice(0, 2) === "00") {
        return "12AM";
      }
      return currentTime.slice(1, 2) + "AM";
    } else if (currentTime.slice(0, 2) >= 12) {
      if (currentTime.slice(0, 2) === "12") {
        return "12PM";
      }
      return currentTime.slice(0, 2) - 12 + "PM";
    }
  };
  render() {
    const { fiveDayWeather } = this.props;
    return (
      <div className="weather-app-five-day">
        {/* checks if five day weather object and necessary nested objects exist, as well as if the single day weather view is set to false  */}
        {fiveDayWeather && //including this line solves "TypeError: Cannot read property 'list' of null"
        fiveDayWeather.list &&
        !this.props.singleDayWeatherViewVisible ? (
          <div>
            <div className="weather-app-five-day-result--title">
              Five Day Weather For {fiveDayWeather.city.name},{" "}
              {fiveDayWeather.city.country}
            </div>
            <div className="weather-app-five-day-result">
              {fiveDayWeather.list.map((li) => {
                //selects hour 15 of the day - we want only this temp to show our 5 five day temp
                if (li.dt_txt.slice(11, 16) === "15:00") {
                  return (
                    <li className="weather-app-five-day-result-li" key={li.dt}>
                      <div className="weather-app-five-day-result-li-date">
                        <div className="weather-app-five-day-result-li-date--date">
                          {this.convertDate(li.dt_txt.slice(0, 10))}
                        </div>
                        <div className="weather-app-five-day-result-li--description">
                          {li.weather[0].main}
                        </div>
                      </div>
                      <div className="weather-app-five-day-result-li--icon">
                        <img
                          className="weather-app-five-day-result-li--img"
                          alt={li.weather[0].description}
                          src={`${weatherIconBaseUrl}${li.weather[0].icon}.png`}
                        />
                      </div>
                      <div className="weather-app-five-day-result-li--temp">
                        {Math.round(li.main.temp)}°
                      </div>
                    </li>
                  );
                }
              })}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default FiveDayWeatherView;
