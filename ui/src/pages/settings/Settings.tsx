import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Button,
  type SelectChangeEvent,
} from '@mui/material';
import { RootState } from '../../redux/store/store';
import { setCurrentText, setDelay } from '../../redux/slices/typewriterSlice';
import './styles.css';

export default (() => {
  const dispatch = useDispatch();
  const currentText = useSelector((state: RootState) => state.typewriter.currentText);
  const delay = useSelector((state: RootState) => state.typewriter.delay);

  const [localText, setLocalText] = useState(currentText);
  const [localDelay, setLocalDelay] = useState(delay);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalText(event.target.value);
  };

  const handleDelayChange = (event: SelectChangeEvent<number>) => {
    setLocalDelay(event.target.value as number);
  };

  const handleApplySettings = () => {
    dispatch(setCurrentText(localText));
    dispatch(setDelay(localDelay));
  };

  return (
    <Box className="settings-container">
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Typography variant="body1" gutterBottom>
        Here you will be able to set the Typewriter message on the Home page among other features...
      </Typography>
      <Box className="settings-form">
        <TextField
          label="Typewriter Text"
          value={localText}
          onChange={handleTextChange}
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          InputProps={{
            style: { lineHeight: '1.5em' }, // Adjust the line height as needed
          }}
        />
        <FormControl fullWidth>
          <InputLabel id="delay-select-label">Delay (ms)</InputLabel>
          <Select
            labelId="delay-select-label"
            value={localDelay}
            onChange={handleDelayChange}
            label="Delay (ms)"
          >
            {[50, 100, 200, 300, 500, 1000].map((value) => (
              <MenuItem key={value} value={value}>
                {value} ms
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleApplySettings}>
          Apply Settings
        </Button>
      </Box>
    </Box>
  );
}) as React.FC;
