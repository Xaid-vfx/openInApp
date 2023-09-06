'use client'
import Container from '@/components/Container';
import SignIn from '@/components/SignIn';
import Image from 'next/image'
import Dashboard from '../../assets/icons/dashboard_icon.png'
import Schedule from '../../assets/icons/schedule_icon.png'
import Settings from '../../assets/icons/setting_icon.png'
import User from '../../assets/icons/user_icon.png'
import Transactions from '../../assets/icons/transaction_icon.png'
import { useState } from 'react';
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut } from 'react-chartjs-2';


export default function dashboard() {

    const [userData, setUserData] = useState({
        labels: [2002, 2004, 2006, 2008],
        datasets: [
            {
                label: "Users Gained",
                data: [200, 700, 800, 100],
                backgroundColor: [
                    "#98D89E"
                ],
                borderRadius: "3",
                barPercentage: .8,
                categoryPercentage: .3
            },
            {
                label: "Users Lost",
                data: [300, 200, 600, 500],
                backgroundColor: [
                    "#EE8484"
                ],
                borderRadius: "3",
                barPercentage: .8,
                categoryPercentage: .3
            }
        ],
    });
    const [userData2, setUserData2] = useState({
        labels: [2002, 2004, 2006, 2008],
        datasets: [
            {
                label: "Users Gained",
                data: [2002, 2004, 2006, 2008],
                backgroundColor: [
                    "#98D89E",
                    "#EE8484",
                    "#98D89E",
                    "#EE8484",
                ],
                borderRadius: "1"
            }
        ],
    });

    return (
        <main className="flex min-h-screen items-center justify-between bg-[#F8FAFF] text-black">
            <div className="flex p-10 h-screen w-full">
                <div className="bg-[#4285F4] h-full mr-10 w-2/12 border text-white rounded-xl flex">
                    <div className="flex flex-col p-10">
                        <h1 className="text-3xl font-semibold">Board.</h1>
                        <div className="flex flex-col justify-between h-full">
                            <div className="flex flex-col gap-4 mt-8">
                                <div className="flex items-center gap-4 hover:cursor-pointer">
                                    <Image src={Dashboard} alt="1" height="12" width="12"></Image>
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
                <div className="h-full w-10/12 border flex flex-col items-center px-5">
                    <div className="flex justify-between w-full my-5">
                        <h1 className="font-bold text-lg">Dashboard</h1>
                        <div>img</div>
                    </div>
                    <div className="w-full overflow-y-scroll flex flex-col justify-between h-full">
                        <div className="flex gap-5 border w-full">
                            <div className="w-full h-4">
                                <Container topic="Revenue"></Container>
                            </div>
                            <div className="w-full">
                                <Container topic="Transactions"></Container>
                            </div>
                            <div className="w-full">
                                <Container topic="Likes"></Container>
                            </div>
                            <div className="w-full">
                                <Container topic="Users"></Container>
                            </div>
                        </div>
                        <div className="w-full my-5">
                            <div className="border px-10 py-3 rounded-lg">
                                <h1 className="font-bold text-md">Activities</h1>
                                <h2 className="font-light text-[11px]">May-June 2021</h2>
                                <div>
                                    <Bar data={userData} options={
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
                        <div className="flex w-full">
                            <div className="border px-10 py-3 rounded-lg w-1/2 mr-5">
                                <div className="flex justify-between items-center">
                                    <h1 className="font-bold text-md">Top Products</h1>
                                    <h2 className="font-light text-[11px]">May-June 2021</h2>
                                </div>
                                <div><Doughnut data={userData2} options={
                                    {
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: {
                                                display: false
                                            }
                                        }
                                    }
                                } /></div>
                            </div>
                            <div className="border px-6 py-3 rounded-lg w-1/2">addprofile</div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}