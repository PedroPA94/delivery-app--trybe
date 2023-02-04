import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001',
});

export const setToken = (token) => {
  instance.defaults.headers.common.Authorization = token;
};

export const requestPost = async (endpoint, body) => instance.post(endpoint, body);

export const requestGet = async (endpoint) => instance.get(endpoint);

export const requestPut = async (endpoint, body) => instance.put(endpoint, body);

export const requestDelete = async (endpointWithId) => instance.delete(endpointWithId);

export default instance;
