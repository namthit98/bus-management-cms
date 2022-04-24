import * as yup from 'yup';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PageLoading from '../../components/ui/PageLoading';
import { toast } from 'react-toastify';
import { Grid, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import UserService from '../../services/user.service';
import handleErrors from '../../libs/handle-error';

const schema = yup.object({
  username: yup.string().required('Username is required'),
  fullname: yup.string().required('Fullname is required'),
  phone: yup.number().required('Phone is required'),
  role: yup.string().required('Role is required'),
});

const UpdateUserPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      birthday: null,
    },
  });
  const userQueryData = useQuery(
    ['users', params.userId],
    () => {
      return UserService.findOne(params.userId).then((res) => res.data);
    },
    {
      onSuccess: (data) => {
        setValue('username', data?.username);
        setValue('fullname', data?.fullname);
        setValue('email', data?.email);
        setValue('phone', data?.phone);
        setValue('birthday', data?.birthday);
        setValue('identification', data?.identification);
        setValue('role', data?.role);
      },
      onError: () => {
        toast.error('Load user data failed');
      },
    }
  );

  const onSubmit = (data) => {
    UserService.update(params.userId, data)
      .then((res) => {
        toast.success('Update user successfully!');
      })
      .catch((err) => {
        handleErrors(err);
      });
  };

  if (userQueryData.isLoading) {
    return <PageLoading />;
  }

  return (
    <>
      <Typography variant="h5" component="h5">
        <IconButton aria-label="delete" onClick={() => navigate('/users')}>
          <ChevronLeftIcon />
        </IconButton>
        &nbsp;&nbsp;&nbsp;
        <span>Update User Info</span>
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
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  disabled
                  margin="normal"
                  fullWidth
                  required
                  label="Username"
                  error={Boolean(errors.username)}
                  helperText={errors?.username?.message || ''}
                  {...field}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  margin="normal"
                  fullWidth
                  label="Password"
                  type="password"
                  error={Boolean(errors.password)}
                  helperText={errors?.password?.message || ''}
                  {...field}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="fullname"
              control={control}
              render={({ field }) => (
                <TextField
                  margin="normal"
                  fullWidth
                  required
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
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  margin="normal"
                  fullWidth
                  required
                  label="Phone"
                  type="number"
                  error={Boolean(errors.phone)}
                  helperText={errors?.phone?.message || ''}
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
                <DatePicker
                  clearable
                  inputFormat="DD/MM/YYYY"
                  label="Birthday"
                  renderInput={(params) => (
                    <TextField
                      margin="normal"
                      fullWidth
                      error={Boolean(errors.birthday)}
                      helperText={errors?.birthday?.message || ''}
                      {...params}
                    />
                  )}
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
              name="role"
              control={control}
              render={({ field }) => (
                <TextField
                  select
                  fullWidth
                  required
                  margin="normal"
                  label="Role"
                  error={Boolean(errors.role)}
                  helperText={errors?.role?.message || ''}
                  {...field}
                >
                  <MenuItem value={'staff'}>Staff</MenuItem>
                  <MenuItem value={'driver'}>Driver</MenuItem>
                </TextField>
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

export default UpdateUserPage;
