import React, { PureComponent } from "react";

import "./LoadingSpinner.css";

class LoadingSpinner extends PureComponent {
  render() {
    return (
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}

export default LoadingSpinner;
