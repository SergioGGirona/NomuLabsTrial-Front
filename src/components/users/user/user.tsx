import { MdDiamond } from 'react-icons/md';
import styles from './user.module.scss';

export function User() {
  return (
    <>
      <div className={styles.user__card}>
        <img src="" alt="user photo" />
        <div>
          <h4>user username</h4>
          <span>user nickname</span>
        </div>
        <p className={styles.user__post}>user post</p>
        <div>
          <p>You find it a treasure?</p>
          <button>
            <MdDiamond />
            Treasure found
          </button>
        </div>
      </div>
    </>
  );
}
