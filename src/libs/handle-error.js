import { toast } from 'react-toastify';
import { get } from 'lodash';

const handleErrors = (error) => {
  if (error && error.response) {
    toast.error(
      get(error, 'response.data.message.0', '') ||
        get(error, 'response.data.message', '') ||
        'Error from server!'
    );
    toast.clearWaitingQueue();
  }
};

export default handleErrors;
