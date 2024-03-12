import { Comment } from '../model/comment';
import { Post } from '../model/post';
import { Repository } from './repository';

export class CommentsRepository implements Repository<Comment> {
  constructor(public urlBase: string) {}

  async getAll(): Promise<Comment[]> {
    const request = await fetch(this.urlBase);
    if (!request.ok)
      throw new Error(`Error ${request.status}: ${request.statusText}`);

    const data = await request.json();
    return data;
  }

  async getPostComments(postId: Post['id']): Promise<Comment[]> {
    const searchUrl = `${this.urlBase}/search/${postId}`;
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

  async getById(id: string): Promise<Comment> {
    const url = this.urlBase + '/' + id;
    const request = await fetch(url);
    if (!request.ok)
      throw new Error(`Error ${request.status}: ${request.statusText}`);
    const data = await request.json();
    return data;
  }

  async createComment(
    item: Partial<Comment>,
    token: string,
    postId: string
  ): Promise<Comment> {
    const request = await fetch(`${this.urlBase}/add/${postId}`, {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        Authorization: 'Bearer ' + token,
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

  async update(
    id: string,
    item: Partial<Comment>,
    token: string
  ): Promise<Comment> {
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
