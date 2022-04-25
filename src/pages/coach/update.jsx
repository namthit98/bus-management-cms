import * as yup from 'yup';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import PageLoading from '../../components/ui/PageLoading';
import { toast } from 'react-toastify';
import { Grid, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import handleErrors from '../../libs/handle-error';
import CoachService from '../../services/coach.service';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  licensePlates: yup.string().required('License Plates is required'),
  seats: yup.number().required('Seats is required'),
  type: yup.string().required('Type is required'),
  route: yup.string().required('Route is required'),
  driver: yup.string().required('Driver is required'),
});

const UpdateCoachPage = () => {
  const getCreationQuery = useQuery(['get-coach-creation'], () => {
    return CoachService.getCreation().then((res) => res.data);
  });
  const navigate = useNavigate();
  const params = useParams();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const coachQueryData = useQuery(
    ['coaches', params.coachId],
    () => {
      return CoachService.findOne(params.coachId).then((res) => res.data);
    },
    {
      onSuccess: (data) => {
        setValue('name', data?.name);
        setValue('licensePlates', data?.licensePlates);
        setValue('seats', data?.seats);
        setValue('type', data?.type);
        setValue('route', data?.route?._id);
        setValue('driver', data?.driver?._id);
      },
      onError: () => {
        toast.error('Load user data failed');
      },
    }
  );

  const onSubmit = (data) => {
    CoachService.update(params.coachId, data)
      .then((res) => {
        toast.success('Update coach successfully!');
      })
      .catch((err) => {
        handleErrors(err);
      });
  };

  if (
    coachQueryData.isLoading ||
    getCreationQuery.isLoading ||
    coachQueryData.isFetching
  )
    return <PageLoading />;

  return (
    <>
      <Typography variant="h5" component="h5">
        <IconButton aria-label="delete" onClick={() => navigate('/coaches')}>
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
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  margin="normal"
                  fullWidth
                  required
                  label="Name"
                  error={Boolean(errors.name)}
                  helperText={errors?.name?.message || ''}
                  {...field}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="licensePlates"
              control={control}
              render={({ field }) => (
                <TextField
                  margin="normal"
                  fullWidth
                  required
                  label="License Plates"
                  error={Boolean(errors.licensePlates)}
                  helperText={errors?.licensePlates?.message || ''}
                  {...field}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="seats"
              control={control}
              render={({ field }) => (
                <TextField
                  margin="normal"
                  fullWidth
                  required
                  label="Seats"
                  type="number"
                  error={Boolean(errors.seats)}
                  helperText={errors?.seats?.message || ''}
                  {...field}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <TextField
                  margin="normal"
                  fullWidth
                  required
                  label="Type"
                  error={Boolean(errors.type)}
                  helperText={errors?.type?.message || ''}
                  {...field}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="route"
              control={control}
              render={({ field }) => (
                <TextField
                  select
                  fullWidth
                  required
                  margin="normal"
                  label="Route"
                  error={Boolean(errors.route)}
                  helperText={errors?.route?.message || ''}
                  {...field}
                >
                  {getCreationQuery.data &&
                    getCreationQuery.data.routes.map((x) => {
                      return (
                        <MenuItem value={x._id}>
                          {x?.startingPoint} - {x?.destination}
                        </MenuItem>
                      );
                    })}
                </TextField>
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="driver"
              control={control}
              render={({ field }) => (
                <TextField
                  select
                  fullWidth
                  required
                  margin="normal"
                  label="Driver"
                  error={Boolean(errors.driver)}
                  helperText={errors?.driver?.message || ''}
                  {...field}
                >
                  {getCreationQuery.data &&
                    getCreationQuery.data.users
                      .concat(coachQueryData.data?.driver)
                      .map((x) => {
                        return <MenuItem value={x._id}>{x?.fullname}</MenuItem>;
                      })}
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

export default UpdateCoachPage;
