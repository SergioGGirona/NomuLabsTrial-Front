import { User } from "../model/user";

export type Payload = {
  user: User;
  token: string;
};
