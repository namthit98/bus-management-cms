import { useQuery } from 'react-query';
import Cookies from 'js-cookie';
import RequiredAuth from './components/RequiredAuth';
import MainLayout from './components/layouts/MainLayout';
import BlankLayout from './components/layouts/BlankLayout';
import NotFound from './components/ui/NotFound';
import Dashboard from './pages/Dashboard';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/auth/login';
import { AuthContext } from './contexts/auth.context';
import { useContext, useState } from 'react';
import AuthService from './services/auth.service';
import { TOKEN_KEY } from './const';
import PageLoading from './components/ui/PageLoading';
import { CommonContext } from './contexts/common.context';
import ChangePassword from './pages/user/change-password';
import Profile from './pages/user/profile';
import UserPage from './pages/user/user';
import UpdateUserPage from './pages/user/update';
import RoutePage from './pages/route/route';
import UpdateRoutePage from './pages/route/update';
import CoachPage from './pages/coach/coach';
import UpdateCoachPage from './pages/coach/update';
import LinePage from './pages/line/line';
import LineDetail from './pages/line/line-detail';
import CustomerPage from './pages/customer/customer';
import UpdateCustomerPage from './pages/customer/update';

function App() {
  const { dispatch } = useContext(AuthContext);
  const { loading } = useContext(CommonContext);
  const [lock, setLock] = useState(false);

  const meQuery = useQuery(
    ['me'],
    () => {
      return AuthService.me().then((res) => res.data);
    },
    {
      enabled: !lock,
      retry: 1,
      onSuccess: (data) => {
        setLock(true);
        dispatch({
          type: 'USER_LOGIN',
          payload: { user: data, token: Cookies.get(TOKEN_KEY) },
        });
      },
      onError: () => {
        setLock(true);
        // Cookies.remove(TOKEN_KEY);
      },
    }
  );

  if (meQuery.isLoading) {
    return <PageLoading />;
  }

  return (
    <>
      {loading ? <PageLoading /> : null}
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={
              <RequiredAuth>
                <Dashboard />
              </RequiredAuth>
            }
          />

          <Route
            path="/change-password"
            element={
              <RequiredAuth>
                <ChangePassword />
              </RequiredAuth>
            }
          />

          <Route
            path="/profile"
            element={
              <RequiredAuth>
                <Profile />
              </RequiredAuth>
            }
          />

          <Route
            path="/users"
            element={
              <RequiredAuth>
                <UserPage />
              </RequiredAuth>
            }
          />

          <Route
            path="/users/:userId/update"
            element={
              <RequiredAuth>
                <UpdateUserPage />
              </RequiredAuth>
            }
          />

          <Route
            path="/customers"
            element={
              <RequiredAuth>
                <CustomerPage />
              </RequiredAuth>
            }
          />

          <Route
            path="/customers/:customerId/update"
            element={
              <RequiredAuth>
                <UpdateCustomerPage />
              </RequiredAuth>
            }
          />

          <Route
            path="/routes"
            element={
              <RequiredAuth>
                <RoutePage />
              </RequiredAuth>
            }
          />

          <Route
            path="/routes/:routeId/update"
            element={
              <RequiredAuth>
                <UpdateRoutePage />
              </RequiredAuth>
            }
          />

          <Route
            path="/coaches"
            element={
              <RequiredAuth>
                <CoachPage />
              </RequiredAuth>
            }
          />

          <Route
            path="/coaches/:coachId/update"
            element={
              <RequiredAuth>
                <UpdateCoachPage />
              </RequiredAuth>
            }
          />

          <Route
            path="/lines"
            element={
              <RequiredAuth>
                <LinePage />
              </RequiredAuth>
            }
          />

          <Route
            path="/lines/:lineId"
            element={
              <RequiredAuth>
                <LineDetail />
              </RequiredAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/login" element={<BlankLayout />}>
          <Route index element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
