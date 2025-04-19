import { Pencil, Trash } from "../UI/icons";
import Button from "../UI/button";
import { useState } from "react";

export default function Offers() {
  
  return (
    <div className="space-y-12 px-5 mt-9 font-poppins">
        <div className="space-y-10">
            <div className="text-[#0F34AE] text-[25px] font-bold">Manage Offers</div>
            <div className="">
            <div className="flex justify-end">
          </div>
              {/* list */}
              <div className="mt-4">
                <div className="bg-cayan50 flex gap-4 px-2 py-4 font-semibold text-[#0B247A]">
                  <div className="basis-2/12">name</div>
                  <div className="basis-2/12">Description</div>
                  <div className="basis-1/12">Price</div>
                  <div className="basis-2/12">Duration</div>
                  <div className="basis-2/12">StartDate</div>
                  <div className="basis-2/12">EndDate</div>
                  <div className="basis-1/12">Action</div>
                </div>
                {/* map over this */}
                <div className="flex gap-4 px-2 py-4 border-b border-b50">
                  <div className="basis-2/12">Offer 20 hrs </div>
                  <div className="basis-2/12 truncate">hehehhhhhhhhhheheheh</div>
                  <div className="basis-1/12">undefined</div>
                  <div className="basis-2/12">undefined</div>
                  <div className="basis-2/12">undefined</div>
                  <div className="basis-2/12">undefined</div>
                  <div className="basis-1/12 flex items-center gap-2">
                    <button><Trash /></button>
                    {/* <div className="h-[22px] w-0.25 bg-[#6E6E6A]" />
                    <button><Pencil /></button> */}
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}
