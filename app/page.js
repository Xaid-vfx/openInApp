'use client'
import { signIn, useSession } from 'next-auth/react';
import Dashboard from './dashboard/page';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  console.log(session);

  if (session) {
    router.refresh();
    router.push('/dashboard');
  }


  function handleGoogleSignIn() {
    signIn("google");

  }

  return (
    <main className="flex min-h-screen items-center justify-between bg-[#F8FAFF] ">
      <div className="bg-[#4285F4] h-full min-h-screen w-1/2">
        <div className="p-16 flex flex-col justify-between min-h-screen">
          <p>LOGO</p>
          <h1 className="text-4xl text-center">Board.</h1>
          <div className="flex justify-evenly">
            <div>Ic</div>
            <div>Ic</div>
            <div>Ic</div>
          </div>
        </div>
      </div>
      <div className=" w-1/2 min-h-screen font text-black items-center">
        <div className="flex flex-col justify-center items-center min-h-screen">
          <div className="w-1/2 flex flex-col">
            <div className="mb-5">
              <div>
                <h1 className="text-4xl">Sign In</h1>
                <p className="text-xs">Sign in to your account</p>
              </div>
              <div className="flex gap-2 my-2 border justify-between">
                <div onClick={() => { handleGoogleSignIn() }} className="bg-white text-xs px-8 py-1 hover:cursor-pointer">google button</div>
                <div onClick={() => { console.log('Signing in...' + session); }} className="bg-white text-xs px-8 py-1">apple button</div>

              </div>
            </div>

            <div className="bg-white p-5 flex flex-col gap-2 rounded-lg">
              <div>
                <p>Email address</p>
                <input type="text" className="border w-full rounded-md" />
              </div>
              <div>
                <p>Password</p>
                <input type="password" className="w-full border rounded-md" />
              </div>
              <div className="text-xs text-[#4285f4]">forgot Password?</div>
              <div className=" bg-[#4285f4] rounded-[10px]">
                <div onClick={(e) => {
                  e.preventDefault()
                  signIn("google")
                }}
                  className="p-2 font-bold text-white text-[16px] text-center tracking-[0] leading-[normal]">
                  Sign In
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}