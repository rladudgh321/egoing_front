import { backUrl } from '@/app/config'; //http://localhost:3065
import axios from 'axios';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export async function addPostAPI(data: { title: string, content: string, token: string | null }) {
  const headers = {
    Authorization:`Bearer ${data?.token}`
  }
  const response = await axios.post('/post', data, { headers } );
  console.log('addPostAPI', response.data);
  return response.data;
}