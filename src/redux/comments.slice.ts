import { createSlice } from '@reduxjs/toolkit';
import { Comment } from '../model/comment';
import { addThunk, eraseThunk, loadThunk } from './comments.thunks';

export type CommentsState = {
  comments: Comment[];
  commentsStatus: 'iddle' | 'loading' | 'loaded' | 'error';
  hasGoneWrong: boolean | null;
};

const initialState: CommentsState = {
  comments: [],
  commentsStatus: 'iddle',
  hasGoneWrong: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadThunk.pending, (state) => {
      state.commentsStatus = 'loading';
    });
    builder.addCase(
      loadThunk.fulfilled,
      (state, { payload }: { payload: Comment[] }) => {
        state.hasGoneWrong = false;
        state.commentsStatus = 'loaded';
        state.comments = payload;
      }
    );
    builder.addCase(loadThunk.rejected, (state) => {
      state.hasGoneWrong = true;
      state.commentsStatus = 'error';
    });

    builder.addCase(
      addThunk.fulfilled,
      (state, { payload }: { payload: Comment }) => {
        state.comments.push(payload);
        state.hasGoneWrong = false;
      }
    );

    builder.addCase(addThunk.rejected, (state) => {
      state.hasGoneWrong = true;
      state.commentsStatus = 'error';
    });

    builder.addCase(
      eraseThunk.fulfilled,
      (state, { payload }: { payload: Comment['id'] }) => {
        state.comments = state.comments.filter((item) => item.id !== payload);
      }
    );

    builder.addCase(eraseThunk.rejected, (state) => {
      state.hasGoneWrong = true;
      state.commentsStatus = 'error';
    });
  },
});

export const actions = commentsSlice.actions;

export default commentsSlice.reducer;
