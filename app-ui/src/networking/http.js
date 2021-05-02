import axios from 'axios';
import { SERVER } from 'config/config';

const endpoint = url => {
  return `${SERVER}.${url}`;
};

const httpGet = (url, params = { withCredentials: true, responseType: 'json' }) => {
  return axios.get(endpoint(url), params);
};

const httpPost = (url, data) => {
  return axios.post(endpoint(url), data, { withCredentials: true });
};

const httpPut = (url, data) => {
  return axios.put(endpoint(url), data, { withCredentials: true });
};

export { httpGet, httpPost, httpPut };
