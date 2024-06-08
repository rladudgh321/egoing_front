"use client"

import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { logInAPI } from '../apis/user';

type Inputs = {
  email: string;
  password: string;
}

export default function LoginPage() {
    const queryClient = useQueryClient();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<Inputs>()
      const router = useRouter();
      const [loading, setLoading] = useState<boolean>(false);
      const email = watch("email");
      const password = watch("password");

      // const mutation = useMutation<User, AxiosError, { email: string; password: string }>(
      //   {
      //       mutationFn: logInAPI,
      //       onSuccess: (user) => {
      //           queryClient.setQueriesData('loginAPI', user)
      //         },
      //         onError: (error) => {
      //           alert(error.response?.data);
      //         },
      //         onSettled: () => {
      //           setLoading(false);
      //         },
      //         onMutate: () => {
      //           setLoading(true);
      //         },
      //   });

      const onSubmit: SubmitHandler<Inputs> = useCallback(()=>{
            // mutation.mutate({email,password});
            console.log('before login console', email, password);
            logInAPI({ email, password })
            .then((data) => {
                console.log('login page', data);
                // localStorage.setItem('authorization', data.accessToken); //로그인시 토큰 아이디 저장
                typeof window !== 'undefined' ? localStorage?.getItem('authorization') as string : null;
                router.replace('/');
            })
            .catch((error: any) => {
                alert(error.response.data);
            })
            .finally(() => {
                setLoading(false);
            });
      },[email, password, router]);
    return (
        <div>
            <div className="flex justify-between border-b border-slate-400">
                <div>Login Page</div>
                <Link href="/">To HOME</Link>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
                <div>
                    <input type="text" placeholder='id' className='border border-slate-400' {...register("email")} />
                    {errors.email && <span className="text-red-500">이메일을 입력하세요</span>}
                </div>
                <div>
                    <input type="password" placeholder='password' 
                    className='border border-slate-400'  {...register("password")}  />
                     {errors.password && <span className="text-red-500">비밀번호를 입력하세요</span>}
                </div>
                <div>
                    {
                        loading
                        ? <input type="submit" value="login"  className="border border-slate-400 p-2 w-36 loading"  />
                        : <input type="submit" value="login"  className="border border-slate-400 p-2 w-36"  />
                    }
                </div>
            </form>
            <div>
                <Link href="/signup">회원가입</Link>
            </div>
        </div>

    );
}