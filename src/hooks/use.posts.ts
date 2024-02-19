import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../model/post.ts';
import {
  addThunk,
  eraseThunk,
  loadThunk,
  updateThunk,
} from '../redux/posts.thunks';
import { PostsRepository } from '../repository/posts.repository';
import { AppDispatch, RootState } from './store.ts';
import { urlBase, useUsers } from './use.users.ts';

export const urlPosts = urlBase + 'posts';

export function usePosts() {
  const { token } = useUsers();
  const repository = useMemo(() => new PostsRepository(urlPosts), []);

  const postsState = useSelector((state: RootState) => state.postsState);
  const postsDispatch = useDispatch<AppDispatch>();

  const loadPosts = useCallback(async () => {
    postsDispatch(loadThunk(repository));
  }, [repository, postsDispatch]);

  const addPost = async (newPost: FormData) => {
    postsDispatch(addThunk({ repository, newPost, token }));
  };

  const updatePost = async (post: Partial<Post>, id: string, token: string) => {
    postsDispatch(updateThunk({ repository, post, id, token }));
  };

  const erasePost = async (post: Post) => {
    postsDispatch(eraseThunk({ repository, post, token }));
  };
  return {
    posts: postsState.posts,
    postStatus: postsState.postsStatus,
    hasError: postsState.hasGoneWrong,
    loadPosts,
    addPost,
    updatePost,
    erasePost,
  };
}
