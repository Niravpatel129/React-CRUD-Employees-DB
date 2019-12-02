import React, { Component } from "react";
import "./NightModeSwitch.css";

class NightModeSwitch extends Component {
  render() {
    return (
      <div className="NightModeSwitch">
        <div className="theme-switch-wrapper">
          <label className="theme-switch" htmlFor="checkbox">
            <input
              type="checkbox"
              onClick={this.props.triggerThemeSwap}
              id="checkbox"
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
