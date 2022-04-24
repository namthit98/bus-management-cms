import Cookies from 'js-cookie';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate, Navigate } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import handleErrors from '../../libs/handle-error';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth.context';
import { authStateDefault } from '../../providers/auth.provider';
import { TOKEN_KEY } from '../../const';

const LoginPage = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    AuthService.login({
      username: data.get('username'),
      password: data.get('password'),
    })
      .then((res) => {
        if (res && res.data) {
          dispatch({ type: 'USER_LOGIN', payload: res.data });
          Cookies.set(TOKEN_KEY, res.data.token);
          navigate('/');
        }
      })
      .catch((err) => {
        handleErrors(err);
        dispatch({ type: 'USER_LOGIN', payload: authStateDefault });
      });
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
