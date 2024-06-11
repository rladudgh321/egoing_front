"use client"

import Link from 'next/link';
import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { postAtom } from '../recoil';
import { headers } from 'next/headers';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getPosts } from '../apis/post';
import axios from 'axios';


export default function Header() {
    // const [post, setPost] = useRecoilState(postAtom);
    const queryClient = useQueryClient();
    const {data = [], error, isError, isLoading} = useQuery({
        queryKey: ['getPosts'],
        queryFn: getPosts,
        
    });
    
    console.error('isError', isError);
    console.error('useQueryError', error);
    const onLogout = useCallback(() => {
        // localStorage.removeItem('authorization');
        typeof window !== 'undefined' ? localStorage?.removeItem('authorization') : null;
        // Optionally redirect to login page
        window.location.href = '/login';
    },[]);
    
    const status = typeof window !== 'undefined' ? localStorage?.getItem('authorization') as string : null;

    if (isLoading) {
        return <span>Loading...</span>
      }

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
                { data.map((v, i) => {
                    return (
                        <li key={v.id}><Link href={'/post/' + (v.id)}>{i + 1}. {v.title}</Link></li>
                    );
                })}
            </ul>
            </nav>
        </header>
    );
}