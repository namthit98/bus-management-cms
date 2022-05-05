import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useQuery } from 'react-query';
import UserService from '../../services/user.service';
import { toast } from 'react-toastify';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import SearchInput from '../../components/ui/SearchInput';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  MenuItem,
  TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import handleErrors from '../../libs/handle-error';
import CustomerService from '../../services/customer.service';

const ListCustomer = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState([]);
  const customerQueryData = useQuery(
    ['customers', { searchText }],
    () => {
      return CustomerService.findAll({ searchText }).then((res) => res.data);
    },
    {
      placeholderData: [],
      onError: () => {
        toast.error('Load customer data failed');
      },
    }
  );
  const [pageSize, setPageSize] = useState(5);
  const [selectedId, setSelectedId] = useState('');

  const handleClickOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedId('');
    setOpen(false);
  };

  const handleDelete = () => {
    CustomerService.delete(selectedId)
      .then(() => {
        toast.success('Delete customer successfully!');
        customerQueryData.refetch();
      })
      .catch((err) => {
        handleErrors(err);
      })
      .finally(() => {
        setSelectedId('');
        setOpen(false);
      });
  };

  const columns = [
    { field: 'username', headerName: 'Username', flex: 1, minWidth: 200 },
    { field: 'fullname', headerName: 'Fullname', flex: 1, minWidth: 200 },
    {
      field: 'phone',
      headerName: 'Phone',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 0.2,
      minWidth: 100,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              aria-label="delete"
              size="small"
              onClick={handleClickOpen.bind(null, params.id)}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              aria-label="edit"
              size="small"
              onClick={() => navigate(`/customers/${params.id}/update`)}
            >
              <EditIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

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

      <Box
        sx={{
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <Box sx={{ mb: 2 }}>
          <SearchInput
            onSearch={(value) => {
              setSearchText(value);
            }}
          />
        </Box>
      </Box>

      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={customerQueryData?.data || []}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 20]}
          onPageSizeChange={(value) => {
            setPageSize(value);
          }}
          disableColumnFilter
          disableSelectionOnClick
          disableColumnSelector
          loading={customerQueryData.isLoading}
          getRowId={(row) => row?._id}
        />
      </Box>
    </>
  );
};

export default ListCustomer;
