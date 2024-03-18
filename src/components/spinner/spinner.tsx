import styles from './spinner.module.scss';
import wheel from '/wheel.png';
export function Spinner() {
  return (
    <div className={styles.spinner}>
      <img
        className={styles.spinner_image}
        src={wheel}
        alt="Spinner of a wheel rotating"
      />
      <span>Full sail ahead, Captain!</span>
    </div>
  );
}
