import User from './user';

export default interface RefreshToken {
  id: string;
  token: string;
  refreshTokenUser: User;
}