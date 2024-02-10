import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { GiTreasureMap } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../../hooks/use.users';
import styles from './profile.module.scss';
function Profile() {
  const navigate = useNavigate();
  const { userLogged } = useUsers();

  if (!userLogged) {
    navigate('/login');
  } else {
    return (
      <section>
        <div className={styles.profile__photo}>
          <h2>Your pirate profile</h2>
          <button>Edit</button>
        </div>
        <div className={styles['user__main-data']}>
          <img
            src={userLogged.avatar.url}
            alt="Profile image of the logged user"
          />
          <hgroup>
            <h3>{userLogged.nickName}</h3>
            <p>{userLogged.userName}</p>
          </hgroup>
        </div>
        <div className={styles.user__data}>
          <h4>Your data</h4>
          <span>{userLogged.email}</span>

          <p className={styles.follow}>
            You follow <em>{userLogged.usersFollowed.length}</em> mateys
          </p>
          <p className={styles.follow}>
            <em>{userLogged.followers.length}</em> mateys follow you
          </p>

          <div className={styles.profile__bio}>
            <span>
              <GiTreasureMap />
              Your pirate story:
            </span>
            <p>{userLogged.bio}</p>
          </div>

          <p className={styles.profile__type}>
            Your profile is
            {userLogged.isPrivate === true ? (
              <div className={styles.profile__type_icon}>
                <BsFillEyeSlashFill />
                <span>Private</span>
              </div>
            ) : (
              <div className={styles.profile__type_icon}>
                <BsFillEyeFill />
                <span>Public</span>
              </div>
            )}
          </p>
        </div>
      </section>
    );
  }
}

export default Profile;
