import Link from 'next/link';
import Header from './components/Header';

export default function Home() {
  return (
   <main>
    <Header />
    <Link href="/create">create</Link>
    <h2 className="mt-4">welcome</h2>
    <p className="mt-2">I want you to click list</p>
   </main>
  );
}
