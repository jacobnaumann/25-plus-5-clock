import React from 'react';
import TimerControlAndDisplay from './TimerControlAndDisplay';
import './index.css'; // Assuming this is where your main styles will be imported

function App() {
  return (
    <div id="container">
      <div className="main-title">
        25 + 5 Clock
      </div>
      <TimerControlAndDisplay />
    </div>
  );
}

export default App;
