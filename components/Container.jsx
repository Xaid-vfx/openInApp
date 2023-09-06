import Image from "next/image";
import React from "react";
import Transaction from "../assets/Transactions.png"

const Frame = (props) => {
    return (
        <div className="border px-6 py-1 rounded-lg">

            <div className="my-2">
                <Image src={Transaction} alt="" height="30" width="30"></Image>
            </div>
            <div className="text-[10px]">Total {props.topic}</div>
            <div className="flex justify-between items-center">
                <div className="text-xl font-bold">1234</div>
                <div className="text-[10px] bg-[#E9F9EB] text-green-600 px-2 py-1 rounded-lg">+10%</div>
            </div>
        </div>
    );
};

export default Frame;
