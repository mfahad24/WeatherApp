import React, { Component } from "react";
import "./WeatherApp.css";
import ChangeViewButton from "./components/ChangeViewButton";
import {
  noNetworkConnection,
  notAValidCity,
  enterCityWithoutSpecialCharacters,
  enter,
  weather,
  forecast,
  apiKey,
  baseUrl,
  weatherIconBaseUrl,
  specialCharacters,
} from "./constants/weatherConstants.js";

class WeatherApp extends Component {
  constructor() {
    super();
    this.state = {
      queryParam: "",
      singleDayWeather: null,
      fiveDayWeather: null,
      singleDayWeatherViewVisible: true,
    };
  }

  handleSearchInputValue = (event) => {
    //edge case #1 - if user enters special characters, alert them
    let queryParam = event.target.value;
    if (
      (isNaN(queryParam) || queryParam === "") &&
      !specialCharacters.test(queryParam)
    ) {
      this.setState({ queryParam });
    } else {
      alert(enterCityWithoutSpecialCharacters);
    }
  };

  handleEnterKeyPress = (event) => {
    //check if user is connected to the internet
    if (!navigator.onLine) {
      alert(noNetworkConnection);
    } else {
      //single day weather fetch
      if (
        event.key === enter &&
        this.state.singleDayWeatherViewVisible === true
      ) {
        this.fetchWeather(weather);
        //five day weather fetch
      } else if (event.key === enter) {
        this.fetchWeather(forecast);
      }
    }
  };

  fetchWeather = (endpoint) => {
    return fetch(
      `${baseUrl}${endpoint}?q=${this.state.queryParam}&units=imperial&appid=${apiKey}`
    )
      .then((response) => {
        //edge case #2 - checks if queryParam is a valid city; if invalid, API will send 404
        if (response.ok) {
          return response.json();
        } else if (response.statusText === "Not Found") {
          //API documentation is not clear in the case that the response returns a 404
          //I am assuming that the city does not exist
          alert(notAValidCity);
        } else {
          //sending an alert for all other response error codes
          alert(response.statusText);
        }
      })
      .then(
        (data) =>
          endpoint === weather
            ? this.setState({
                singleDayWeather: data,
              })
            : this.setState({
                fiveDayWeather: data,
              }),
        //resets input value after state is updated, thus clearing input field
        this.setState({ queryParam: "" })
      );
  };

  changeSingleDayWeatherViewVisibility = () => {
    this.state.singleDayWeatherViewVisible
      ? this.setState({ singleDayWeatherViewVisible: false })
      : this.setState({ singleDayWeatherViewVisible: true });
  };

  render() {
    const { singleDayWeather, fiveDayWeather } = this.state;

    return (
      <div className="weather-app-container">
        <div className="weather-app-single-day">
          <div className="weather-app-single-day-search">
            <input
              type="text"
              className="weather-app-single-day-search--input"
              placeholder="Type in a city and press enter"
              onChange={this.handleSearchInputValue}
              onKeyPress={this.handleEnterKeyPress}
              value={this.state.queryParam}
            ></input>
            <div>
              <ChangeViewButton
                action={this.changeSingleDayWeatherViewVisibility}
                view={this.state.singleDayWeatherViewVisible}
              ></ChangeViewButton>
            </div>
          </div>

          {/* checks if weather object and necessary nested objects exist, as well as if the single day weather view is visible  */}
          {singleDayWeather &&
          singleDayWeather.weather &&
          singleDayWeather.main.temp &&
          this.state.singleDayWeatherViewVisible ? (
            <div className="weather-app-single-day-result">
              <div className="weather-app-single-day-result--city">
                {singleDayWeather.name}
              </div>
              <div className="weather-app-single-day-result--condition">
                {singleDayWeather.weather[0].description}
              </div>
              <div className="weather-app-single-day-result--temp">
                {Math.round(singleDayWeather.main.temp)}°
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="weather-app-five-day">
          <div className="weather-app-five-day-search"></div>
          {/* checks if five day weather object and necessary nested objects exist, as well as if the single day weather view is set to false  */}
          {fiveDayWeather &&
          fiveDayWeather.list &&
          !this.state.singleDayWeatherViewVisible ? (
            <div className="weather-app-five-day-result">
              <div className="weather-app-five-day-result-title">
                Five Day Weather For {fiveDayWeather.city.name}
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
      </div>
    );
  }
}

export default WeatherApp;
