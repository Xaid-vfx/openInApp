'use client'
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import Modal from 'react-modal'
import Add from '../assets/icons/addProfile.png'
import WhatsApp from '../assets/icons/WhatsApp.png'
import Insta from '../assets/icons/Insta.png'
import Email from '../assets/icons/Email.png'
import Youtube from '../assets/icons/Youtube.png'
import Image from 'next/image';

export default function AddProfile(props) {
    const [open, setOpen] = useState(false)
    const [profileTab, setProfileTab] = useState("Basic")
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [youtube, setYoutube] = useState('')
    const [insta, setInsta] = useState('')
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    const [profile, setProfile] = useState([])
    const [refresh, setrefresh] = useState(false)

    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)'
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '30%',
            borderRadius: '10px'
        }
    }

    useEffect(() => {
        if (profileTab == "Contact" && open == true) {
            const ele1 = document.getElementById("Basic")
            if (ele1) ele1.style.borderColor = "#D9D9D9"
            const ele2 = document.getElementById("Contact")
            if (ele2) ele2.style.borderColor = "#3F84F8"
        }
        if (profileTab == "Basic" && open == true) {
            const ele1 = document.getElementById("Basic")
            if (ele1) ele1.style.borderColor = "#3F84F8"
            const ele2 = document.getElementById("Contact")
            if (ele2) ele2.style.borderColor = "#D9D9D9"
        }
    }, [profileTab, open])

    async function pushProfile() {

        const { data, error } = await supabase
            .from('profile')
            .insert([
                { email: email, name: name, phone: phone, instagram: insta, youtube: youtube },
            ])
            .select()

    }
    async function getSession() {
        return props.session
    }
    async function getProfile(mail) {
        let { data: profile, error } = await supabase
            .from('profile')
            .select('*')
            .eq('email', mail)

        setProfile(profile);

        if (error) console.log('Error fetching rows:', error.message)
        else console.log('All rows:', profile)

    }
    useEffect(() => {
        getSession().then(res => getProfile(res.user.email))
    }, [refresh])

    const textstyle = "text-xs underline font-light"


    return (
        <div className='h-full'>
            {profile ? profile.length == 0 ? <div onClick={() => {
                setOpen(true)
            }} className='flex gap-2 flex-col justify-center items-center h-full hover:scale-110 transition-all cursor-pointer'>
                <Image src={Add} />
                <p className='text-xs text-[#858585]'>Add Profile</p>
            </div> :

                <div className='flex flex-col justify-between h-full px-5 py-5'>
                    <h1 className='text-2xl font-semibold'>{profile ? profile[0].name : ""}</h1>
                    <div className='flex flex-col justify-between h-3/6'>
                        <div className='flex justify-between w-full'>
                            <div className='flex items-center text-xs gap-1'>
                                <Image src={WhatsApp} className='w-[2.5em]' />
                                <div className={textstyle}>{profile ? profile[0].phone : ""}</div>
                            </div>
                            <div className='flex items-center text-xs gap-1'>
                                <Image src={Insta} className='w-[2.5em]' />
                                <div className={textstyle}>{profile ? profile[0].instagram : ""}</div>
                            </div>
                        </div>
                        <div className='flex justify-between w-full'>
                            <div className='flex items-center text-xs gap-1'>
                                <Image src={Email} className='w-[2.5em]' />
                                <div className={textstyle}>{profile ? profile[0].email : ""}</div>
                            </div>
                            <div className='flex items-center text-xs gap-1'>
                                <Image src={Youtube} className='w-[2.5em]' />
                                <div className={textstyle}>{profile ? profile[0].youtube : ""}</div>
                            </div>
                        </div>
                    </div>
                </div>
                : ""}
            <Modal ariaHideApp={false} isOpen={open} onRequestClose={() => { setOpen(false); setProfileTab("Basic") }} style={customStyles}>
                <div className='text-black p-2'>
                    <div className='flex justify-between mb-5'>
                        <h1 className=''>Add New Profile</h1>
                        <div onClick={() => { setOpen(false) }}>close</div>
                    </div>
                    <div className='flex justify-between gap-8'>
                        <div className='text-center w-1/2  cursor-pointer' >
                            <p className='text-sm mb-2'>Basic</p>
                            <div id="Basic" style={{ borderColor: profileTab == "Basic" ? "#3F84F8" : "#D9D9D9" }} className='line border-2 rounded'></div>
                        </div>
                        <div className='text-center w-1/2  cursor-pointer'>
                            <p className='text-sm mb-2'>Contact</p>
                            <div id="Contact" style={{ borderColor: profileTab == "Contact" ? "#3F84F8" : "#D9D9D9" }} className='line border-2 rounded'></div>
                        </div>
                    </div>
                    {profileTab == "Basic" ?
                        <div>
                            <div className='mt-3'>
                                <p className='text-sm font-light mb-2'>Enter Name*</p>
                                <input onChange={(e) => { setName(e.target.value) }} className='p-2 border rounded placeholder:text-sm w-full' type="text" placeholder='Eg. John Doe' />
                            </div>
                            <div className='mt-3'>
                                <p className='text-sm font-light mb-2'>Enter Email*</p>
                                <input onChange={(e) => { setEmail(e.target.value) }} className='p-2 border rounded placeholder:text-sm w-full' type="text" placeholder='Eg. John Doe' />
                            </div>
                            <div className='mt-3'>
                                <p className='text-sm font-light mb-2'>Enter Phone*</p>
                                <input onChange={(e) => { setPhone(e.target.value) }} className='p-2 border rounded placeholder:text-sm w-full' type="text" placeholder='Eg. John Doe' />
                            </div>
                            <div className='flex justify-end'>
                                <div onClick={() => { setProfileTab("Contact") }} className='text-xs mt-5 w-1/5 text-white text-center bg-[#3F84F8] p-2 rounded'>Next</div>
                            </div>
                        </div>
                        :
                        <div>
                            <div className='mt-3'>
                                <p className='text-sm font-light mb-2'>Enter Insta (optional)</p>
                                <input onChange={(e) => { setInsta(e.target.value) }} className='p-2 border rounded placeholder:text-sm w-full' type="text" placeholder='Eg. John Doe' />
                            </div>
                            <div className='mt-3'>
                                <p className='text-sm font-light mb-2'>Enter Youtube (optional)</p>
                                <input onChange={(e) => { setYoutube(e.target.value) }} className='p-2 border rounded placeholder:text-sm w-full' type="text" placeholder='Eg. John Doe' />
                            </div>

                            <div className='flex gap-2 justify-end'>
                                <div onClick={() => { setProfileTab("Basic") }} className='text-xs mt-5 w-1/5 text-center border border-black p-2 rounded'>Back</div>
                                <div onClick={() => { pushProfile(); setOpen(false); getProfile(); setrefresh(true) }} className='text-xs mt-5 w-1/5 text-white text-center bg-[#3F84F8] p-2 rounded'>Done</div>
                            </div>
                        </div>
                    }
                </div>
            </Modal>
        </div>
    );
}