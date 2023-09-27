'use client'
import { signIn, useSession } from 'next-auth/react';
import Dashboard from './dashboard/page';
import { useRouter } from 'next/navigation';
import { Lato, Montserrat } from 'next/font/google'
import Image from 'next/image';
import google from '../assets/icons/google.png'
import apple from '../assets/icons/apple.png'
import discord from '../assets/icons/Discord.png'
import LinkedIn from '../assets/icons/LinkedIn.png'
import Github from '../assets/icons/Github.png'
import Twitter from '../assets/icons/Twitter.png'
import { useEffect, useState } from 'react';
import MobilePage from './mobilePage';

const lato = Lato({ subsets: ['latin'], weight: ["100", "300", "400", "700", "900"] })
const mont = Montserrat({ subsets: ['latin'] })

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const [width, setwidth] = useState();
  console.log(session);

  if (session) {
    router.refresh();
    router.push('/dashboard');
  }


  function handleGoogleSignIn() {
    signIn("google");
  }
  useEffect(() => {
    setwidth(window.innerWidth);
  }, []);

  return (
    <div>
      {
        (width < 800) ? <MobilePage /> :
          <main className="flex min-h-screen items-center justify-between bg-[#F8FAFF] Box">
            <div className="bg-[#327bf0] h-full min-h-screen w-5/12 Box1">
              <div className="p-16 flex flex-col justify-between min-h-screen">
                <p className='font-bold'>LOGO</p>
                <h1 className="text-5xl text-center font-bold">Board.</h1>
                <div className="flex justify-center gap-12">
                  <Image src={Github} alt='discord' height={40} width={40} />
                  <Image src={Twitter} alt='discord' height={40} width={40} />
                  <Image src={LinkedIn} alt='discord' height={40} width={40} />
                  <Image src={discord} alt='discord' height={40} width={40} />
                </div>
              </div>
            </div>
            <div className={`${lato.className} w-7/12 min-h-screen text-black items-center separator Box2`}>
              <div className="flex flex-col justify-center items-center min-h-screen">
                <div className="w-3/5 flex flex-col">
                  <div className="">
                    <div>
                      <h1 className={`${mont.className} font-semibold text-3xl my-2`}>Sign In</h1>
                      <p className="text-xs">Sign in to your account</p>
                    </div>
                    <div className={`${mont.className} flex gap-2 my-6 justify-between`}>
                      <div className='flex items-center text-xs  px-8 py-1 gap-2 bg-white rounded  text-[#858585] font-light hover:cursor-pointer'>
                        <Image src={google} className='w-3' alt='google' />
                        <div onClick={() => { handleGoogleSignIn() }} className="">Sign in with Google</div>
                      </div>
                      <div className='flex items-center text-xs  px-8 py-1 gap-2 bg-white rounded  text-[#858585] font-light hover:cursor-pointer'>
                        <Image src={apple} className='w-3' alt='google' />
                        <div onClick={() => { handleGoogleSignIn() }} className="">Sign in with Apple</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-5 flex flex-col gap-2 rounded-lg">
                    <div>
                      <p className='text-sm'>Email address</p>
                      <input type="text" className="w-full rounded-md bg-[#F5F5F5] py-1 my-2 px-3 placeholder:text-sm" />
                    </div>
                    <div>
                      <p className='text-sm'>Password</p>
                      <input type="password" className="w-full rounded-md bg-[#F5F5F5] py-1 my-2 px-3" />
                    </div>
                    <div className="text-xs mb-2 text-[#346BD4] font-light">Forgot Password?</div>
                    <div className=" bg-[#4285f4] rounded-[10px]">
                      <div onClick={(e) => {
                        e.preventDefault()
                        signIn("google")
                      }}
                        className="p-2 text-white text-[16px] text-center tracking-[0] leading-[normal]">
                        Sign In
                      </div>
                    </div>
                  </div>

                  <p className='text-center text-xs my-3 font-light text-[#858585]'>Dont have an account? <span className='text-[#346BD4]'>Register here</span></p>

                </div>
              </div>
            </div>
          </main>
      }</div>
  );
}