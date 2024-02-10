import { ImageData } from '../types/image';

export type UserLogin = {
  userName: string;
  password: string;
};

export type UserNoID = UserLogin & {
  email: string;
  nickName: string;
  followers: User[];
  usersFollowed: User[];
  bio: string;
  isPrivate: boolean;
  bornDate: Date;
  avatar: ImageData;
};

export type WithID = {
  id: string;
};

export type User = UserNoID & WithID;
