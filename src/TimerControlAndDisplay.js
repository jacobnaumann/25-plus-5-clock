import React, { useState, useEffect } from 'react';

function TimerControlAndDisplay() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerLabel, setTimerLabel] = useState('Session');
  const [timeLeft, setTimeLeft] = useState(25 * 60); // Timer in seconds
  const [timerRunning, setTimerRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    setTimeLeft(sessionLength * 60); // Resets the timer when sessionLength changes
  }, [sessionLength]);

  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  const formattedTimeLeft = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const decrementBreakLength = () => {
    if (!timerRunning) {
      setBreakLength(prev => Math.max(prev - 1, 1));
    }
  };

  const incrementBreakLength = () => {
    if (!timerRunning) {
      setBreakLength(prev => Math.min(prev + 1, 60));
    }
  };

  const decrementSessionLength = () => {
    if (!timerRunning) {
      setSessionLength(prev => Math.max(prev - 1, 1));
    }
  };

  const incrementSessionLength = () => {
    if (!timerRunning) {
      setSessionLength(prev => Math.min(prev + 1, 60));
    }
  };

  const handleStart = () => {
    if (!timerRunning) {
      setTimerRunning(true);
      const newIntervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft === 0) {
            // Alternate between session and break
            if (timerLabel === 'Session') {
              setTimerLabel('Break');
              return breakLength * 60;
            } else {
              setTimerLabel('Session');
              return sessionLength * 60;
            }
          }
          return prevTimeLeft - 1;
        });
      }, 1000);
      setIntervalId(newIntervalId);
    }
  };

  const handlePause = () => {
    if (timerRunning) {
      clearInterval(intervalId);
      setIntervalId(null);
      setTimerRunning(false);
    }
  };

  const handleReset = () => {
    clearInterval(intervalId);
    setIntervalId(null);
    setTimerRunning(false);
    setTimerLabel('Session');
    setTimeLeft(sessionLength * 60);
  };

  return (
    <div id="timer-control-display-container">
      <div className="length-controls-container">
        {/* Break Length Control */}
        <div className="length-control">
          <div id="break-label">Break Length</div>
          <div className="length-control-settings">
            <button id="break-decrement" onClick={decrementBreakLength}>&darr;</button>
            <div id="break-length">{breakLength}</div>
            <button id="break-increment" onClick={incrementBreakLength}>&uarr;</button>
          </div>
        </div>

        {/* Session Length Control */}
        <div className="length-control">
          <div id="session-label">Session Length</div>
          <div className="length-control-settings">
            <button id="session-decrement" onClick={decrementSessionLength}>&darr;</button>
            <div id="session-length">{sessionLength}</div>
            <button id="session-increment" onClick={incrementSessionLength}>&uarr;</button>
          </div>
        </div>
      </div>

      <div id="timer-container">
        <div id="timer">
          <div id="timer-label">{timerLabel}</div>
          <div id="time-left">{formattedTimeLeft()}</div>
        </div>
        <div className="timer-control">
          <button onClick={handleStart}>Start</button>
          <button onClick={handlePause}>Pause</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
    </div>
  )
}

export default TimerControlAndDisplay;