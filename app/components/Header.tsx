"use client"

import Link from 'next/link';
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { postAtom } from '../recoil';
import { headers } from 'next/headers';

export default function Header() {
    const [post, setPost] = useRecoilState(postAtom);
    const status = localStorage.getItem('authorization');

    const onLogout = useCallback(() => {
        localStorage.removeItem('authorization');
        // Optionally redirect to login page
        window.location.href = '/login';
    },[]);
    
    return (
        <header>
            <h1 className="border-b border-slate-400 flex justify-between">
            <Link href="/">Board</Link>
            <div>
                    {
                        !!status
                        ? <button onClick={onLogout}>로그아웃</button>
                        : <Link href="/login">로그인</Link>
                    }
            </div>
            </h1>
            <nav className="my-4">
            <ul>
                { post.map((v, i) => {
                    console.log('postId', )
                    return (
                        <li key={v.id}><Link href={'/post/' + (v.id)}>{i + 1}. {v.title}</Link></li>
                    );
                })}
            </ul>
            </nav>
        </header>
    );
}