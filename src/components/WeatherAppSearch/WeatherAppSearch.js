import React, { Component } from "react";
import ChangeViewButton from "../ChangeViewButton/ChangeViewButton.js";
import "../../WeatherApp.css";

class WeatherAppSearch extends Component {
  render() {
    return (
      <div className="weather-app-search">
        <input
          type="text"
          className="weather-app-search--input"
          placeholder="Type in a city and press enter"
          onChange={this.props.handleSearchInputValue}
          onKeyPress={this.props.handleEnterKeyPress}
          value={this.props.queryParam}
        ></input>

        <ChangeViewButton
          changeSingleDayWeatherViewVisibility={
            this.props.changeSingleDayWeatherViewVisibility
          }
          singleDayWeatherViewVisible={this.props.singleDayWeatherViewVisible}
        ></ChangeViewButton>
      </div>
    );
  }
}

export default WeatherAppSearch;
