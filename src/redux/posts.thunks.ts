import { createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../model/post';
import { PostsRepository } from '../repository/posts.repository';

export const loadThunk = createAsyncThunk<Post[], PostsRepository>(
  'posts/load',
  async (repository) => {
    const posts = await repository.getAll();
    return posts;
  }
);

export const addThunk = createAsyncThunk<
  Post,
  { repository: PostsRepository; newPost: FormData; token: string }
>('posts/add', async ({ repository, newPost, token }) => {
  const createdPost = await repository.create(newPost, token);
  return createdPost;
});

export const updateThunk = createAsyncThunk<
  Post,
  {
    repository: PostsRepository;
    id: string;
    post: Partial<Post>;
    token: string;
  }
>('posts/update', async ({ repository, id, post, token }) => {
  const updatedPost = await repository.update(id, post, token);
  return updatedPost;
});

export const eraseThunk = createAsyncThunk<
  Post['id'],
  { repository: PostsRepository; post: Post; token: string }
>('posts/erase', async ({ repository, post, token }) => {
  await repository.delete(post.id, token);
  return post.id;
});
