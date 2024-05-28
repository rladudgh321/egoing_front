import Link from 'next/link';

export default function LoginPage() {
    return (
        <div>
            <div className='border-b border-slate-400'>Login Page</div>
            <form>
                <div>
                    <input type="text" placeholder='id' className='border border-slate-400' />
                </div>
                <div>
                    <input type="password" placeholder='password' 
                    className='border border-slate-400'/>
                </div>
                <div>
                    <input type="button" value="로그인" />
                </div>
            </form>
            <div>
                <Link href="/signup">회원가입</Link>
            </div>
        </div>

    );
}