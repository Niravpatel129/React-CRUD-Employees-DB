// Npm Modules
import React, { PureComponent } from 'react';

// Local css imports
import './LoadingSpinner.css';

class LoadingSpinner extends PureComponent {
  render() {
    return (
      <div className="lds-ring">
        {/* 4 empty div's are required for the css loading animation */}
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}

export default LoadingSpinner;
