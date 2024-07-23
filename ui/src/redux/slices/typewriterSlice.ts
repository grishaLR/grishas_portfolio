import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TypewriterState {
  currentText: string;
  delay: number;
}

const initialState: TypewriterState = {
  currentText:
    "Welcome to my virtual home, I'm so happy to have you here! This text can be set by YOU :-)  If you'd like to see head over to settings...",
  delay: 200,
};

const typewriterSlice = createSlice({
  name: 'typewriter',
  initialState,
  reducers: {
    setCurrentText(state, action: PayloadAction<string>) {
      state.currentText = action.payload;
    },
    setDelay(state, action: PayloadAction<number>) {
      state.delay = action.payload;
    },
  },
});

export const { setCurrentText, setDelay } = typewriterSlice.actions;

export default typewriterSlice.reducer;
