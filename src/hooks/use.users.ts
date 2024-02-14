import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User, UserLogin } from '../model/user.ts';
import {
  loginThunk,
  registerThunk,
  searchThunk,
  updateThunk,
} from '../redux/users.thunks';
import { UsersRepository } from '../repository/users.repository';
import { AppDispatch, RootState } from './store.ts';
export const urlBase = 'http://localhost:7373/';
export const urlUsers = urlBase + 'users';

export function useUsers() {
  const repository = useMemo(() => new UsersRepository(urlUsers), []);

  const usersState = useSelector((state: RootState) => state.usersState);
  const usersDispatch = useDispatch<AppDispatch>();

  const addUser = async (newUser: FormData) => {
    usersDispatch(registerThunk({ repository, newUser }));
  };

  const loginUser = async (user: UserLogin) => {
    usersDispatch(loginThunk({ repository, user }));
  };

  const searchFollowers = async (user: User['userName']) => {
    usersDispatch(searchThunk({ repository, user }));
  };

  const updateUser = async (user: Partial<User>, id: string, token: string) => {
    usersDispatch(updateThunk({ repository, user, id, token }));
  };

  return {
    followers: usersState.followers,
    userStatus: usersState.userStatus,
    hasError: usersState.hasError,
    token: usersState.token,
    userLogged: usersState.userLogged,
    usersSearched: usersState.usersSearched,
    addUser,
    loginUser,
    searchFollowers,
    updateUser,
  };
}
