import { configureStore } from '@reduxjs/toolkit';
import commentsReducer from '../redux/comments.slice';
import postsReducer from '../redux/posts.slice';
import usersReducer from '../redux/users.slice';

export const appStore = configureStore({
  reducer: {
    usersState: usersReducer,
    postsState: postsReducer,
    commentsState: commentsReducer,
  },
});

export type AppDispatch = typeof appStore.dispatch;
export type RootState = ReturnType<typeof appStore.getState>;
