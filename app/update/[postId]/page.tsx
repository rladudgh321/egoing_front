"use client"

import { useRecoilState } from 'recoil';
import Header from '../../components/Header';
import { useParams, useRouter } from 'next/navigation';
import { postAtom } from '@/app/recoil';
import { SubmitHandler, useForm } from 'react-hook-form';
import { generate } from 'shortid';

type Inputs = {
    title: string;
    desc: string;
  }

export default function UpdatePage() {
    const { postId } = useParams();
    console.log(postId);
    const router = useRouter();
    const [post, setPost] = useRecoilState(postAtom);
    console.log("post", post)
    const index = post.findIndex((v) => v.id === postId);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        getValues
    } = useForm<Inputs>({ defaultValues: {
        title: post[index].title,
        desc: post[index].desc
    }});
    
    // console.log('getValues', getValues());
      
    //   const title = post.
    //   const desc = getValues("desc");

    const restPost = post.filter((v) => v.id !== postId);
    // console.log("restPost", restPost)

    const onSubmit: SubmitHandler<Inputs> = (data) => {
          const updatedTopic = {id: postId, ...data} as { id: string, title: string, desc: string};
           
        // id가 postId일 때 제외시키기



        setPost([...restPost, updatedTopic]);
        // [{id: postId, ...data}, ...post]
        router.push(`/post/${postId}`);
    };
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
                    <textarea className="border border-slate-400" placeholder='desc' {...register("desc")} />
                    {errors.desc && <span className="text-red-400">내용을 적어주세요</span>}
                </div>
                <div>
                    <input type="submit" value="제출" className="border border-slate-400 p-2" />
                </div>
            </form>
        </div>
    );
}