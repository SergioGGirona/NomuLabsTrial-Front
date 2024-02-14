import { Link } from 'react-router-dom';
import styles from './header.module.scss';

export function Header() {
  return (
    <header className={styles['mainHeader']}>
      <Link to={'/'}>
        <img src="./favicon.png" alt="Logo of Coockbook" />
      </Link>

      <div>
        <h1>Cookbook</h1>
        <p>Recipes for pirate chefs</p>
      </div>
    </header>
  );
}
