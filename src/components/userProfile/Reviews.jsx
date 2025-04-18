'use client'
import { useState } from "react";

export default function Reviews() {
    const [status, setStatus] = useState('idle');
    let color;
    let bg;
    switch(status) {
        case "error" : 
            color = "#4F7E59";
            bg = ""
    }
  return (
    <div className="space-y-12 px-5 mt-9 font-poppins">
        <div className="space-y-10">
            <div className="text-[#0F34AE] text-[25px] font-bold">Reviews</div>
            <div className="">
              {/* list */}
              <div className="grid grid-cols-2 gap-7">
                  <div className="border border-stroke rounded-large-md px-[26px] py-4 space-y-6 w-[430px]">
                      <div className="flex items-center gap-5">
                          <div className="relative w-10 h-10 shrink-0">
                              <img src="/images/of-2.png" alt="Profile" className="w-full h-full object-cover rounded-full"
                  />
                          </div>
                          <div className="space-y-2">
                              <div className="text-[#0F34AE] text-[16px] font-bold">Maren Bergson</div>
                              <p className="text-[#454D59]">I entrusted Drivee to sell my TAG Heuer, and the outcome was fantastic.</p>
                              <div className="flex items-center gap-2">
                                  {/* star */}
                              </div>
                              <img src="/icons/stars.svg" alt="" />
                          </div>

                      </div>
                      <button className="bg-[#F5FBFB] py-2 px-5 text-[#0B247A] w-fit rounded-small-md">Reply to this Review</button>
                  </div>
                </div>
            </div>
        </div>
    </div>
  )
}