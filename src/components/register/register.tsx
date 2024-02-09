import { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../../hooks/use.users';
import styles from './register.module.scss';

function Register() {
  const navigate = useNavigate();

  const { addUser, hasError } = useUsers();
  const [isPrivate, setIsPrivate] = useState(false);

  const handleCheckboxChange = () => {
    setIsPrivate((value) => !value);
  };
  const handleSubmit = (ev: SyntheticEvent) => {
    ev.preventDefault();

    const formElement = ev.currentTarget as HTMLFormElement;
    const formData = new FormData(formElement);
    formData.set('isPrivate', isPrivate.toString());

    addUser(formData);
    if (hasError === true) return;
    navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit}>
      <hgroup>
        <h3>Sign up here...</h3>
        <p>and enjoy taking recipes from all over the world.</p>
      </hgroup>

      <div className={styles['form__group']}>
        <input
          type="text"
          placeholder="Type a unique userName"
          name="userName"
          id="userName"
          required
        />

        <input
          type="password"
          id="password"
          placeholder="Choose a password"
          name="password"
          required
        />

        <input
          type="email"
          placeholder="Type your email"
          id="email"
          name="email"
          required
        />

        <input
          type="text"
          placeholder="Choose a cool nickName"
          id="nickName"
          name="nickName"
          required
        />

        <div className={styles['form__group-date']}>
          <label htmlFor="bornDate">Your birth date?</label>
          <input type="date" id="bornDate" name="bornDate" required />
        </div>
      </div>
      <fieldset>
        <div className={styles['form__group-private']}>
          <p>
            Want to make it <em>private</em>?
          </p>
          <div>
            <input
              type="checkbox"
              id="isPrivate"
              name="isPrivate"
              onChange={handleCheckboxChange}
              className={styles['form__group-check']}
            />
            <label htmlFor="isPrivate">Private</label>
          </div>
        </div>
      </fieldset>

      <div className={styles['form__group']}>
        <label htmlFor="avatar">Choose a photo for the reward poster</label>
        <input type="file" id="avatar" name="avatar" required />
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
