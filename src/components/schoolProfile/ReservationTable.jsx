'use client'
import { useState } from "react";

export default function Reservations() {
    const [status, setStatus] = useState('idle');
    let color;
    let bg;
    
    switch(status) {
        case "error": 
            color = "#4F7E59";
            bg = "";
            break;
        // Add other cases as needed
        default:
            break;
    }

    return (
        <div className="space-y-12 px-5 mt-9 font-poppins">
            <div className="space-y-10">
                <div className="text-[#0F34AE] text-[25px] font-bold">Reservations</div>
                <div className="">
                    <div className="mt-4">
                        <div className="bg-[#F5FBFB] flex gap-4 px-2 py-4 font-semibold text-[#0B247A]">
                            <div className="basis-2/12">User name</div>
                            <div className="basis-2/12">Offer</div>
                            <div className="basis-2/12">Reservation date</div>
                            <div className="basis-2/12">StartDate</div>
                            <div className="basis-2/12">status</div>
                            <div className="basis-2/12">Payment Status</div>
                        </div>
                        <div className="flex gap-4 px-2 py-4 border-b border-[#9AD4DB]">
                            <div className="basis-2/12">Offer 20 hrs</div>
                            <div className="basis-2/12 truncate">hehehhheheheh</div>
                            <div className="basis-2/12">undefined</div>
                            <div className="basis-2/12">undefined</div>
                            <div className="basis-2/12">
                                <div className="bg-[#F2FAF4] p-2 flex items-center gap-3 text-[#4F7E59] w-fit rounded-lg">
                                    <div className="w-3 h-3 rounded-full border border-[#4F7E59]"></div>
                                    <div>Pending</div>
                                </div>
                            </div>
                            <div className="basis-2/12">
                                <div className="bg-[#FEF0F0] p-2 flex items-center gap-3 text-[#93403E] w-fit rounded-lg">
                                    <div className="w-3 h-3 rounded-full border border-[#93403E]"></div>
                                    <div>Status Tags</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}