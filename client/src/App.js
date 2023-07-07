import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import PrivateRoute from './components/PrivateRoute';
import UserProfile from './components/UserProfile';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import AuthContext from './stores/AuthContext';

function App() {
  const [user, setUser] = useState(null);

  const resetUser = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={ { user, setUser, resetUser } }>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/register" element={ <RegisterForm/> }/>
          <Route path="/login" element={ <LoginForm/> }/>
          <Route path="/profile" element={ <PrivateRoute/> }>
            <Route index element={ <UserProfile/> }/>
          </Route>
        </Routes>
        <ToastContainer/>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
