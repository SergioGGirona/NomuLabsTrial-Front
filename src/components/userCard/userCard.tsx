import { MdDiamond } from 'react-icons/md';
import { useUsers } from '../../hooks/use.users';
import { User } from '../../model/user';
import styles from './userCard.module.scss';

type Props = {
  user: User;
};
export function UserCard({ user }: Props) {
  const { userLogged, updateUser, token } = useUsers();

  const handleFollow = async (user: User) => {
    user.followers.push(userLogged!);
    console.log('user:', user);
    updateUser(user, user.id, token);
    userLogged!.usersFollowed.push(user);
    updateUser(userLogged!, userLogged!.id, token);
  };
  return (
    <li className={styles.user__card}>
      <div className={styles.user__card__main}>
        <img src={user.avatar.url} alt="user photo" />
        <div className={styles.user__card__names}>
          <h4>{user.nickName}</h4>
          <span>{user.userName}</span>
        </div>
      </div>
      <div className={styles.user__card__followers}>
        <p className={styles['user__card__followers-post']}>
          {user.usersFollowed.length} mateys
        </p>
        <p className={styles['user__card__followers-post']}>
          {user.followers.length} followers
        </p>
      </div>

      <button
        className={styles.button__follow}
        onClick={() => {
          handleFollow(user);
        }}
      >
        <MdDiamond />
        Follow
      </button>
    </li>
  );
}
