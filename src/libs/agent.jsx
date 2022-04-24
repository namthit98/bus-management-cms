import axios from 'axios';
import Cookies from 'js-cookie';
import { SERVER_URL, TOKEN_KEY } from '../const';

const instance = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Cookies.get(TOKEN_KEY)}`,
  },
});

instance.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${Cookies.get(TOKEN_KEY)}`;
  return config;
});

export default instance;
