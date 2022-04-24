import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import UserService from '../../services/user.service';
import handleErrors from '../../libs/handle-error';
import { toast } from 'react-toastify';

const schema = yup.object({
  password: yup.string().required('Password is required'),
  newpassword: yup.string().required('New Password is required'),
  renewpassword: yup
    .string()
    .oneOf([yup.ref('newpassword'), null], 'Re-new Passwords must match'),
});

const ChangePassword = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      password: '',
      newpassword: '',
      renewpassword: '',
    },
  });

  const onSubmit = (data) => {
    UserService.changePassword(data)
      .then((res) => {
        toast.success('Update password successfully!');
        reset();
      })
      .catch((err) => {
        handleErrors(err);
      });
  };

  return (
    <>
      <Typography variant="h5" component="h5">
        Change password
      </Typography>
      <Box
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        noValidate
        sx={{
          mt: 1,
          width: {
            xs: '100%',
            md: '50%',
          },
          mx: 'auto',
        }}
      >
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              margin="normal"
              fullWidth
              required
              label="Password"
              type="password"
              error={Boolean(errors.password)}
              helperText={errors?.password?.message || ''}
              {...field}
            />
          )}
        />

        <Controller
          name="newpassword"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              required
              margin="normal"
              label="New Password"
              type="password"
              error={Boolean(errors.newpassword)}
              helperText={errors?.newpassword?.message || ''}
              {...field}
            />
          )}
        />

        <Controller
          name="renewpassword"
          control={control}
          render={({ field }) => (
            <TextField
              margin="normal"
              fullWidth
              required
              label="Re-new Password"
              type="password"
              error={Boolean(errors.renewpassword)}
              helperText={errors?.renewpassword?.message || ''}
              {...field}
            />
          )}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Update
        </Button>
      </Box>
    </>
  );
};

export default ChangePassword;
