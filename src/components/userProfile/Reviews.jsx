'use client'
import { useState } from "react";
import ProfileReviews from "../cards/profileReviews";
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
            <div className="text-b200 text-[25px] font-bold">My Reviews</div>
            <div className="">
              {/* list */}
              <ProfileReviews/>
            </div>
        </div>
    </div>
  )
}