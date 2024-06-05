import { backUrl } from '@/app/config'; //http://localhost:3065
import axios from 'axios';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export function signupAPI(data: { email: string, password: string, passwordConfirm: string, name: string, gender: string }) {
  return axios.post('/auth/signup', data).then((response) => response.data);
}

export function logInAPI(data: { email: string; password: string }) {
  return axios.post('/auth/signin', data).then((response) => response.data);
}

export function logOutAPI() {
  return axios.post('/auth/logout').then((response) => response.data);
}

export function isLoggedinAPI() {
  return axios.post('/auth/isLoggedin').then((response) => response.data);
}

