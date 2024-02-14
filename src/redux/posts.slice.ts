import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../model/post';
import { addThunk, eraseThunk, loadThunk, updateThunk } from './posts.thunks';

export type PostsState = {
  posts: Post[];
  postsStatus: 'iddle' | 'loading' | 'loaded' | 'error';
  hasGoneWrong: boolean | null;
};

const initialState: PostsState = {
  posts: [],
  postsStatus: 'iddle',
  hasGoneWrong: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadThunk.pending, (state) => {
      state.postsStatus = 'loading';
    });
    builder.addCase(
      loadThunk.fulfilled,
      (state, { payload }: { payload: Post[] }) => {
        state.hasGoneWrong = false;
        state.postsStatus = 'loaded';
        state.posts = payload;
      }
    );
    builder.addCase(loadThunk.rejected, (state) => {
      state.hasGoneWrong = true;
      state.postsStatus = 'error';
    });

    builder.addCase(
      addThunk.fulfilled,
      (state, { payload }: { payload: Post }) => {
        state.posts.push(payload);
        state.hasGoneWrong = false;
      }
    );

    builder.addCase(addThunk.rejected, (state) => {
      state.hasGoneWrong = true;
      state.postsStatus = 'error';
    });

    builder.addCase(
      updateThunk.fulfilled,
      (state, { payload }: { payload: Post }) => {
        state.posts = state.posts.map((item) =>
          item.id === payload.id ? payload : item
        );
        state.hasGoneWrong = false;
      }
    );
    builder.addCase(updateThunk.rejected, (state) => {
      state.hasGoneWrong = true;
      state.postsStatus = 'error';
    });

    builder.addCase(
      eraseThunk.fulfilled,
      (state, { payload }: { payload: Post['id'] }) => {
        state.posts = state.posts.filter((item) => item.id !== payload);
      }
    );

    builder.addCase(eraseThunk.rejected, (state) => {
      state.hasGoneWrong = true;
      state.postsStatus = 'error';
    });
  },
});

export const actions = postsSlice.actions;

export default postsSlice.reducer;
