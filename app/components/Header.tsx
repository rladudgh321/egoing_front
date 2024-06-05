"use client"

import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { postAtom } from '../recoil';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { isLoggedinAPI } from '../apis/user';
import User from '../interface/user';
import { useEffect } from 'react';

export default function Header() {
    const [post, setPost] = useRecoilState(postAtom);
    const queryClient = useQueryClient();
    useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
          fetch('https://api.github.com/repos/TanStack/query').then((res) =>
            res.json(),
          ),
      })

    
  
    return (
        <header>
            <h1 className="border-b border-slate-400 flex justify-between">
            <Link href="/">Board</Link>
            <div>
                {
                    me
                    ? <button>로그아웃</button>
                    : <Link href="/login">로그인</Link>
                }
            </div>
            </h1>
            <nav className="my-4">
            <ul>
                { post.map((v, i) => {
                    return (
                        <li key={v.id}><Link href={'/post/' + (v.id)}>{i + 1}. {v.title}</Link></li>
                    );
                })}
            </ul>
            </nav>
        </header>
    );
}