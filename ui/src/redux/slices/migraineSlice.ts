import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MigraineFormState {
  name: string;
  dateStarted: string;
  dateEnded: string;
  migraineType: string;
}

const initialState: MigraineFormState = {
  name: '',
  dateStarted: '',
  dateEnded: '',
  migraineType: '',
};

const migraineFormSlice = createSlice({
  name: 'migraineForm',
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setDateStarted(state, action: PayloadAction<string>) {
      state.dateStarted = action.payload;
    },
    setDateEnded(state, action: PayloadAction<string>) {
      state.dateEnded = action.payload;
    },
    setMigraineType(state, action: PayloadAction<string>) {
      state.migraineType = action.payload;
    },
    resetForm(state) {
      state.name = '';
      state.dateStarted = '';
      state.dateEnded = '';
      state.migraineType = '';
    },
  },
});

export const { setName, setDateStarted, setDateEnded, setMigraineType, resetForm } =
  migraineFormSlice.actions;

export default migraineFormSlice.reducer;
