"use client"
import { getPostAPI, getPosts, removePost } from '@/app/apis/post';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import Header from '../../components/Header';

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
    const index = post.findIndex((v: any) => v.id === postId);

      // Mutations
        const mutation = useMutation({
            mutationFn: removePost,
            onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['getPosts'] })
            },
        })

        const data = typeof window !== 'undefined' ? localStorage?.getItem('authorization') as string : null;
    
        const {data: getOne = []} = useQuery({
            queryKey:['getPost'],
            queryFn: async () => getPostAPI({id: postId as string, token: data})
        })
        console.log('getOne', getOne);
        console.log('postPage', post);
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
            <aside>
                {post[index]?.authorId}
            </aside>
            <div className="my-4 flex gap-x-4">
                <Link href="/create">Create</Link>
                {
                    
                    <Link href={`/update/${postId}`}>Update</Link>
                }
                <input type="button" value="Delete" onClick={onDelete} />
            </div>
        </div>
    );
}