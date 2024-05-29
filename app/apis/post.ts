import { backUrl } from '@/app/config'; //http://localhost:3065
import axios from 'axios';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export function addPostAPI(data: FormData) {
  return axios.post('/post', data).then((response) => response.data);
}