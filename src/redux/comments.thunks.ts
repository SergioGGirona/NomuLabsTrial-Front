import { createAsyncThunk } from '@reduxjs/toolkit';
import { Comment } from '../model/comment';
import { CommentsRepository } from '../repository/comments.repository';

export const loadThunk = createAsyncThunk<
  Comment[],
  { repository: CommentsRepository; postId: string }
>('comments/load', async ({ repository, postId }) => {
  const comments = await repository.getPostComments(postId);
  return comments;
});

export const addThunk = createAsyncThunk<
  Comment,
  {
    repository: CommentsRepository;
    newComment: Partial<Comment>;
    token: string;
    postId: string;
  }
>('comments/add', async ({ repository, newComment, token, postId }) => {
  const createdComment = await repository.createComment(
    newComment,
    token,
    postId
  );
  return createdComment;
});

export const eraseThunk = createAsyncThunk<
  Comment['id'],
  { repository: CommentsRepository; comment: Comment; token: string }
>('comments/erase', async ({ repository, comment, token }) => {
  await repository.delete(comment.id, token);
  return comment.id;
});
