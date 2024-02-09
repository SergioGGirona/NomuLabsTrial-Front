import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RoutesOptions } from '../types/routes';

const Register = lazy(() => import('../components/register/register'));
const Login = lazy(() => import('../components/login/login'));

const Home = lazy(() => import('../pages/home/home'));

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
      </Routes>
    </Suspense>
  );
}
