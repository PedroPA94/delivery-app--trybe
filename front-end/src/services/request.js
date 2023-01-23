import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001',
});

export const setToken = (token) => {
  instance.defaults.headers.common.Authorization = token;
};

export const requestLogin = async (endpoint, body) => instance.post(endpoint, body);

export default instance;
