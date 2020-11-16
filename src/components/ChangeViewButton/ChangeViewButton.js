import React, { Component } from "react";
import "./ChangeViewButton.css";

class ChangeViewButton extends Component {
  render() {
    const view = this.props.singleDayWeatherViewVisible
      ? "single-day"
      : "five-day";
    return (
      <div className={`weather-app-${view}-button-container`}>
        <button
          className={`weather-app-${view}-button`}
          onClick={this.props.changeSingleDayWeatherViewVisibility}
        >
          {/* changes text based on which view is visible, single day or
          five day; prop sent in from parent */}
          {this.props.singleDayWeatherViewVisible
            ? "Five Day Search"
            : "Single Day Search"}
        </button>
      </div>
    );
  }
}

export default ChangeViewButton;
