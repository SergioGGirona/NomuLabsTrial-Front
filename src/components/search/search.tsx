import styles from './search.module.scss';
export function Search() {
  return (
    <form action="" className={styles.search__form}>
      <input type="text" placeholder="Who are you looking for?" />
      <button type="submit" className={styles.submit__Button}>
        Search
      </button>
    </form>
  );
}
