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
    { path: '/*', label: 'ErrorPage' },
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
