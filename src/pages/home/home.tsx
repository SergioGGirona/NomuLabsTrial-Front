import { Link } from 'react-router-dom';
import { Search } from '../../components/search/search';
import { useUsers } from '../../hooks/use.users';
import styles from './home.module.scss';
function Home() {
  const { userStatus, token } = useUsers();
  return (
    <>
      {userStatus === 'logged' && token.length > 15 ? (
        <main>
          <Search></Search>
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
