import { FaBell, FaCompass, FaSkullCrossbones } from 'react-icons/fa';
import { TbNavigationFilled } from 'react-icons/tb';

import { Link } from 'react-router-dom';
import { useUsers } from '../../hooks/use.users';
import styles from './menu.module.scss';
export function Menu() {
  const { userStatus } = useUsers();

  return (
    <nav className={styles.nav}>
      <ul>
        {userStatus === 'logged' ? (
          <li>
            <FaSkullCrossbones />
            <Link className={styles['link']} to="/Login">
              Profile
            </Link>
          </li>
        ) : (
          <li>
            <TbNavigationFilled />
            <Link className={styles['link']} to="/Login">
              Log in
            </Link>
          </li>
        )}

        <li>
          <FaCompass />
          <Link className={styles['link']} to="/">
            Discover
          </Link>
        </li>

        <li>
          <FaBell />
          <Link className={styles['link']} to="/">
            Alerts
          </Link>
        </li>
      </ul>
    </nav>
  );
}
