import { User, UserLogin } from '../model/user';
import { Payload } from '../types/payload';
import { Repository } from './repository';

export class UsersRepository implements Repository<User> {
  constructor(public urlBase: string) {}

  async getAll(): Promise<User[]> {
    const request = await fetch(`${this.urlBase}/users`);
    if (!request.ok)
      throw new Error(`Error ${request.status}: ${request.statusText}`);
    const data = await request.json();
    return data;
  }

  async getById(id: string): Promise<User> {
    const url = this.urlBase + '/' + id;
    const request = await fetch(url);
    if (!request.ok)
      throw new Error(`Error ${request.status}: ${request.statusText}`);

    const data = await request.json();
    return data;
  }

  async create(item: FormData): Promise<User> {
    const url = this.urlBase + '/register';
    const request = await fetch(url, {
      method: 'POST',
      body: item,
    });
    if (!request.ok)
      throw new Error(
        `Error ${request.status}: ${request.statusText}. Try again.`
      );
    const data = await request.json();
    return data;
  }

  async update(id: string, item: Partial<User>, token: string): Promise<User> {
    const request = await fetch(`${this.urlBase}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    if (!request.ok)
      throw new Error(
        `Error ${request.status}: ${request.statusText}. Try again.`
      );
    const data = await request.json();
    return data;
  }

  async login(item: UserLogin): Promise<Payload> {
    const request = await fetch(`${this.urlBase}/login`, {
      method: 'PATCH',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!request.ok)
      throw new Error(
        `Error ${request.status}: ${request.statusText}. Try again.`
      );
    const data = await request.json();
    return data;
  }

  async delete(id: string, token: string): Promise<void> {
    const url = this.urlBase + '/' + id;
    const request = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (!request.ok)
      throw new Error(
        `Error ${request.status}: ${request.statusText}. Try again.`
      );
  }

  async search(item: User['userName']): Promise<User[]> {
    const searchUrl = `${this.urlBase}/search/${item}`;
    const request = await fetch(searchUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!request.ok)
      throw new Error(
        `Error ${request.status}: ${request.statusText}. Try again.`
      );
    const data = await request.json();
    return data;
  }

  async follow(user: User, token: string): Promise<User> {
    const response = await fetch(`${this.urlBase}/follow`, {
      method: 'PATCH',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });

    if (!response.ok)
      throw new Error(`Error ${response.status}: ${response.statusText}`);

    const data = await response.json();
    return data;
  }

  async unfollow(userToUnfollow: User, token: string): Promise<User> {
    const response = await fetch(`${this.urlBase}/unfollow`, {
      method: 'PATCH',
      body: JSON.stringify(userToUnfollow),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    if (!response.ok)
      throw new Error(`Error ${response.status}: ${response.statusText}`);

    const data = await response.json();
    return data;
  }
}
