import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { toast } from 'react-toastify';
import { Grid } from '@mui/material';
import CustomerService from '../../services/customer.service';
import handleErrors from '../../libs/handle-error';

const schema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
  fullname: yup.string().required('Fullname is required'),
  phone: yup.number().required('Phone is required'),
});

const CreateCustomer = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      password: '',
      fullname: '',
      email: '',
      phone: '',
      birthday: null,
      identification: '',
    },
  });

  const onSubmit = (data) => {
    CustomerService.create(data)
      .then((res) => {
        toast.success('Create customer successfully!');
        reset();
      })
      .catch((err) => {
        handleErrors(err);
      });
  };

  return (
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
                required
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
      </Grid>

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Create
      </Button>
    </Box>
  );
};

export default CreateCustomer;
