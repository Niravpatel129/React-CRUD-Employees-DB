// Npm Modules
import React, { Component } from "react";

// Local css imports
import "./NightModeSwitch.css";

class NightModeSwitch extends Component {
  handleDarkSwitch = () => {
    this.props.triggerThemeSwap();
  };

  render() {
    return (
      <div className="NightModeSwitch">
        <div className="theme-switch-wrapper">
          <label className="theme-switch" htmlFor="checkbox">
            <input
              type="checkbox"
              onClick={this.handleDarkSwitch}
              id="checkbox"
              defaultChecked={this.props.theme}
            />
            <div className="slider round"></div>
          </label>
          <em>Enable Dark Mode!</em>
        </div>
      </div>
    );
  }
}

export default NightModeSwitch;
