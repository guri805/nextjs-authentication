
import { use } from 'react';
import { getUser, verifySession } from '../lib/dal';
import { logout } from '../action/auth';


const Profile = () => {
  const session = use(verifySession());
  const userData = use(getUser());
  console.log(session);
  console.log(userData);
  
  
  const userRole = session?.role;

  return (
    <div>
      <p>Profile</p>
      <p>Role: {userRole === 0 ? 'User' : 'Admin'}</p>
      {userData && (
        <div>
          <p>User Data:</p>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
      )}
      {/* <button onClick={logout} className="bg-blue-500 p-3 border">
        logout
      </button> */}
      hii
    </div>
  );
};

export default Profile;
