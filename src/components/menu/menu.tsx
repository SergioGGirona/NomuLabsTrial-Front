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
            <Link className={styles['link']} to="/Login">
              <FaSkullCrossbones />
              Profile
            </Link>
          </li>
        ) : (
          <li>
            <Link className={styles['link']} to="/Login">
              <TbNavigationFilled />
              Log in
            </Link>
          </li>
        )}

        <li>
          <Link className={styles['link']} to="/">
            <FaCompass />
            Discover
          </Link>
        </li>

        <li>
          <Link className={styles['link']} to="/">
            <FaBell />
            Alerts
          </Link>
        </li>
      </ul>
    </nav>
  );
}
