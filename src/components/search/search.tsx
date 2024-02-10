import { FaSearch } from 'react-icons/fa';
import { Users } from '../users/users';
import styles from './search.module.scss';

function Search() {
  return (
    <section className={styles.search__page}>
      <form action="" className={styles.search__form}>
        <input type="search" placeholder="Who are you looking for?" />
        <button type="submit" className={styles.submit__Button}>
          <FaSearch />
        </button>
      </form>
      <Users />
    </section>
  );
}
export default Search;
