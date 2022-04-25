import * as yup from 'yup';
import { get, cloneDeep } from 'lodash';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { toast } from 'react-toastify';
import { Grid } from '@mui/material';
import UserService from '../../services/user.service';
import handleErrors from '../../libs/handle-error';
import { useQuery } from 'react-query';
import LineService from '../../services/line.service';
import PageLoading from '../../components/ui/PageLoading';
import { useEffect } from 'react';

const schema = yup.object({
  coach: yup.string().required('Coach is required'),
  route: yup.string().required('Route is required'),
  startTime: yup.string().required('Start time is required'),
  endTime: yup.string().required('End time is required'),
});

const CreateLine = () => {
  const getCreationQuery = useQuery(['get-line-creation'], () => {
    return LineService.getCreation().then((res) => res.data);
  });

  const {
    control,
    watch,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      coach: '',
      route: '',
      startTime: null,
      endTime: null,
    },
  });

  const onSubmit = (data) => {
    LineService.create(data)
      .then((res) => {
        toast.success('Create line successfully!');
        reset();
      })
      .catch((err) => {
        handleErrors(err);
      });
  };

  const watchStartTimeAndRoute = watch(['startTime', 'route'], null);

  useEffect(() => {
    const currentRoute = getValues('route');
    const currentStartTime = cloneDeep(getValues('startTime'));
    if (!currentRoute || !currentStartTime) return;

    const timeShift = get(
      getCreationQuery.data.routes.find((x) => x._id === currentRoute),
      'timeShift',
      0
    );

    const endTime = currentStartTime.add(timeShift, 'hours');

    setValue('endTime', endTime);
  }, [watchStartTimeAndRoute]);

  if (getCreationQuery.isLoading) return <PageLoading />;

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
            name="coach"
            control={control}
            render={({ field }) => (
              <TextField
                select
                fullWidth
                required
                margin="normal"
                label="Coach"
                error={Boolean(errors.coach)}
                helperText={errors?.coach?.message || ''}
                {...field}
              >
                {getCreationQuery.data &&
                  getCreationQuery.data.coaches.map((x) => {
                    return (
                      <MenuItem value={x._id}>
                        {x?.name} - {x?.licensePlates}
                      </MenuItem>
                    );
                  })}
              </TextField>
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
            name="startTime"
            control={control}
            render={({ field }) => (
              <DateTimePicker
                clearable
                inputFormat="DD/MM/YYYY HH:mm"
                label="Start Time"
                renderInput={(params) => (
                  <TextField
                    margin="normal"
                    fullWidth
                    required
                    error={Boolean(errors.startTime)}
                    helperText={errors?.startTime?.message || ''}
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
            name="endTime"
            control={control}
            render={({ field }) => (
              <DateTimePicker
                clearable
                disabled
                inputFormat="DD/MM/YYYY HH:mm"
                label="End Time"
                renderInput={(params) => (
                  <TextField
                    margin="normal"
                    fullWidth
                    required
                    error={Boolean(errors.endTime)}
                    helperText={errors?.endTime?.message || ''}
                    {...params}
                  />
                )}
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

export default CreateLine;
