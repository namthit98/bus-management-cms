import MainLayout from './components/layouts/MainLayout';
import BlankLayout from './components/layouts/BlankLayout';
import NotFound from './components/ui/NotFound';
import Dashboard from './pages/Dashboard';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/auth/login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="/login" element={<BlankLayout />}>
        <Route index element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
