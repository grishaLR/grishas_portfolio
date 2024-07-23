import React, { useState, useEffect, useRef } from "react";
import { playSound } from "@utils";

export interface TimerProps {}

export default (() => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && time > 0) {
      timerRef.current = setTimeout(() => setTime(time - 1), 1000);
    } else if (time === 0 && isRunning) {
      setIsRunning(false);
      playSound(
        "https://www.soundjay.com/mechanical/sounds/smoke-detector-1.mp3",
      );
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [time, isRunning]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(parseInt(event.target.value, 10));
  };

  const handleStart = () => {
    if (time > 0) {
      setIsRunning(true);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  return (
    <div>
      <h2>Countdown Timer</h2>
      <input
        type="number"
        value={time}
        onChange={handleChange}
        disabled={isRunning}
      />
      <div>
        <button onClick={handleStart} disabled={isRunning || time <= 0}>
          Start
        </button>
        <button onClick={handleStop} disabled={!isRunning}>
          Stop
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div>
        <h3>{time} seconds remaining</h3>
      </div>
    </div>
  );
}) as React.FC<TimerProps>;
