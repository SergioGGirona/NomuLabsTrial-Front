import { SyntheticEvent } from "react";
import styles from "./login.module.scss";

export function Login() {
  const handleSubmit = (ev: SyntheticEvent) => {
    ev.preventDefault();

    const formElement = ev.currentTarget as HTMLFormElement;
    const formData = new FormData(formElement);

    console.log(formData);
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <h3>Start sailing</h3>

      <div className={styles.formGroup}>
        <label htmlFor="userName" className={styles.label}>
          Username
        </label>
        <input
          type="text"
          id="userName"
          name="userName"
          className={styles.input}
          placeholder="Enter your username"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className={styles.input}
          placeholder="Enter your password"
          required
        />
      </div>

      <button type="submit" className={styles.submitButton}>
        Log in
      </button>
      <p>
        Not registered yet? <a href="#">Click here</a>
      </p>
    </form>
  );
}
