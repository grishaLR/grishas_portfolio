import React, { useState, useEffect, useRef } from 'react';
import { playSound } from '@utils';
import { Box, Button, TextField, Typography } from '@mui/material';

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
      playSound('https://www.soundjay.com/mechanical/sounds/smoke-detector-1.mp3');
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
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <Typography variant="h4">Countdown Timer</Typography>
      <TextField
        type="number"
        value={time}
        onChange={handleChange}
        disabled={isRunning}
        label="Set Time (seconds)"
      />
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained" onClick={handleStart} disabled={isRunning || time <= 0}>
          Start
        </Button>
        <Button variant="contained" onClick={handleStop} disabled={!isRunning}>
          Stop
        </Button>
        <Button variant="contained" onClick={handleReset}>
          Reset
        </Button>
      </Box>
      <Typography variant="h6">{time} seconds remaining</Typography>
    </Box>
  );
}) as React.FC<TimerProps>;
