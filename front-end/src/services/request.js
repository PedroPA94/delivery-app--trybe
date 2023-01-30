import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001',
});

export const setToken = (token) => {
  instance.defaults.headers.common.Authorization = token;
};

export const requestPost = async (endpoint, body) => instance.post(endpoint, body);

export const requestGet = async (endpoint) => instance.get(endpoint);

export const requestGetAllSale = async (endpoint) => instance.get(endpoint);

export const requestGetAllById = async (endpoint, body) => instance.get(endpoint, body);

export default instance;
