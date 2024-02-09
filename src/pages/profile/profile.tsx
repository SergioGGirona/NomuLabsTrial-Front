import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { GiTreasureMap } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../../hooks/use.users';

function Profile() {
  const navigate = useNavigate();
  const { userLogged } = useUsers();

  if (!userLogged) {
    navigate('/login');
  } else {
    return (
      <section>
        <h2>Your profile</h2>
        <img
          src={userLogged.avatar.url}
          alt="Profile image of the logged user"
        />
        <hgroup>
          <h3>{userLogged.nickName}</h3>
          <p>{userLogged.userName}</p>
        </hgroup>
        <div>
          <h4>Your data</h4>
          <span>{userLogged.email}</span>

          <p>
            You follow <em>{userLogged.usersFollowed.length}</em> mateys
          </p>
          <p>
            <em>{userLogged.followers.length}</em> mateys follow you
          </p>

          <span>
            <GiTreasureMap />
            Your pirate story
          </span>
          <p>{userLogged.bio}</p>

          <p>
            Your profile is
            {userLogged.isPrivate === true ? (
              <span>
                <BsFillEyeSlashFill />
                Private
              </span>
            ) : (
              <span>
                <BsFillEyeFill />
                Public
              </span>
            )}
          </p>
        </div>
      </section>
    );
  }
}

export default Profile;
