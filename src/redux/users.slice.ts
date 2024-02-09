import { createAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../model/user';
import { Payload } from '../types/payload';
import { loginThunk, registerThunk } from './users.thunks';

const resetUserState = createAction('RESET_USER_STATE');

export type UsersState = {
  followers: User[];
  userStatus: 'logged' | 'not logged' | 'error' | 'pending';
  hasError: boolean | null;
  token: string;
  userLogged: User | undefined;
};

const initialState: UsersState = {
  followers: [],
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
  },
});

export default usersSlice.reducer;
