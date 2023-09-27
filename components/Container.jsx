'use client'
import Image from "next/image";
import React from "react";
import Transaction from "../assets/Transactions.png"

const Frame = (props) => {
    return (
        <div className="border border-2 pb-3 px-6 py-1 rounded-lg boxShadow containerMobile">

            <div className="my-2">
                <Image src={props.image} alt="" height="30" width="30"></Image>
            </div>
            <div className="text-[10px]">Total {props.topic}</div>
            <div className="flex justify-between items-center">
                <div className="text-xl font-bold">{String(props?.data).slice(0, 8)}</div>
                <div className="text-[10px] bg-[#E9F9EB] text-green-600 px-2 py-1 rounded-lg">+10%</div>
            </div>
        </div>
    );
};

export default Frame;
