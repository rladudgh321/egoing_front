"use client"

import { useRecoilState } from 'recoil';
import Header from '../components/Header';
import { useForm, SubmitHandler } from "react-hook-form"
import { postAtom } from '../recoil';
import { generate } from 'shortid';
import { useEffect } from 'react';
import { useRouter } from "next/navigation";

type Inputs = {
  title: string;
  desc: string;
}


export default function CreatePage() {
    const router = useRouter();
    const [post, setPost] = useRecoilState(postAtom);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<Inputs>();
      
      const onSubmit: SubmitHandler<Inputs> = (data) => {
        const id = generate();
        setPost([...post, {id,...data}]);
        router.push(`/post/${id}`);
    };

      console.log('awefawef', router);
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