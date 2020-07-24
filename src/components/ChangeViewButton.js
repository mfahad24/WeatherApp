import React, { Component } from "react";
import "./ChangeViewButton.css";

class ChangeViewButton extends Component {
  render() {
    return (
      <div className="weather-app-five-day-button-container">
        <button
          className="weather-app-five-day-button"
          onClick={this.props.action}
        >
          {/* changes text based on which view is visible, single day or
          five day; prop sent in from parent */}
          {this.props.view === true
            ? "Change To Five Day Search"
            : "Change To Single Day Search"}
        </button>
      </div>
    );
  }
}

export default ChangeViewButton;
