import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Comment } from '../model/comment.ts';
import { addThunk, eraseThunk, loadThunk } from '../redux/comments.thunks';
import { CommentsRepository } from '../repository/comments.repository';
import { AppDispatch, RootState, urlBase } from './store.ts';
import { useUsers } from './use.users.ts';

export const urlComments = urlBase + 'comments';

export function useComments() {
  const { token } = useUsers();
  const repository = useMemo(() => new CommentsRepository(urlComments), []);

  const commentsState = useSelector((state: RootState) => state.commentsState);
  const commentsDispatch = useDispatch<AppDispatch>();

  const loadComments = useCallback(
    async (postId: string) => {
      commentsDispatch(loadThunk({ repository, postId }));
    },
    [repository, commentsDispatch]
  );

  const addComment = async (newComment: Partial<Comment>, postId: string) => {
    commentsDispatch(addThunk({ repository, newComment, token, postId }));
  };

  const eraseComment = async (comment: Comment) => {
    commentsDispatch(eraseThunk({ repository, comment, token }));
  };

  return {
    comments: commentsState.comments,
    commentstatus: commentsState.commentsStatus,
    hasError: commentsState.hasGoneWrong,
    loadComments,
    addComment,
    eraseComment,
  };
}
