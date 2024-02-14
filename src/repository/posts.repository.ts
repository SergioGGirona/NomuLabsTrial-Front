import { Post } from '../model/post';
import { Repository } from './repository';

export class PostsRepository implements Repository<Post> {
  constructor(public urlBase: string) {}

  async getAll(): Promise<Post[]> {
    const request = await fetch(this.urlBase);
    if (!request.ok)
      throw new Error(`Error ${request.status}: ${request.statusText}`);

    const data = await request.json();
    return data;
  }

  async getById(id: string): Promise<Post> {
    const url = this.urlBase + '/' + id;
    const request = await fetch(url);
    if (!request.ok)
      throw new Error(`Error ${request.status}: ${request.statusText}`);
    const data = await request.json();
    return data;
  }

  async create(item: FormData, token: string): Promise<Post> {
    const request = await fetch(`${this.urlBase}/add`, {
      method: 'POST',
      body: item,
      headers: {
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

  async update(id: string, item: Partial<Post>, token: string): Promise<Post> {
    const request = await fetch(`${this.urlBase}/update/${id}`, {
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
}
