import { Star } from "../UI/icons";

export default function Offers() {
  return (
    <div className=" space-y-20">
        <div className="space-y-12 mt-20">
            <div className="text-[#0F34AE] text-[25px] font-bold">My Purchased  Offers</div>
            <div className="grid grid-cols-2 gap-11">
                <div className="border border-stroke rounded-lg p-6 space-y-6">
                    <div className="space-y-3">
                        <div className="text-[#1F2937] text-xl font-semibold">Highway & City Training</div>
                        <div className="text-[#454D59]">Master both **city and highway driving** with real-world experience alongside expert instructors.</div>
                    </div>
                    <div className="flex items-center gap-6">
                        <button className="text-[#0F34AE] border border-[#0F34AE] rounded-lg px-3 py-2">View Details</button>
                        <button className="text-[#0F34AE] bg-[#F5FBFB]  rounded-lg px-3 py-2">Add review</button>
                    </div>
                </div>
                <div className="border border-stroke rounded-lg p-6 space-y-6">
                    <div className="space-y-3">
                        <div className="text-[#1F2937] text-xl font-semibold">Highway & City Training</div>
                        <div className="text-[#454D59]">Master both **city and highway driving** with real-world experience alongside expert instructors.</div>
                    </div>
                    <div className="flex items-center gap-6">
                        <button className="text-[#0F34AE] border border-[#0F34AE] rounded-lg px-3 py-2">View Details</button>
                        <button className="text-[#0F34AE] bg-[#F5FBFB]  rounded-lg px-3 py-2">Add review</button>
                    </div>
                </div>
            </div>
        <button className="bg-[#0B247A] rounded-lg px-6 py-2 text-white ">Get More Offers</button>
        </div>
        {/* Riview Modal  */}
        <div className="w-[530px] h-[567px] bg-white rounded-lg border px-8 py-6 space-y-3">
            <div className="flex justify-end">
                <div className="bg-stroke rounded-[14px] flex items-center justify-center h-9 w-9">X</div>
            </div>
            <div className="space-y-8 ">
                <div className="text-[#0F34AE] text-[30px] font-semibold text-center">Rate And Review</div>
                <div className="space-y-10">
                    <div className="space-y-5">
                        <div className="text-[#0F34AE] font-semibold">Score</div>
                         {/* change the icon */}
                        <div className="flex gap-3">
                            <Star />
                            <Star />
                            <Star />
                            <Star />
                            <Star />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* offer modal */}
        <div className="w-[828px] h-[567px] bg-white rounded-lg border px-8 py-6 space-y-3">
             <div className="flex justify-end">
                <div className="bg-stroke rounded-[14px] flex items-center justify-center h-9 w-9">X</div>
            </div>
            <div className="space-y-8">
                <div className="text-[#0F34AE] text-[30px] font-semibold text-center">Highway & City Training</div>
                <div className="px-6">
                    {/* You could do it :)  all */}
                </div>
            </div>
        </div>
    </div>
  )
}
