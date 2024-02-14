import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useUsers } from '../../hooks/use.users';
import { UserCard } from '../userCard/userCard';
import styles from './search.module.scss';

function Search() {
  const { userStatus, token, searchFollowers, usersSearched } = useUsers();

  const handleSearch = (searchTerm: string) => {
    const inputElement = (
      document.querySelector(searchTerm) as HTMLInputElement
    ).value.toLocaleLowerCase();

    searchFollowers(inputElement);
  };

  return (
    <>
      {userStatus === 'logged' && token.length > 15 ? (
        <main>
          <div className={styles.search}>
            <input
              type="search"
              id="searchTerm"
              placeholder="Who are you looking for?"
            />
            <button onClick={() => handleSearch('#searchTerm')}>
              <FaSearch />
            </button>
          </div>
          <ul>
            {usersSearched.map((item) => (
              <UserCard key={item.id} user={item}></UserCard>
            ))}
          </ul>

          <div className={styles.finish}>
            <h3 className={styles.finish__title}>Arr matey!</h3>
            <p>No more scallywags found. Look for another matteys</p>
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
export default Search;
