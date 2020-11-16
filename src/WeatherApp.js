import React, { Component } from "react";
import WeatherAppSearch from "./components/WeatherAppSearch/WeatherAppSearch";
import SingleDayWeather from "./components/SingleDayWeatherView/SingleDayWeatherView";
import FiveDayWeatherView from "./components/FiveDayWeatherView/FiveDayWeatherView";
import "./WeatherApp.css";
import {
  noNetworkConnection,
  notAValidCity,
  enterCityWithoutSpecialCharacters,
  enter,
  weather,
  forecast,
  apiKey,
  baseUrl,
  specialCharacters,
  allOtherErrors,
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

  componentDidMount() {
    console.log(process.env);
    //getting weather location based on user current location on page load
    if (navigator.geolocation) {
      //if the object exists
      navigator.geolocation.getCurrentPosition((position) => {
        fetch(
          `${baseUrl}weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial&appid=${apiKey}`
        )
          .then((response) => response.json())
          .then((data) =>
            this.setState({
              singleDayWeather: data,
            })
          );
      });
    }
  }

  handleSearchInputValue = (event) => {
    //edge case #1 - if user enters special characters, alert them
    let queryParam = event.target.value;
    if (
      (isNaN(queryParam) || queryParam === "") &&
      !specialCharacters.test(queryParam) //.test checks if user query includes any of the special characters
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
      if (event.key === enter && this.state.singleDayWeatherViewVisible) {
        this.fetchWeather(weather);
        //five day weather fetch
      } else if (event.key === enter) {
        this.fetchWeather(forecast);
      }
    }
  };

  fetchWeather = (endpoint) => {
    fetch(
      `${baseUrl}${endpoint}?q=${this.state.queryParam}&units=imperial&appid=${apiKey}`
    )
      .then((response) => {
        //edge case #2 - checks if queryParam is a valid city; if invalid, API will send 404
        if (response.ok) {
          //we're looking for 200 status codes
          return response.json();
        } else if (response.statusText === "Not Found") {
          //API documentation is not clear in the case that the response returns a 404
          //I am assuming that the city does not exist
          alert(notAValidCity);
        } else {
          //sending an alert for all other response error codes
          alert(`${allOtherErrors}${response.statusText}`);
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
    return (
      <div className="weather-app-container">
        <WeatherAppSearch
          handleSearchInputValue={this.handleSearchInputValue}
          handleEnterKeyPress={this.handleEnterKeyPress}
          queryParam={this.state.queryParam}
          changeSingleDayWeatherViewVisibility={
            this.changeSingleDayWeatherViewVisibility
          }
          singleDayWeatherViewVisible={this.state.singleDayWeatherViewVisible}
          value={this.state.queryParam}
        ></WeatherAppSearch>

        <SingleDayWeather
          singleDayWeather={this.state.singleDayWeather}
          singleDayWeatherViewVisible={this.state.singleDayWeatherViewVisible}
        ></SingleDayWeather>

        <FiveDayWeatherView
          fiveDayWeather={this.state.fiveDayWeather}
          singleDayWeatherViewVisible={this.state.singleDayWeatherViewVisible}
        ></FiveDayWeatherView>
      </div>
    );
  }
}

export default WeatherApp;
