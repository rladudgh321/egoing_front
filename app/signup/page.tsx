import Link from 'next/link';

export default function SignUpPage(){
    return (
        <div className='flex flex-col gap-y-4'>
            <div className="flex justify-between border-b border-slate-400">
                <div>SIGNUP Page</div>
                <Link href="/">To HOME</Link>
            </div>
            <div>
                <input type="text" placeholder='id' className="border border-slate-400" />
            </div>
            <div>
                <input type="password" placeholder='password' className="border border-slate-400" />
            </div>
            <div>
                <input type="password" placeholder='passwordConfirm' className="border border-slate-400" />
            </div>
            <div>
                <input type="text" placeholder='name' className="border border-slate-400" />
            </div>
            <div>
                <input type="submit" value="SignUp" className="border border-slate-400 p-2" />
            </div>

            <div>
                <Link href="/login">Back to LoginPage</Link>
            </div>
        </div>
    );
}