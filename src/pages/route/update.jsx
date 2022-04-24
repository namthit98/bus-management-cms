import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import PageLoading from '../../components/ui/PageLoading';
import { toast } from 'react-toastify';
import { Grid, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import handleErrors from '../../libs/handle-error';
import RouteService from '../../services/route.service';

const schema = yup.object({
  startingPoint: yup.string().required('Starting Point is required'),
  destination: yup.string().required('Destination is required'),
  price: yup.number().required('Price is required'),
  timeShift: yup.number().required('Time Shift is required'),
  distance: yup.number().required('Distance is required'),
});

const UpdateRoutePage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
  });
  const routeQueryData = useQuery(
    ['routes', params.routeId],
    () => {
      return RouteService.findOne(params.routeId).then((res) => res.data);
    },
    {
      onSuccess: (data) => {
        setValue('startingPoint', data?.startingPoint);
        setValue('destination', data?.destination);
        setValue('price', data?.price);
        setValue('timeShift', data?.timeShift);
        setValue('distance', data?.distance);
      },
      onError: () => {
        toast.error('Load route data failed');
      },
    }
  );

  const onSubmit = (data) => {
    RouteService.update(params.routeId, data)
      .then((res) => {
        toast.success('Update route successfully!');
      })
      .catch((err) => {
        handleErrors(err);
      });
  };

  if (routeQueryData.isLoading) {
    return <PageLoading />;
  }

  return (
    <>
      <Typography variant="h5" component="h5">
        <IconButton aria-label="delete" onClick={() => navigate('/routes')}>
          <ChevronLeftIcon />
        </IconButton>
        &nbsp;&nbsp;&nbsp;
        <span>Update Route Info</span>
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
              name="price"
              control={control}
              render={({ field }) => (
                <TextField
                  margin="normal"
                  fullWidth
                  required
                  label="Price (VNĐ)"
                  type="number"
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
                  type="number"
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
                  type="number"
                  error={Boolean(errors.distance)}
                  helperText={errors?.distance?.message || ''}
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

export default UpdateRoutePage;
