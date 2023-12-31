'use client'
import Container from '../../components/Container';
import Image from 'next/image'
import dashboard from '../../assets/icons/dashboard_icon.png'
import Schedule from '../../assets/icons/schedule_icon.png'
import Settings from '../../assets/icons/setting_icon.png'
import User from '../../assets/icons/user_icon.png'
import Transactions from '../../assets/icons/transaction_icon.png'
import Pink from '../../assets/icons/pinkIcon.png'
import Purp from '../../assets/icons/purpIcon.png'
import Green from '../../assets/icons/greenIcon.png'
import Yellow from '../../assets/Transactions.png'
import Menu from '../../assets/icons/menu.png'
import Bell from '../../assets/icons/Bell.png'
import { useEffect, useState } from 'react';
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut } from 'react-chartjs-2';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/dist/server/api-utils';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import AddProfile from '../../components/AddProfile';
import { createClient } from '@supabase/supabase-js';


export default function Dashboard() {

    const [btc, setbtc] = useState()
    const [eth, seteth] = useState()
    const [stats, setstats] = useState({})
    const [stats2, setstats2] = useState({})
    const [stats3, setstats3] = useState({})

    const [showmenu, setshowmenu] = useState(false)

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/')
        }
    });
    console.log(session);

    async function getGraphData() {
        const data1 = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true")
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                setstats(data)
            });
        const data2 = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true")
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                setstats2(data)
            });
        const data3 = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true")
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                setstats3(data)
            });
        const bitcoin = await fetch("https://api.coingecko.com/api/v3/coins/binancecoin/market_chart?vs_currency=usd&days=30&interval=daily")
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                setbtc(data.prices.map(e => {
                    return e[1]
                }))

            });
        const eth = await fetch("https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=30&interval=daily")
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                seteth(data.prices.map(e => {
                    return e[1]
                }))
            });


        return { data: data1, bitcoin: bitcoin?.prices, eth: eth?.prices }
    }

    function handleCloseMenu() {
        const ele = document.getElementById("dashboardMobile")
        ele.style.display = "none"
    }
    function handleMenu() {
        const ele = document.getElementById("dashboardMobile")
        ele.style.display = "block"
    }
    function handleClick() {
        const ele = document.getElementById("SignOutbtn")
        if (ele.style.display == "block") ele.style.display = "none"
        else ele.style.display = "block"
    }


    useEffect(() => {
        getGraphData()
            .then(res => {
                console.log(btc);
            })
    }, []);


    return (
        <main className="flex min-h-screen items-center justify-between bg-[#F8FAFF] text-black">
            <div className="flex p-10 h-screen w-full dashboardglobalMobile">
                <div className="bg-[#4285F4] h-full mr-10 w-2/12 text-white rounded-xl flex dashboardMobile1" id="dashboardMobile">
                    <div className="flex flex-col p-10 w-full h-full">
                        <div className='flex justify-between items-center'>
                            <h1 className="text-3xl font-semibold">Board.</h1>
                            <div className='text-3xl font-thin cursor-pointer hidden MenuMobile' onClick={() => { handleCloseMenu() }}>X</div>
                        </div>
                        <div className="flex flex-col justify-between h-full">
                            <div className="flex flex-col gap-4 mt-8">
                                <div className="flex items-center gap-4 hover:cursor-pointer">
                                    <Image src={dashboard} alt="1" height="12" width="12"></Image>
                                    <h2 className="text-sm font-bold">Dashboard</h2>
                                </div>
                                <div className="flex items-center gap-4 hover:cursor-pointer">
                                    <Image src={Transactions} alt="1" height="12" width="12"></Image>
                                    <h2 className="text-sm font-thin">Transactions</h2>
                                </div>
                                <div className="flex items-center gap-4 hover:cursor-pointer">
                                    <Image src={Schedule} alt="1" height="12" width="12"></Image>
                                    <h2 className="text-sm font-thin">Schedules</h2>
                                </div>
                                <div className="flex items-center gap-4 hover:cursor-pointer">
                                    <Image src={User} alt="1" height="12" width="12"></Image>
                                    <h2 className="text-sm font-thin">Users</h2>
                                </div>
                                <div className="flex items-center gap-4 hover:cursor-pointer">
                                    <Image src={Settings} alt="1" height="12" width="12"></Image>
                                    <h2 className="text-sm font-thin">Settings</h2>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h2 className="text-xs font-thin">Help</h2>
                                <h2 className="text-xs font-thin">Contact us</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-full w-10/12 flex flex-col items-center px-5 dashboardMobile2 relative">
                    <div className="flex justify-between w-full my-5 items-center">
                        <div className='flex items-center gap-2'>
                            <Image src={Menu} className='MenuMobile hidden cursor-pointer hover:scale-110 hover:rotate-180 transition-all ' onClick={() => { handleMenu() }} />
                            <h1 className="font-bold text-lg">Dashboard</h1>
                        </div>
                        <div className='flex gap-6 items-center'>
                            <input type='text' placeholder='Search...' className='p-1 px-4 rounded placeholder:text-sm searchMobile' />
                            <Image src={Bell} className='hover:scale-110 transition-all' alt='Bell' height={20} width={20} />
                            <div onClick={() => { handleClick() }} className='w-[35px] cursor-pointer'>
                                <img src={session?.user?.image} className=' transition-all hover:scale-110 w-full rounded-[100px]' />
                            </div>
                            <div onClick={() => { signOut({ callbackUrl: 'http://localhost:3000' }) }} id="SignOutbtn" className='hover:bg-slate-100 cursor-pointer rounded-md absolute right-4 top-16 bg-white p-2 border text-sm hidden'>Sign Out</div>
                        </div>
                    </div>
                    <div className="w-full overflow-y-scroll flex flex-col justify-between h-full dashboardMobile21">
                        <div className="flex w-full firstRowMobile">
                            <div className='w-full flex justify-between'>
                                <div className="w-full mr-2 mb-2">
                                    <Container topic="Bitcoin Price" data={"$" + stats?.bitcoin?.usd} image={Green}></Container>
                                </div>
                                <div className="w-full mr-2 mb-2 justify-between">
                                    <Container topic="Change in 24h" data={stats?.bitcoin?.usd_24h_change} image={Yellow}></Container>
                                </div>
                            </div>
                            <div className='w-full flex'>
                                <div className="w-full mr-2 mb-2">
                                    <Container topic="Volume" data={"$" + stats?.bitcoin?.usd_24h_vol} image={Pink}></Container>
                                </div>
                                <div className="w-full mr-2 mb-2">
                                    <Container topic="Market Cap" data={"$" + stats?.bitcoin?.usd_market_cap} image={Purp}></Container>
                                </div>
                            </div>
                        </div>
                        <div className="w-full my-5">
                            <div className="border border-2 boxShadow px-10 py-3 rounded-2xl ActivitiesMobile bg-white">
                                <div className='flex justify-between'>
                                    <h1 className="font-bold text-md">Activities</h1>
                                    <div className='text-xs flex gap-6'>
                                        <span className='flex items-center gap-2'>
                                            <span className='h-2 rounded bg-[#98D89E] w-2'></span>
                                            <span>Binance Coin</span>
                                        </span>
                                        <span className='flex items-center gap-2'>
                                            <span className='h-2 rounded bg-[#EE8484] w-2'></span>
                                            <span>Ether</span>
                                        </span>
                                    </div>
                                </div>
                                <h2 className="font-light text-[11px] mb-4">May-June 2021</h2>
                                <div>
                                    <Bar data={
                                        {
                                            labels: ["Week1", "Week2", "Week3", "Week4"],
                                            datasets: [
                                                {
                                                    label: "Binance Coin",
                                                    data: btc,
                                                    backgroundColor: [
                                                        "#98D89E"
                                                    ],
                                                    borderRadius: "3",
                                                    barPercentage: .8,
                                                    categoryPercentage: .3
                                                },
                                                {
                                                    label: "Ethereum",
                                                    data: eth,
                                                    backgroundColor: [
                                                        "#EE8484"
                                                    ],
                                                    borderRadius: "3",
                                                    barPercentage: .8,
                                                    categoryPercentage: .3
                                                }
                                            ],
                                        }
                                    } options={
                                        {
                                            maintainAspectRatio: false,
                                            plugins: {
                                                legend: {
                                                    display: false
                                                }
                                            },
                                            scales: {
                                                x: {
                                                    grid: {
                                                        display: false
                                                    }
                                                }
                                            }
                                        }
                                    } />
                                </div>
                            </div>

                        </div>
                        <div className="flex w-full lastColumnMobile">
                            <div className="border border-2 boxShadow px-10 py-3 rounded-2xl w-1/2 mr-5 lastColumnMobile1 bg-white">
                                <div className="flex justify-between items-center">
                                    <h1 className="font-bold text-md">Top Products</h1>
                                    <h2 className="font-light text-[11px]">May-June 2021</h2>
                                </div>
                                <div className='flex justify-between'>
                                    <div className='w-1/3'><Doughnut data={
                                        {
                                            labels: [2002, 2004, 2006],
                                            datasets: [
                                                {
                                                    label: "Current Price",
                                                    data: [stats?.bitcoin?.usd, stats2?.ethereum?.usd, stats3?.binancecoin?.usd],
                                                    backgroundColor: [
                                                        "#98D89E",
                                                        "#EE8484",
                                                        "#9d4bcd"
                                                    ],
                                                    borderRadius: "1"
                                                }
                                            ],
                                        }
                                    } options={
                                        {
                                            maintainAspectRatio: false,
                                            plugins: {
                                                legend: {
                                                    display: false
                                                }
                                            }
                                        }
                                    } /></div>
                                    <div className='w-1/2 text-xs font-semibold flex flex-col justify-center gap-3'>
                                        <span className=''>
                                            <div className='flex items-center gap-3'>
                                                <span className='h-2.5 rounded-xl bg-[#98D89E] w-2.5'></span>
                                                <span>Bitcoin</span>
                                            </div>
                                            <div className='text-[9px] text-[#858585] font-light ml-5'>92%</div>

                                        </span>
                                        <span className=''>
                                            <div className='flex items-center gap-3'>
                                                <span className='h-2.5 rounded-xl bg-[#EE8484] w-2.5'></span>
                                                <span>Ethereum</span>
                                            </div>
                                            <div className='text-[9px] text-[#858585] font-light ml-5'>7%</div>
                                        </span>
                                        <span className=''>
                                            <div className='flex items-center gap-3'>
                                                <span className='h-2.5 rounded-xl bg-[#9d4bcd] w-2.5'></span>
                                                <span>Binance coin</span>
                                            </div>
                                            <div className='text-[9px] text-[#858585] font-light ml-5'>1%</div>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="border border-2 boxShadow px-6 py-3 rounded-2xl w-1/2 lastColumnMobile2 bg-white">
                                {session?.user ? <AddProfile session={session} /> : "Loading"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}