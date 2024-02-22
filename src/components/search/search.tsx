import { FaSearch } from 'react-icons/fa';
import { useUsers } from '../../hooks/use.users';
import { PreLogin } from '../preLogin/preLogin';
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch('#searchTerm');
    }
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
              required={true}
              onKeyDown={handleKeyDown}
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
        <PreLogin></PreLogin>
      )}
    </>
  );
}
export default Search;
