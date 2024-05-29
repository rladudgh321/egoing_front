"use client"
import { postAtom } from '@/app/recoil';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import Header from '../../components/Header';

export default function PostPage() {
    const { postId } = useParams();
    const { push } = useRouter();
    const [post, setPost] = useRecoilState(postAtom);
    console.log('router', postId);
    const index = post.findIndex((v) => v.id === postId);
    const onDelete = useCallback(() => {
        const rest = post.filter((v) => v.id !== postId);
        setPost(rest);
        push('/');
    },[post, postId, push, setPost]);
    return(
        <div>
            <Header />
            <div className="text-2xl">
                {post[index]?.title}
            </div>       
            <p>
                {post[index]?.desc}    
            </p> 
            <div className="my-4 flex gap-x-4">
                <Link href="/create">Create</Link>
                <Link href={`/update/${postId}`}>Update</Link>
                <input type="button" value="Delete" onClick={onDelete} />
            </div>
        </div>
    );
}