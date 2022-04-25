import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LineService from '../../services/line.service';
import { useNavigate, useParams } from 'react-router-dom';
import handleErrors from '../../libs/handle-error';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import PageLoading from '../../components/ui/PageLoading';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import TicketService from '../../services/ticket.service';

const LineDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [phone, setPhone] = React.useState('');
  const [fullname, setFullname] = React.useState('');
  const lineDataQuery = useQuery(
    ['lines', params?.lineId],
    () => {
      return LineService.findOne(params?.lineId).then((res) => res.data);
    },
    {
      onError: () => {
        toast.error('Load line data failed');
      },
    }
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggleTicketStatus = (ticketId) => {
    TicketService.toggleStatus(ticketId)
      .then((res) => {
        lineDataQuery.refetch();
      })
      .catch((err) => {
        handleErrors(err);
      });
  };

  const handleRemoveTicket = (ticketId) => {
    TicketService.remove(ticketId)
      .then((res) => {
        lineDataQuery.refetch();
      })
      .catch((err) => {
        handleErrors(err);
      });
  };

  const handleAdd = () => {
    TicketService.create({ phone, fullname, lineId: params?.lineId })
      .then((res) => {
        lineDataQuery.refetch();
        setPhone('');
        setFullname('');
        handleClose();
      })
      .catch((err) => {
        handleErrors(err);
      });
  };

  if (lineDataQuery.isLoading) return <PageLoading />;

  return (
    <>
      <IconButton aria-label="delete" onClick={() => navigate('/lines')}>
        <ChevronLeftIcon />
      </IconButton>
      &nbsp;&nbsp;&nbsp;
      <Button
        disabled={
          lineDataQuery.data?.coach?.seats === lineDataQuery.data.tickets.length
        }
        variant="outlined"
        onClick={handleClickOpen}
      >
        {lineDataQuery.data?.coach?.seats === lineDataQuery.data.tickets.length
          ? 'Out of seats'
          : 'Add Ticket'}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ticket Form</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            label="Phone"
            type="number"
            fullWidth
            variant="standard"
            value={phone}
            onChange={(e) => setPhone(e?.target?.value)}
          />

          <TextField
            margin="dense"
            id="phone"
            label="Fullname"
            type="text"
            fullWidth
            variant="standard"
            value={fullname}
            onChange={(e) => setFullname(e?.target?.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd}>Confirm</Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ mt: 2 }}>
        <Grid
          container
          spacing={2}
          sx={{
            justifyContent: {
              xs: 'center',
              md: 'space-between',
            },
          }}
        >
          {lineDataQuery.data.tickets.map((ticket) => {
            return (
              <Grid item>
                <Paper elevation={3} sx={{ p: 2, width: 300 }}>
                  <Typography variant="h6">Phone: {ticket?.phone}</Typography>
                  <Typography variant="h6">
                    Fullname: {ticket?.fullname}
                  </Typography>
                  <Typography variant="h6">
                    Status: &nbsp;&nbsp;&nbsp;
                    <FormControlLabel
                      control={
                        <Switch
                          checked={ticket?.status === 'paid' ? true : false}
                          onChange={handleToggleTicketStatus.bind(
                            null,
                            ticket._id
                          )}
                        />
                      }
                      label={ticket?.status.toUpperCase()}
                    />
                  </Typography>
                  <IconButton
                    color="error"
                    aria-label="delete"
                    size="small"
                    onClick={handleRemoveTicket.bind(null, ticket._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export default LineDetail;
