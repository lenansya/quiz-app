import React, { useState, useEffect } from 'react';
import './Timer.css';

function Timer({ timeLimit, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerClass = () => {
    const percentage = (timeLeft / timeLimit) * 100;
    if (percentage <= 20) return 'timer danger';
    if (percentage <= 50) return 'timer warning';
    return 'timer';
  };

  return (
    <div className="timer-container">
      <div className={getTimerClass()}>
        ⏱️ {formatTime(timeLeft)}
      </div>
    </div>
  );
}

export default Timer;