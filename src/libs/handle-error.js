import { toast } from 'react-toastify';
import { get, isArray } from 'lodash';

const handleErrors = (error) => {
  let message = '';
  if (error && error.response) {
    if (isArray(error.response?.data?.message)) {
      message = get(error, 'response.data.message.0', '');
    } else {
      message = get(error, 'response.data.message', '');
    }
    toast.error(message || 'Error from server!');
    toast.clearWaitingQueue();
  }
};

export default handleErrors;
