import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import userStore from '../stores/userStore';

function PrivateRoute() {
  return (
    <div>
      { userStore.user
          ? <Outlet/>
          : <Navigate to="/login"/>
      }
    </div>
  );
}

export default PrivateRoute;
