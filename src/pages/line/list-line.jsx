import React from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Grid,
  IconButton,
  Paper,
  Typography,
  TextField,
  MenuItem,
} from '@mui/material';
import moment from 'moment';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import PageLoading from '../../components/ui/PageLoading';
import LineService from '../../services/line.service';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from 'react';
import handleErrors from '../../libs/handle-error';
import { toast } from 'react-toastify';
import RouteService from '../../services/route.service';
import { AuthContext } from '../../contexts/auth.context';

const ListLine = () => {
  const navigate = useNavigate();
  const { isAdmin, isStaff } = React.useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [startingPoint, setStartingPoint] = useState('all');
  const [destination, setDestination] = useState('all');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const lineDataQuery = useQuery(
    ['lines', { startingPoint, destination, startTime, endTime }],
    () => {
      return LineService.findAll({
        startingPoint,
        destination,
        startTime,
        endTime,
      }).then((res) => res.data);
    },
    {
      placeholderData: [],
      onError: () => {
        toast.error('Load line data failed');
      },
    }
  );
  const startingPointAndDestinations = useQuery(
    ['startingPointAndDestinations'],
    () => {
      return RouteService.getAllStartingPointAndDestinations().then(
        (res) => res.data
      );
    },
    {
      placeholderData: [],
      onError: () => {
        toast.error('Load data failed');
      },
    }
  );

  const handleClickOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedId('');
    setOpen(false);
  };

  const handleDelete = () => {
    LineService.delete(selectedId)
      .then(() => {
        toast.success('Delete line successfully!');
        lineDataQuery.refetch();
      })
      .catch((err) => {
        handleErrors(err);
      })
      .finally(() => {
        setSelectedId('');
        setOpen(false);
      });
  };

  if (lineDataQuery.isLoading || startingPointAndDestinations.isLoading)
    return <PageLoading />;

  console.log(startTime);

  return (
    <>
      <Dialog maxWidth="xs" open={open} onClose={handleClose}>
        <DialogTitle>Warning</DialogTitle>
        <DialogContent>
          <DialogContentText>Do you want to delete this.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete}>Confirm</Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={3}>
            <TextField
              select
              fullWidth
              margin="normal"
              label="Starting Point"
              value={startingPoint}
              onChange={(e) => setStartingPoint(e.target.value)}
            >
              <MenuItem value={'all'}>All</MenuItem>
              {startingPointAndDestinations.data?.startingPoints?.map((x) => {
                return <MenuItem value={x}>{x}</MenuItem>;
              })}
            </TextField>
          </Grid>

          <Grid item xs={12} lg={3}>
            <TextField
              select
              fullWidth
              margin="normal"
              label="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            >
              <MenuItem value={'all'}>All</MenuItem>
              {startingPointAndDestinations.data?.destinations?.map((x) => {
                return <MenuItem value={x}>{x}</MenuItem>;
              })}
            </TextField>
          </Grid>

          <Grid item xs={12} lg={3}>
            <DateTimePicker
              clearable
              inputFormat="DD/MM/YYYY HH:mm"
              label="Start Time"
              renderInput={(params) => (
                <TextField margin="normal" fullWidth {...params} />
              )}
              value={startTime}
              onChange={(value) => setStartTime(value)}
            />
          </Grid>

          <Grid item xs={12} lg={3}>
            <DateTimePicker
              clearable
              inputFormat="DD/MM/YYYY HH:mm"
              label="End Time"
              renderInput={(params) => (
                <TextField margin="normal" fullWidth {...params} />
              )}
              value={endTime}
              onChange={(value) => setEndTime(value)}
            />
          </Grid>
        </Grid>
      </Box>

      {lineDataQuery.data.map((line, index) => {
        let bg = '#fff'
        const start = moment(line?.startTime); // some random moment in time (in ms)
        const end = moment(); // some random moment after start (in ms)
        const diff = start.diff(end);
        if(diff && moment.duration(diff, "milliseconds").asMinutes() < 30) {
          bg = '#e3ffde'
        }

        return (
          <Paper elevation={3} sx={{ mb: 2, p: 2, background: bg }}>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
              <Grid item xs={12} lg={3}>
                <Typography variant="h6" component="span">
                  {line?.route?.startingPoint} - {line?.route?.destination}
                </Typography>
                <br />
                <Typography variant="h6" component="span">
                  {line?.coach?.name}
                </Typography>
              </Grid>

              <Grid item xs={12} lg={5}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h6" component="span">
                    {moment(line?.startTime).format('DD/MM/YYYY')}
                    <br />
                    {moment(line?.startTime).format('HH:mm')}
                  </Typography>
                  <Typography variant="h4" component="span" sx={{ mx: 4 }}>
                    -
                  </Typography>
                  <Typography variant="h6" component="span">
                    {moment(line?.endTime).format('DD/MM/YYYY')}
                    <br />
                    {moment(line?.endTime).format('HH:mm')}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} lg={2}>
                <Typography variant="h6" component="span">
                  Total: {line?.coach?.seats} seats
                  <br />
                  Rest: {line?.coach?.seats - line?.tickets.length} seats
                </Typography>
              </Grid>

              <Grid item xs={12} lg={2}>
                <IconButton
                  aria-label="view"
                  onClick={() => navigate(`/lines/${line._id}`)}
                >
                  <VisibilityIcon />
                </IconButton>
                &nbsp;&nbsp;&nbsp;
                {isAdmin || isStaff ? <IconButton
                  aria-label="delete"
                  onClick={handleClickOpen.bind(null, line._id)}
                >
                  <DeleteIcon />
                </IconButton> : null}
              </Grid>
            </Grid>
          </Paper>
        );
      })}
    </>
  );
};

export default ListLine;
