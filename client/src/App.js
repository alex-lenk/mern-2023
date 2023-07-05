import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import PrivateRoute from './components/PrivateRoute';
import Profile from './components/Profile';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/register" element={ <RegisterForm/> }/>
        <Route path="/login" element={ <LoginForm/> }/>
        <Route path="/profile" element={ <PrivateRoute/> }>
          <Route index element={ <Profile/> }/>
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
