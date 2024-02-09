import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RoutesOptions } from '../types/routes';

const Register = lazy(() => import('../components/register/register'));
const Login = lazy(() => import('../components/login/login'));

type Props = {
  readonly options: RoutesOptions[];
};
export function AppRouter({ options }: Props) {
  const paths = options.map((item) => item.path);

  return (
    <Suspense>
      <Routes>
        <Route path={paths[1]} element={<Register></Register>}></Route>
        <Route path={paths[2]} element={<Login></Login>}></Route>
      </Routes>
    </Suspense>
  );
}
