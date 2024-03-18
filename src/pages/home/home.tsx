import { Link } from 'react-router-dom';
import { Posts } from '../../components/posts/posts';
import { Spinner } from '../../components/spinner/spinner';
import { usePosts } from '../../hooks/use.posts';
import { useUsers } from '../../hooks/use.users';
import styles from './home.module.scss';
function Home() {
  const { userStatus, token } = useUsers();
  const { postStatus } = usePosts();

  return (
    <>
      {userStatus === 'pending' || (postStatus === 'loading' && <Spinner />)}
      {userStatus === 'logged' && token.length > 15 ? (
        <main>
          <Posts />
          <div className={styles.finish}>
            <p className={styles.finish__title}>Arr matey! Finished already?</p>
            <p>Time to find more scallywags to follow and try out recipes.</p>
          </div>
        </main>
      ) : (
        <div className={styles['pre-login']}>
          <h2>A sea of adventures awaits!</h2>
          <p>But you must be logged in to navigate these waters. </p>
          <Link className={styles.link} to={'/login'}>
            On board!
          </Link>
        </div>
      )}
    </>
  );
}

export default Home;
