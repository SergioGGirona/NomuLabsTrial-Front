import { Link } from 'react-router-dom';
import styles from './preLogin.module.scss';
export function PreLogin() {
  return (
    <div className={styles['pre-login']}>
      <h2>A sea of adventures awaits!</h2>
      <p>But you must be logged in to navigate these waters. </p>
      <Link className={styles.link} to={'/login'}>
        On board!
      </Link>
    </div>
  );
}
