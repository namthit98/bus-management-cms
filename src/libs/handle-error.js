import { toast } from 'react-toastify';

const handleErrors = (error) => {
  if (error && error.response) {
    toast.error(error.response?.data?.message || 'Error from server!');
    toast.clearWaitingQueue();
  }
};

export default handleErrors;
