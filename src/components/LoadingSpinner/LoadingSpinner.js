import React from 'react';

import './LoadingSpinner.css';

const LoadingSpinner = React.memo(() => {
  return (
    <div className="lds-ring">
      {/* 4 empty div's are required for the css loading animation */}
      <div />
      <div />
      <div />
      <div />
    </div>
  );
});

export default LoadingSpinner;
