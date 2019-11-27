import React, { Component } from "react";

import "./LoadingSpinner.css";

class LoadingSpinner extends Component {
  constructor(props) {
    super(props);
    this.state = { Visible: false };
  }
  render() {
    return (
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}

export default LoadingSpinner;
