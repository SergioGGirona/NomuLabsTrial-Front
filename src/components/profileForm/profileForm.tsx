import { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../../hooks/use.users';
import { User } from '../../model/user';
import styles from './profileForm.module.scss';
function ProfileForm() {
  const { userLogged, updateUser, token } = useUsers();
  const navigate = useNavigate();
  const [isPrivate, setIsPrivate] = useState<boolean>(
    userLogged?.isPrivate || false
  );

  const handleCheckboxChange = () => {
    setIsPrivate((value) => !value);
  };

  const handleSubmit = async (ev: SyntheticEvent) => {
    if (!userLogged) throw new Error();
    ev.preventDefault();
    const formElement = ev.currentTarget as HTMLFormElement;
    const userData: Partial<User> = {
      nickName:
        (formElement.elements.namedItem('nickName') as HTMLFormElement).value ||
        userLogged?.nickName,
      bio:
        (formElement.elements.namedItem('bio') as HTMLFormElement).value ||
        userLogged?.bio,
      isPrivate: isPrivate,
    };
    await updateUser(userData, userLogged.id, token);
    navigate('/');
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form__update}>
      <h2>Update your reward info:</h2>
      <span>You will have to re-login to update</span>
      <div>
        <label htmlFor="nickName">Wanna change your nickName?</label>
        <input
          type="text"
          placeholder={userLogged?.nickName}
          name="nickName"
          id="nickName"
        />
      </div>

      <div>
        <label htmlFor="bio">Wanna change your bio?</label>
        <textarea
          rows={5}
          cols={10}
          placeholder={userLogged?.bio}
          name="bio"
          id="bio"
          className={styles['form__update-bio']}
        />
      </div>

      <fieldset>
        <div className={styles['form__group-private']}>
          <p>Wanna change the privacy?</p>
          <div>
            <input
              type="checkbox"
              id="isPrivate"
              name="isPrivate"
              checked={isPrivate}
              onChange={handleCheckboxChange}
              className={styles['form__group-check']}
            />
            <label htmlFor="isPrivate">Private</label>
          </div>
        </div>
      </fieldset>
      <button type="submit">Update</button>
    </form>
  );
}
export default ProfileForm;
