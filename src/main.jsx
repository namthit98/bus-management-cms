import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import App from './App';
import './index.css';
import { CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from './providers/auth.provider';
import CommonProvider from './providers/common.provider';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <CommonProvider>
          <AuthProvider>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <App />
            </LocalizationProvider>
          </AuthProvider>
        </CommonProvider>
        <ToastContainer limit={3} />
        <CssBaseline />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
