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
import { Grid } from '@mui/material';

const schema = yup.object({
  password: yup.string().required('Password is required'),
  newpassword: yup.string().required('New Password is required'),
  renewpassword: yup
    .string()
    .oneOf([yup.ref('newpassword'), null], 'Re-new Passwords must match'),
});

const Profile = () => {
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
        Profile
      </Typography>
      <Box
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        noValidate
        sx={{
          mt: 1,
          mx: 'auto',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Controller
              name="fullname"
              control={control}
              render={({ field }) => (
                <TextField
                  margin="normal"
                  fullWidth
                  label="Fullname"
                  error={Boolean(errors.fullname)}
                  helperText={errors?.fullname?.message || ''}
                  {...field}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  margin="normal"
                  fullWidth
                  label="Email"
                  error={Boolean(errors.email)}
                  helperText={errors?.email?.message || ''}
                  {...field}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="identification"
              control={control}
              render={({ field }) => (
                <TextField
                  margin="normal"
                  fullWidth
                  label="Identification"
                  error={Boolean(errors.identification)}
                  helperText={errors?.identification?.message || ''}
                  {...field}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="birthday"
              control={control}
              render={({ field }) => (
                <TextField
                  margin="normal"
                  fullWidth
                  label="Birthday"
                  error={Boolean(errors.birthday)}
                  helperText={errors?.birthday?.message || ''}
                  {...field}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  margin="normal"
                  fullWidth
                  label="Phone"
                  error={Boolean(errors.phone)}
                  helperText={errors?.phone?.message || ''}
                  {...field}
                />
              )}
            />
          </Grid>
        </Grid>

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

export default Profile;
