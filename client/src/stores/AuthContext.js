import { createContext } from 'react';

const AuthContext = createContext({
  user: null,
  setUser: () => {
  },
  resetUser: () => {
  },
});

export default AuthContext;
