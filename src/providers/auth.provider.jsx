import { useReducer } from 'react';
import { AuthContext } from '../contexts/auth.context';

export const authStateDefault = {
  token: '',
  user: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'USER_LOGIN':
      return action.payload;
    case 'USER_LOGOUT':
      return authStateDefault;
    default:
      return authStateDefault;
  }
}

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, authStateDefault);
  const user = state?.user || null;
  const token = state?.token || '';

  const isAdmin = user?.role === 'admin'
  const isStaff = user?.role === 'staff'
  const isDriver = user?.role === 'driver'

  const exportData = {
    user,
    token,
    isAdmin,
    isStaff,
    isDriver,
    dispatch,
  };

  return (
    <AuthContext.Provider value={exportData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
