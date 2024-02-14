import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../redux/posts.slice';
import usersReducer from '../redux/users.slice';

export const appStore = configureStore({
  reducer: {
    usersState: usersReducer,
    postsState: postsReducer,
  },
});

export type AppDispatch = typeof appStore.dispatch;
export type RootState = ReturnType<typeof appStore.getState>;
