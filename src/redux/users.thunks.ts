import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, UserLogin } from '../model/user';
import { UsersRepository } from '../repository/users.repository';
import { Payload } from '../types/payload';

export const registerThunk = createAsyncThunk<
  User,
  { repository: UsersRepository; newUser: FormData }
>('users/add', async ({ repository, newUser }) => {
  const user = await repository.create(newUser);
  return user;
});

export const loginThunk = createAsyncThunk<
  Payload,
  { repository: UsersRepository; user: UserLogin }
>('users/login', async ({ repository, user }) => {
  const loginUser = await repository.login(user);
  return loginUser;
});

export const updateThunk = createAsyncThunk<
  User,
  {
    repository: UsersRepository;
    id: string;
    user: Partial<User>;
    token: string;
  }
>('users/update', async ({ repository, id, user, token }) => {
  const updatedUser = await repository.update(id, user, token);
  return updatedUser;
});

export const loadThunk = createAsyncThunk<User[], UsersRepository>(
  'users/load',
  async (repository) => {
    const users = await repository.getAll();
    return users;
  }
);

export const deleteThunk = createAsyncThunk<
  User['id'],
  { repository: UsersRepository; user: User; token: string }
>('users/delete', async ({ repository, user, token }) => {
  await repository.delete(user.id, token);
  return user.id;
});

export const searchThunk = createAsyncThunk<
  User[],
  { repository: UsersRepository; user: User['userName'] }
>('users/search', async ({ repository, user }) => {
  const userSearched = await repository.search(user);
  return userSearched;
});
