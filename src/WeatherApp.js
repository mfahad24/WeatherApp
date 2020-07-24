import React, { Component } from "react";
import "./WeatherApp.css";
import ChangeViewButton from "./components/ChangeViewButton";

const apiKey = "b431550be97d0c0f119aaca3f10beb26";
const baseUrl = "https://api.openweathermap.org/data/2.5/";
const weatherIconBaseUrl = "http://openweathermap.org/img/wn/";

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

  handleInputValue = (event) => {
    //edge case #1 - if user enters number or comma (for state or country), alert them
    //edge case #2 - empty string is ok, in case user erases input before pressing enter; otherwise outermost alert fires
    let queryParam = event.target.value;

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

  handleEnterKeyPress = (event) => {
    //check if user is connected to the internet
    if (navigator.onLine) {
      //single day weather fetch
      if (
        event.key === "Enter" &&
        this.state.singleDayWeatherViewVisible === true
      ) {
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
          })
          //second setState entry resets input value after state is updated, thus clearing input field
          .then((data) =>
            this.setState({
              singleDayWeather: data,
              queryParam: "",
            })
          );
        //five day weather fetch
      } else if (
        event.key === "Enter" &&
        this.state.singleDayWeatherViewVisible === false
      ) {
        fetch(
          `${baseUrl}forecast?q=${this.state.queryParam}&units=imperial&appid=${apiKey}`
        )
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              alert("Please enter a valid city");
            }
          })
          .then((data) =>
            this.setState({
              fiveDayWeather: data,
              queryParam: "",
            })
          );
      }
    } else {
      alert("Network disconnected");
    }
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
        <div className="weather-app-current">
          <div className="weather-app-current-search">
            <input
              type="text"
              label="test"
              className="weather-app-current-search--input"
              placeholder="Type in a city and press enter"
              onChange={this.handleInputValue}
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
            <div className="weather-app-current-result">
              <div className="weather-app-current-result--city">
                {singleDayWeather.name}
              </div>
              <div className="weather-app-current-result--condition">
                {singleDayWeather.weather[0].description}
              </div>
              <div className="weather-app-current-result--temp">
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
                        className="img"
                        alt={li.weather[0].description}
                        src={`${weatherIconBaseUrl}${li.weather[0].icon}.png`}
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
