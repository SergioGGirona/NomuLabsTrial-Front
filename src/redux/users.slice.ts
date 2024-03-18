import { createAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../model/user';
import { Payload } from '../types/payload';
import {
  followThunk,
  loginThunk,
  registerThunk,
  searchThunk,
  updateThunk,
} from './users.thunks';

const resetUserState = createAction('RESET_USER_STATE');

export type UsersState = {
  followers: User[];
  userStatus: 'logged' | 'not logged' | 'error' | 'pending';
  hasError: boolean | null;
  token: string;
  userLogged: User | undefined;
  usersSearched: User[];
};

const initialState: UsersState = {
  followers: [],
  usersSearched: [],
  userStatus: 'not logged',
  hasError: false,
  token: 'string',
  userLogged: undefined,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerThunk.fulfilled, (state) => {
      state.hasError = false;
    });

    builder.addCase(registerThunk.pending, (state) => {
      state.hasError = null;
    });

    builder.addCase(registerThunk.rejected, (state) => {
      state.hasError = true;
      state.userStatus = 'error';
    });

    builder.addCase(
      loginThunk.fulfilled,
      (state, { payload }: { payload: Payload }) => {
        state.hasError = false;
        state.userLogged = payload.user;
        state.token = payload.token;
        state.followers = payload.user.followers;
        state.userStatus = 'logged';
      }
    );

    builder.addCase(loginThunk.pending, (state) => {
      state.hasError = null;
      state.userStatus = 'pending';
    });

    builder.addCase(loginThunk.rejected, (state) => {
      state.hasError = true;
      state.userStatus = 'error';
    });

    builder.addCase(resetUserState, () => {
      return initialState;
    });

    builder.addCase(
      searchThunk.fulfilled,
      (state, { payload }: { payload: User[] }) => {
        state.hasError = false;
        state.usersSearched = payload;
      }
    );

    builder.addCase(searchThunk.rejected, (state) => {
      state.hasError = true;
    });

    builder.addCase(
      updateThunk.fulfilled,
      (state, { payload }: { payload: User }) => {
        state.userLogged = payload;
        state.hasError = false;
      }
    );

    builder.addCase(
      followThunk.fulfilled,
      (state, { payload }: { payload: User }) => {
        state.userLogged!.usersFollowed = payload.usersFollowed;
        state.hasError = false;
      }
    );

    builder.addCase(followThunk.rejected, (state) => {
      state.hasError = true;
    });
  },
});

export default usersSlice.reducer;
