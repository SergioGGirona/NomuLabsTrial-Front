import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RoutesOptions } from '../types/routes';

const Register = lazy(() => import('../components/register/register'));
const Login = lazy(() => import('../components/login/login'));

const Home = lazy(() => import('../pages/home/home'));
const Profile = lazy(() => import('../pages/profile/profile'));
const Search = lazy(() => import('../components/search/search'));
const Update = lazy(() => import('../components/profileForm/profileForm'));
const NewPost = lazy(() => import('../components/postForm/postForm'));
const PostDetail = lazy(
  () => import('../components/posts/post/postDetail/postDetail')
);
const UpdatePost = lazy(() => import('../components/updatePost/updatePost'));

type Props = {
  readonly options: RoutesOptions[];
};
export function AppRouter({ options }: Props) {
  const paths = options.map((item) => item.path);

  return (
    <Suspense>
      <Routes>
        <Route path={paths[0]} element={<Home />}></Route>
        <Route path={paths[1]} element={<Register />}></Route>
        <Route path={paths[2]} element={<Login />}></Route>
        <Route path={paths[3]} element={<Profile />}></Route>
        <Route path={paths[4]} element={<Search />}></Route>
        <Route path={paths[5]} element={<Update />}></Route>
        <Route path={paths[6]} element={<NewPost />}></Route>
        <Route path={paths[7]} element={<PostDetail />}></Route>
        <Route path={paths[8]} element={<UpdatePost />}></Route>
      </Routes>
    </Suspense>
  );
}
