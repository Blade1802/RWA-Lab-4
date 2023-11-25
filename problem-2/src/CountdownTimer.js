import React, { useState, useEffect } from 'react';
import './CountdownTimer.css';

const CountdownTimer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    setTotalSeconds(hours * 3600 + minutes * 60 + seconds * 1);
  }, [hours, minutes, seconds]);

  useEffect(() => {
    let interval;

    if (timerActive && totalSeconds > 0) {
      interval = setInterval(() => {
        setTotalSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [timerActive, totalSeconds]);

  const startTimer = () => {
    setTimerActive(true);
  };

  const stopTimer = () => {
    setTimerActive(false);
  };

  const resetTimer = () => {
    setTimerActive(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  return (
    <div className="timer">
      <div className='timerInput'>
        <div id='timerForm'>
          
          <input
            type="number"
            min="0"
            size="1"
            placeholder="h"
            value={hours || ''}
            onChange={(e) => setHours(e.target.value)}
          />
        
          :
          <input
            type="number"
            min="0"
            size="1"
            placeholder="m"
            value={minutes || ''}
            onChange={(e) => setMinutes(e.target.value)}
          />
        
          :
          <input
            type="number"
            min="0"
            size="1"
            placeholder="s"
            value={seconds || ''}
            onChange={(e) => setSeconds(e.target.value)}
          />

          <button onClick={startTimer}>START COUNTDOWN</button>
        </div>
      </div>
      <div>
        <p id='counter'>
          {formatTime(Math.floor(totalSeconds / 3600))}:
          {formatTime(Math.floor((totalSeconds % 3600) / 60))}:
          {formatTime(totalSeconds % 60)}
        </p>
      </div>
      <div className='counterButtons'>
        <button onClick={stopTimer}>Stop</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default CountdownTimer;
