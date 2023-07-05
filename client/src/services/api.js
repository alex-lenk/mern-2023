import axios from 'axios';

export const register = (email, password) => {
  return axios.post('/register', { email, password });
};

export const login = (email, password) => {
  return axios.post('/login', { email, password });
};

export const getProfile = () => {
  return axios.get('/profile');
};

export const updateProfile = (email) => {
  return axios.put('/profile', { email });
};
