import { useEffect, useState } from 'react';
import { MdDiamond } from 'react-icons/md';
import { useUsers } from '../../hooks/use.users';
import { User } from '../../model/user';
import styles from './userCard.module.scss';

type Props = {
  user: User;
};
export function UserCard({ user }: Props) {
  const { userLogged, followUser, unfollowUser } = useUsers();

  const [isUserFollowed, setIsUserFollowed] = useState<boolean>(false);

  useEffect(() => {
    if (userLogged && userLogged.followers) {
      const isFollowed = userLogged.followers.some(
        (followedUser) => followedUser.id === user.id
      );
      setIsUserFollowed(isFollowed);
    }
  }, [userLogged, user]);
  const handleFollow = async () => {
    if (userLogged) {
      await followUser(user);
      setIsUserFollowed(true);
    }
  };

  const handleUnfollow = async () => {
    if (userLogged) {
      await unfollowUser(user);
      setIsUserFollowed(false);
    }
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
        id={`follow-button-${user.id}`}
        className={styles.button__follow}
        onClick={isUserFollowed ? handleUnfollow : handleFollow}
      >
        <MdDiamond />
        {isUserFollowed ? 'Unfollow' : 'Follow'}
      </button>
    </li>
  );
}
