import { backUrl } from '@/app/config'; //http://localhost:3065
import axios from 'axios';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export async function signupAPI(data: { email: string, password: string, passwordConfirm: string, name: string, gender: string }) {
  const response = await axios.post('/auth/signup', data);
  return response.data;
}

export async function logInAPI(data: { email: string; password: string }) {
  try {
    const response = await axios.post('/auth/signin', data);
    await axios.get('/', { headers: { Authorization: `Bearer ${response.data?.accessToken}` } })
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function logOutAPI() {
  const response = await axios.post('/auth/logout');
  return response.data;
}

export async function isLoggedInAPI() {
  const response = await axios.post('/auth/isLoggedIn');
  return response.data;
}
