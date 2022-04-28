import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { toast } from 'react-toastify';
import { Grid } from '@mui/material';
import RouteService from '../../services/route.service';
import handleErrors from '../../libs/handle-error';

const schema = yup.object({
  startingPoint: yup.string().required('Starting Point is required'),
  destination: yup.string().required('Destination is required'),
  price: yup.number().required('Price is required'),
  timeShift: yup.number().required('Time Shift is required'),
  distance: yup.number().required('Distance is required'),
  pickupPoint: yup.string().required('Pickup point is required'),
  dropoffPoint: yup.string().required('Dropoff point is required'),
});

const CreateRoute = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      startingPoint: '',
      destination: '',
      price: 0,
      timeShift: 0,
      distance: 0,
      pickupPoint: '',
      dropoffPoint: '',
    },
  });

  const onSubmit = (data) => {
    RouteService.create(data)
      .then((res) => {
        toast.success('Create route successfully!');
        reset({});
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
            name="startingPoint"
            control={control}
            render={({ field }) => (
              <TextField
                margin="normal"
                fullWidth
                required
                label="Starting Point"
                error={Boolean(errors.startingPoint)}
                helperText={errors?.startingPoint?.message || ''}
                {...field}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="destination"
            control={control}
            render={({ field }) => (
              <TextField
                margin="normal"
                fullWidth
                required
                label="Destination"
                error={Boolean(errors.destination)}
                helperText={errors?.destination?.message || ''}
                {...field}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="pickupPoint"
            control={control}
            render={({ field }) => (
              <TextField
                margin="normal"
                fullWidth
                required
                label="Pickup Point"
                error={Boolean(errors.pickupPoint)}
                helperText={errors?.pickupPoint?.message || ''}
                {...field}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="dropoffPoint"
            control={control}
            render={({ field }) => (
              <TextField
                margin="normal"
                fullWidth
                required
                label="Dropoff Point"
                error={Boolean(errors.dropoffPoint)}
                helperText={errors?.dropoffPoint?.message || ''}
                {...field}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <TextField
                margin="normal"
                fullWidth
                required
                label="Price (VNĐ)"
                error={Boolean(errors.price)}
                helperText={errors?.price?.message || ''}
                {...field}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="timeShift"
            control={control}
            render={({ field }) => (
              <TextField
                margin="normal"
                fullWidth
                required
                label="Time Shift (Hour)"
                error={Boolean(errors.timeShift)}
                helperText={errors?.timeShift?.message || ''}
                {...field}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="distance"
            control={control}
            render={({ field }) => (
              <TextField
                margin="normal"
                fullWidth
                required
                label="Distance (Km)"
                error={Boolean(errors.distance)}
                helperText={errors?.distance?.message || ''}
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

export default CreateRoute;
