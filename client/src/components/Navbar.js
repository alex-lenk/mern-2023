import React from 'react';
import { Link } from 'react-router-dom';
import userStore from '../stores/userStore';

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      {userStore.user ? (
        <>
          <Link to="/profile">Profile</Link>
          <button onClick={() => userStore.setUser(null)}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
