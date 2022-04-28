import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth.context';

const Dashboard = () => {
  const { isDriver } = useContext(AuthContext);
  if (isDriver) {
    return <Navigate to={'/lines'} />;
  }
  return <h1>Dashboard</h1>;
};

export default Dashboard;
