import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { fplApi } from '../api/fplApi';
import { migraineApi } from '../api/migraineApi';

const store = configureStore({
  reducer: {
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
