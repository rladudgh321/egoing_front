"use client"

import { useRecoilState } from 'recoil';
import Header from '../components/Header';
import { useForm, SubmitHandler } from "react-hook-form"
import { postAtom } from '../recoil';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { addPostAPI } from '../apis/post';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Inputs = {
  title: string;
  content: string;
}


export default function CreatePage() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();
    const queryClient = useQueryClient();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const token = typeof window !== 'undefined' ? localStorage?.getItem('authorization') as string : null;
     
    const mutation = useMutation({
        mutationFn: addPostAPI,
        onSuccess: (data) => {
            console.log('postData', data);
            
                   // Invalidate and refetch
          queryClient.invalidateQueries({ queryKey: ['getPosts'] })
          router.push(`/post/${data.postId}`);
        },
        onError: (err: any) => {
            console.error(err?.response.data);
        },
        onSettled: () => {
            setLoading(false);
        }
      })

    const onSubmit: SubmitHandler<Inputs> = useCallback(()=>{
        mutation.mutate({
            title: watch("title"), content: watch("content"), token
        });
            // addPostAPI({title: watch("title"), content: watch("content"), token})
            //     .then((data) => {
            //         console.log('postData', data);
            //        setPost([...post, { id: data.id, ...data }])
            //         router.replace('/');
            //     })
            //     .catch((error: any) => {
            //         console.error(error.response.data);
            //     })
            //     .finally(() => {
            //         setLoading(false);
            //     });
    
            // router.push(`/`);
      },[mutation, watch, token]);

    return (
        <div>
            <Header />
            <h2>Create Page</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input type="text" className="border border-slate-400 my-4" placeholder='title'  {...register("title")} />
                    {errors.title && <span className="text-red-400">제목을 적어주세요</span>}
                </div>
                <div>
                    <textarea className="border border-slate-400" placeholder='content' {...register("content")} />
                    {errors.content && <span className="text-red-400">내용을 적어주세요</span>}
                </div>
                <div>
                    <input type="submit" value="제출" className="border border-slate-400 p-2" />
                </div>
            </form>
        </div>
    );
}