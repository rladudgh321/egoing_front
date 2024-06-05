import User from './user';

export default interface Post {
  id: string;
  title: string;
  content: string;
  published: boolean;
  author: User;
}