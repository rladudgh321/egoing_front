import Post from './post';
import RefreshToken from './refreshToken';

export default interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  gender: string;
  role: string;
  Posts: Post[];
  RefreshToken: RefreshToken;
}