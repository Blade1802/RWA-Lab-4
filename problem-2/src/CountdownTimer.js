import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    setTotalSeconds(hours * 3600 + minutes * 60 + seconds*1);
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
    <div>
      <div>
        <label>
          Hours:
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
        </label>
        <label>
          Minutes:
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
          />
        </label>
        <label>
          Seconds:
          <input
            type="number"
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
          />
        </label>
      </div>
      <div>
        <p>
          {formatTime(Math.floor(totalSeconds / 3600))}:
          {formatTime(Math.floor((totalSeconds % 3600) / 60))}:
          {formatTime(totalSeconds % 60)}
        </p>
      </div>
      <div>
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default CountdownTimer;
