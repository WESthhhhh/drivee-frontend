import { Pencil, Trash } from "../UI/icons";
import Button from "../UI/button";
import { useState } from "react";

export default function Users() {
  return (
    <div className="space-y-12 px-5 mt-9 font-poppins">
        <div className="space-y-10">
            <div className="text-b200 text-[25px] font-bold">Manage Users</div>
            <div className="">
              {/* list */}
              <div className="mt-4">
                <div className="bg-cayan50 flex gap-4 px-2 py-4 font-semibold text-b200">
                  <div className="basis-2/12">name</div>
                  <div className="basis-2/12">Email</div>
                  <div className="basis-1/12">Phone</div>
                  <div className="basis-2/12">Registered At</div>
                  <div className="basis-2/12">StartDate</div>
                </div>
                {/* map over this */}
                <div className="flex gap-4 px-2 py-4 border-b border-b50">
                  <div className="basis-2/12">Ahmed </div>
                  <div className="basis-2/12 truncate">hehehh@gmail.com</div>
                  <div className="basis-1/12">undefined</div>
                  <div className="basis-2/12">undefined</div>
                  <div className="basis-2/12">undefined</div>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}
