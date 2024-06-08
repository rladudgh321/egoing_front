import Link from 'next/link';
import Header from './components/Header';
import { headers } from 'next/headers';

export default function Home() {
  const headersList = headers();
  const token = headersList.get('authorization');
  console.log('client token', token);
  return (
   <main>
    <Header />
    <Link href="/create">create</Link>
    <h2 className="mt-4">welcome</h2>
    <p className="mt-2">I want you to click list</p>
   </main>
  );
}
