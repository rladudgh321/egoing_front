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

export async function getPosts() {
  try {
    const response = await axios.get('/post/getposts');
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function removePost({ data, id  }: { data: string, id: string }) {
  try {
    const headers = {
      Authorization:`Bearer ${data}`
    }
    console.log('data', data, 'id', id);
    const response = await axios.delete(`/post/${id}`, { data: { data }, headers });
    return response.data;
  } catch (err) {
    console.error(err);
  }
}