import { useEffect, useState } from 'react';
import {
  BsEraserFill,
  BsFillEyeFill,
  BsFillEyeSlashFill,
} from 'react-icons/bs';
import { FaRegEdit } from 'react-icons/fa';
import { GiTreasureMap } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { PreLogin } from '../../components/preLogin/preLogin';
import { usePosts } from '../../hooks/use.posts';
import { useUsers } from '../../hooks/use.users';
import styles from './profile.module.scss';

function Profile() {
  const { userLogged } = useUsers();
  const { erasePost, loadPosts, posts } = usePosts();
  const [postIdToDelete, setPostIdToDelete] = useState<string | null>(null);

  if (!userLogged) {
    return <PreLogin></PreLogin>;
  }

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const userPosts = posts.filter((post) => post.author.id === userLogged.id);

  const confirmDelete = (postId: string) => {
    setPostIdToDelete(postId);
  };

  const handleDelete = () => {
    if (postIdToDelete) {
      const postToDelete = posts.find((post) => post.id === postIdToDelete);
      if (postToDelete) {
        erasePost(postToDelete);
      }
      setPostIdToDelete(null);
    }
  };

  return (
    <section>
      <div className={styles.profile__photo}>
        <h2>Your pirate profile</h2>
        <Link to="/update" className={styles.profile__update}>
          Edit
        </Link>
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

        <span className={styles.profile__type}>
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
        </span>
      </div>
      <div className={styles.user__posts}>
        <h4>Your posts:</h4>
        <ul>
          {userPosts.map((post) => {
            return (
              <li key={post.id}>
                <div className={styles['post-details']}>
                  <h5>{post.overview}</h5>
                  <span>{post.aproxTime} minutes</span>
                </div>
                <div className={styles['post-buttons']}>
                  <button>
                    <FaRegEdit />
                  </button>
                  <button onClick={() => confirmDelete(post.id)}>
                    <BsEraserFill />
                  </button>
                  {postIdToDelete === post.id && (
                    <div className={styles.modal}>
                      <p>Do you want to throw this post to the sharks??</p>
                      <div className={styles.modal__buttons}>
                        <button onClick={() => setPostIdToDelete(null)}>
                          Back
                        </button>
                        <button onClick={handleDelete}>Yes, delete</button>
                      </div>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default Profile;
