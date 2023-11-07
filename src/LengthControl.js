import React, { useState } from 'react';

function LengthControl(props) {
  // Initialize state for break and session length
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);

  // Handlers for break length
  const decrementBreakLength = () => {
    setBreakLength(prev => Math.max(prev - 1, 1)); // Assuming 1 min is the lowest break length
  };

  const incrementBreakLength = () => {
    setBreakLength(prev => Math.min(prev + 1, 60)); // Assuming 60 mins is the max break length
  };

  // Handlers for session length
  const decrementSessionLength = () => {
    setSessionLength(prev => Math.max(prev - 1, 1)); // Assuming 1 min is the lowest session length
  };

  const incrementSessionLength = () => {
    setSessionLength(prev => Math.min(prev + 1, 60)); // Assuming 60 mins is the max session length
  };

  return (
    <div className="length-controls-container">
      {/* Break Length Control */}
      <div className="length-control">
        <div id="break-label">Break Length</div>
        <div className="length-control-settings">
          <button id="break-decrement" onClick={decrementBreakLength}>&darr;</button>
          <div id="break-length">{breakLength}</div> {/* Now dynamic based on state */}
          <button id="break-increment" onClick={incrementBreakLength}>&uarr;</button>
        </div>
      </div>

      {/* Session Length Control */}
      <div className="length-control">
        <div id="session-label">Session Length</div>
        <div className="length-control-settings">
          <button id="session-decrement" onClick={decrementSessionLength}>&darr;</button>
          <div id="session-length">{sessionLength}</div> {/* Now dynamic based on state */}
          <button id="session-increment" onClick={incrementSessionLength}>&uarr;</button>
        </div>
      </div>
    </div>
  );
}

export default LengthControl;
