import { FaSearch } from 'react-icons/fa';
import styles from './search.module.scss';

export function Search() {
  return (
    <form action="" className={styles.search__form}>
      <input type="search" placeholder="Who are you looking for?" />
      <button type="submit" className={styles.submit__Button}>
        <FaSearch />
      </button>
    </form>
  );
}
