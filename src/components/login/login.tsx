import { SyntheticEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../../hooks/use.users';
import { UserLogin } from '../../model/user';
import styles from './login.module.scss';

function Login() {
  const { loginUser, userStatus, hasError } = useUsers();

  const navigate = useNavigate();

  useEffect(() => {
    if (userStatus === 'logged') {
      navigate('/');
    }
  }, [userStatus, navigate]);

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
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit} role="form">
      <h3>Start sailing</h3>
      {userStatus === 'error' && hasError === true ? (
        <span className={styles.errorLogin}>
          Nombre de usuario o contraseña incorrectos
        </span>
      ) : (
        <></>
      )}
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
          autoComplete="on"
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
        Not in our crew? <a href="/register">Register here</a>
      </p>
    </form>
  );
}

export default Login;
