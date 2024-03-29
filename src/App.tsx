import './App.css';
import { Header } from './components/header/header.js';
import { Menu } from './components/menu/menu.js';
import { AppRouter } from './routes/app.routes.js';
import { RoutesOptions } from './types/routes.js';
function App() {
  const RoutesOptions: RoutesOptions[] = [
    { path: '/', label: 'Home' },
    { path: '/register', label: 'Register' },
    { path: '/login', label: 'Login' },
    { path: '/profile', label: 'Profile' },
    { path: '/search', label: 'Search' },
    { path: '/update', label: 'Update' },
    { path: '/post', label: 'Post' },
    { path: '/post/:id', label: 'PostDetail' },
    { path: '/updatePost/:id', label: 'updatePost' },
  ];

  return (
    <>
      <Header />
      <AppRouter options={RoutesOptions} />
      <Menu />
      <div className="menuSlot"></div>
    </>
  );
}

export default App;
