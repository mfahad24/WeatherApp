import React, { Component } from "react";
import "./WeatherApp.css";
import ChangeViewButton from "./components/ChangeViewButton";

class WeatherApp extends Component {
  constructor() {
    super();
    this.state = {
      queryParam: "",
      weather: null,
      fiveDayWeather: null,
      currentWeatherViewVisible: true,
    };
  }

  handleInputValue = (e) => {
    //edge case #1 (lines 26 & 27) - if user enters number or comma (for state or country), alert them
    //edge case #2 (line 26) - empty string is ok, in case user erases input before pressing enter; otherwise outermost alert fires
    let queryParam = e.target.value;

    if (isNaN(queryParam) || queryParam === "") {
      if (!queryParam.includes(",")) {
        this.setState({ queryParam });
      } else {
        alert("Please enter a city without commas");
      }
    } else {
      alert("Please enter a city without numbers");
    }
  };

  handleSubmit = (e) => {
    const apiKey = "b431550be97d0c0f119aaca3f10beb26";
    const baseUrl = "https://api.openweathermap.org/data/2.5/";
    //provides us access to 'this' within the nesting
    const that = this;

    if (e.key === "Enter" && this.state.currentWeatherViewVisible === true) {
      e.preventDefault();
      fetch(
        `${baseUrl}weather?q=${this.state.queryParam}&units=imperial&appid=${apiKey}`
      )
        .then((response) => {
          //edge case #3 - checks if queryParam is a valid city; if invalid, API will send 404
          if (response.ok) {
            return response.json();
          } else {
            alert("Please enter a valid city");
          }
          //second property/value in setState resets input value after state is updated
        })
        .then((data) => that.setState({ weather: data, queryParam: "" }));
    } else if (
      e.key === "Enter" &&
      this.state.currentWeatherViewVisible === false
    ) {
      e.preventDefault();
      fetch(
        `${baseUrl}forecast?q=${this.state.queryParam}&units=imperial&appid=${apiKey}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            alert("City not found");
          }
        })
        .then((data) =>
          that.setState({ fiveDayWeather: data, queryParam: "" })
        );
    }
  };

  changeCurrentViewVisibility = () => {
    if (this.state.currentWeatherViewVisible === true) {
      this.setState({ currentWeatherViewVisible: false });
    } else {
      this.setState({ currentWeatherViewVisible: true });
    }
  };

  render() {
    const { weather, fiveDayWeather } = this.state;
    const weatherIcon = "http://openweathermap.org/img/wn/";
    return (
      <div className="weather-app-container">
        <div className="weather-app-current">
          <div className="weather-app-current-search">
            <input
              type="text"
              label="test"
              className="weather-app-current-search--input"
              placeholder="Type in a city and press enter"
              onChange={this.handleInputValue}
              onKeyPress={this.handleSubmit}
              value={this.state.queryParam}
            ></input>
            <div>
              <ChangeViewButton
                action={this.changeCurrentViewVisibility}
                view={this.state.currentWeatherViewVisible}
              ></ChangeViewButton>
            </div>
          </div>

          {/* checks if weather object and necessary nested objects exist, as well as if current weather view is visible  */}
          {weather &&
          weather.weather &&
          weather.main.temp &&
          this.state.currentWeatherViewVisible ? (
            <div className="weather-app-current-result">
              <div className="weather-app-current-result--city">
                {weather.name}
              </div>
              <div className="weather-app-current-result--condition">
                {weather.weather[0].description}
              </div>
              <div className="weather-app-current-result--temp">
                {Math.round(weather.main.temp)}°
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="weather-app-five-day">
          <div className="weather-app-five-day-search"></div>
          {/* checks if five day weather object and necessary nested objects exist, as well as if current weather view is set to false  */}
          {fiveDayWeather &&
          fiveDayWeather.list &&
          !this.state.currentWeatherViewVisible ? (
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
                        className="img"
                        alt={li.weather[0].description}
                        src={`${weatherIcon}${li.weather[0].icon}.png`}
                      />
                    </div>
                    <div className="weather-app-five-day-result-li--temp">
                      {Math.round(li.main.temp_max)} °
                    </div>
                  </li>
                );
                // }
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
