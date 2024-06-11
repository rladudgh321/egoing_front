"use client"

import { useRecoilState } from 'recoil';
import Header from '../../components/Header';
import { useParams, useRouter } from 'next/navigation';
import { postAtom } from '@/app/recoil';
import { SubmitHandler, useForm } from 'react-hook-form';
import { generate } from 'shortid';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getPostAPI, updatePostAPI } from '@/app/apis/post';
import { title } from 'process';
import axios from 'axios';

type Inputs = {
    title: string;
    content: string;
  }

export default function UpdatePage() {
   
    
    const { postId } = useParams();
    console.log(postId);
    const queryClient = useQueryClient();
    const router = useRouter();
    const [post, setPost] = useRecoilState(postAtom);
    console.log("post", post)
    const index = post.findIndex((v) => v.id === postId);

    

    

    const token = typeof window !== 'undefined' ? localStorage?.getItem('authorization') as string : null;
    
    const {data = [], error, isError, isLoading} = useQuery({
       queryKey: ['getPost'],
       queryFn: async () => await getPostAPI({id: postId as string, token}),
    });
    console.log('******* getPost',data);
    console.log('***token', token);
    console.log('postId', postId);

    // typeof window !== 'undefined' ? localStorage?.setItem('title', data.title) as unknown as string : null;

    // const poster_title = typeof window !== 'undefined' ? localStorage?.getItem('title') as string : null;

    // typeof window !== 'undefined' ? localStorage?.setItem('content', data.content) as unknown as string : null;

    // const poster_content = typeof window !== 'undefined' ? localStorage?.getItem('content') as string : null;

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        getValues
    } = useForm<Inputs>({
        defaultValues: async () => {
            console.log('default react hook form', data)
            return await getPostAPI({id: postId as string, token})
        }
    });

    // const {
    //     register,
    //     handleSubmit,
    //     watch,
    //     formState: { errors },
    //     getValues
    // } = useForm<Inputs>({ defaultValues: {
    //     title: poster_title as string,
    //     content: poster_content as string,
    // }});
    


    // console.log('getValues', getValues());
      
    //   const title = post.
    //   const desc = getValues("desc");

    // const restPost = post.filter((v) => v.id !== postId);
    // console.log("restPost", restPost)

    const mutation = useMutation({
        mutationFn: updatePostAPI,
        onSuccess: (data) => {
            console.log('postData', data);
            
                   // Invalidate and refetch
          queryClient.invalidateQueries({ queryKey: ['getPosts'] })
          router.push(`/post/${data.id}`);
        },
        onError: (err: any) => {
            console.error(err?.response.data);
        },
        onSettled: () => {
            // setLoading(false);
        }
      })

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log('update submit data', data);
        mutation.mutate({
            id: postId as string,
            title: watch("title"), 
            content: watch("content"), 
            token
        });
        //   const updatedTopic = {id: postId, ...data} as { id: string, title: string, desc: string};
           
        // // id가 postId일 때 제외시키기



        // setPost([...restPost, updatedTopic]);
        // [{id: postId, ...data}, ...post]
        // router.push(`/post/${postId}`);
    };

    if (isLoading) {
        return <span>Loading...</span>
    } else if (isError) {
        console.error('react query error', error)
    }

    return (
        <div>
            <Header />
            <h2>Update Page</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input type="text" className="border border-slate-400 my-4" placeholder='title'  {...register("title")} />
                    {errors.title && <span className="text-red-400">제목을 적어주세요</span>}
                </div>
                <div>
                    <textarea className="border border-slate-400" placeholder='desc' {...register("content")} />
                    {errors.content && <span className="text-red-400">내용을 적어주세요</span>}
                </div>
                <div>
                    <input type="submit" value="제출" className="border border-slate-400 p-2" />
                </div>
            </form>
        </div>
    );
}