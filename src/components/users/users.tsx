import { User } from './user/user';
import styles from './users.module.scss';

export function Users() {
  return (
    <ul className={styles.users}>
      <User></User>
    </ul>
  );
}
