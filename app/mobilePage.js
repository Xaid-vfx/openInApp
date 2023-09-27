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
import { useEffect } from 'react';

const lato = Lato({ subsets: ['latin'], weight: ["100", "300", "400", "700", "900"] })
const mont = Montserrat({ subsets: ['latin'] })

export default function MobilePage() {
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
        <main className="min-h-screen items-center justify-between bg-[#F8FAFF] Box">
            <div className="bg-[#327bf0] h-[30vh]">
                <div className="p-4 flex h-full flex-col justify-evenly">
                    <h1 className="text-3xl text-center font-bold">Board.</h1>
                    <div className="flex justify-center gap-12">
                        <Image src={Github} alt='discord' height={20} width={20} />
                        <Image src={Twitter} alt='discord' height={20} width={20} />
                        <Image src={LinkedIn} alt='discord' height={20} width={20} />
                        <Image src={discord} alt='discord' height={20} width={20} />
                    </div>
                </div>
            </div>
            {/* <div className='mobileseparator'></div> */}
            <div className={`${lato.className} text-black h-[70vh]`}>
                <div className="flex flex-col items-center justify-center border h-full">
                    <div className="w-4/5 flex flex-col">
                        <div className="text-center">
                            <div className=''>
                                <h1 className={`${mont.className} font-semibold text-2xl my-2`}>Sign In</h1>
                                <p className="text-xs">Sign in to your account</p>
                            </div>
                            <div className={`${mont.className} flex flex-col my-6 justify-between`}>
                                <div className='flex items-center text-xs justify-center px-8 py-2 gap-2 bg-white rounded  text-[#858585] font-light hover:cursor-pointer'>
                                    <Image src={google} className='w-3' alt='google' />
                                    <div onClick={() => { handleGoogleSignIn() }} className="">Sign in with Google</div>
                                </div>
                                <div className='flex items-center text-xs mt-4 justify-center  px-8 py-2 gap-2 bg-white rounded  text-[#858585] font-light hover:cursor-pointer'>
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
    );
}