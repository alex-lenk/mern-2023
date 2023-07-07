import { useContext } from 'react';
import AuthContext from '../stores/AuthContext';

function UserProfile() {
  const { user, resetUser } = useContext(AuthContext);

  const handleLogout = () => {
    resetUser();
  };

  return (
    <div>
      <h1>User Profile</h1>
      <p>Email: { user.email }</p>
      <button onClick={ handleLogout }>Logout</button>
    </div>
  );
}

export default UserProfile;
