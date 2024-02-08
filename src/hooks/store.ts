import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../redux/users.slice';

export const appStore = configureStore({
  reducer: {
    usersState: usersReducer,
  },
});

export type AppDispatch = typeof appStore.dispatch;
export type RootState = ReturnType<typeof appStore.getState>;
