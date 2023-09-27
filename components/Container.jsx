'use client'
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Transaction from "../assets/Transactions.png"

const Frame = (props) => {
    const [width, setwidth] = useState();

    useEffect(() => {
        setwidth(window.innerWidth);
    }, [])

    return (
        <div className="border border-2 pb-3 px-6 py-1 rounded-2xl boxShadow containerMobile bg-white">

            <div className="my-2">
                <Image src={props.image} alt="" height="30" width="30"></Image>
            </div>
            <div className="text-[10px]">Total {props.topic}</div>
            <div className="flex justify-between items-center">
                <div className="text-xl font-bold">{width > 810 ? String(props?.data).slice(0, 8) : String(props?.data).slice(0, 6)}</div>
                <div className="text-[10px] bg-[#E9F9EB] text-green-600 px-2 py-1 rounded-lg">+10%</div>
            </div>
        </div>
    );
};

export default Frame;
