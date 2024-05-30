import { backUrl } from '@/app/config'; //http://localhost:3065
import axios from 'axios';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export function signupAPI(data: { email: string, password: string, passwordConfirm: string, name: string, gender: string }) {
  return axios.post('/user/signup', data).then((response) => response.data);
}