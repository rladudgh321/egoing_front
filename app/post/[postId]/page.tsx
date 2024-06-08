"use client"
import { postAtom } from '@/app/recoil';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import Header from '../../components/Header';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getPosts, removePost } from '@/app/apis/post';

export default function PostPage() {
    const queryClient = useQueryClient();
    const { postId } = useParams();
    const { push } = useRouter();
    // const [post, setPost] = useRecoilState(postAtom);
    const {data:post = []} = useQuery({
        queryKey:['getPosts'],
        queryFn: getPosts
    })
    console.log('router', postId);
    const index = post.findIndex((v) => v.id === postId);

      // Mutations
        const mutation = useMutation({
            mutationFn: removePost,
            onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['getPosts'] })
            },
        })

        const data = typeof window !== 'undefined' ? localStorage?.getItem('authorization') as string : null;
    

    const onDelete = useCallback(() => {
        mutation.mutate({data: data as string, id:postId as string});
        push('/');
    },[data, mutation, postId, push]);
    return(
        <div>
            <Header />
            <div className="text-2xl">
                {post[index]?.title}
            </div>       
            <p>
                {post[index]?.content}    
            </p> 
            <div className="my-4 flex gap-x-4">
                <Link href="/create">Create</Link>
                <Link href={`/update/${postId}`}>Update</Link>
                <input type="button" value="Delete" onClick={onDelete} />
            </div>
        </div>
    );
}