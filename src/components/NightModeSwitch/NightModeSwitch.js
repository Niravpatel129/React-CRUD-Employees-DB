import React, { Component } from 'react';

import './NightModeSwitch.css';

const clack = new Audio(
  'https://raw.githubusercontent.com/Niravpatel129/World-Shooter-game-browser-multiplayer-online-/master/public/assets/clack.ogg'
);

class NightModeSwitch extends Component {
  handleDarkSwitch = () => {
    clack.volume = 0.3;
    clack.play();
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
