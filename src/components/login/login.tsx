import { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../../hooks/use.users';
import { UserLogin } from '../../model/user';
import styles from './login.module.scss';

function Login() {
  const { loginUser } = useUsers();

  const navigate = useNavigate();
  const handleSubmit = (ev: SyntheticEvent) => {
    ev.preventDefault();

    const form = ev.currentTarget as HTMLFormElement;
    const loginData: UserLogin = {
      userName: (form.elements.namedItem('userName') as HTMLInputElement).value,
      password: (form.elements.namedItem('password') as HTMLInputElement).value,
    };

    try {
      loginUser(loginData);
    } catch (error) {
      console.log(error);
    }
    navigate('/');
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
        Not registered yet? <a href="/register">Click here</a>
      </p>
    </form>
  );
}

export default Login;
