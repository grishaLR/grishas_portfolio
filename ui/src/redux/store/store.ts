import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { fplApi } from '../api/fplApi';
import { migraineApi } from '../api/migraineApi';
import migraineFormReducer from '../slices/migraineSlice';
import typewriterReducer from '../slices/typewriterSlice';

const store = configureStore({
  reducer: {
    typewriter: typewriterReducer,
    migraineForm: migraineFormReducer,
    [fplApi.reducerPath]: fplApi.reducer,
    [migraineApi.reducerPath]: migraineApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([fplApi.middleware, migraineApi.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
