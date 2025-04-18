import Image from "next/image";

export default function Reviews() {
  return (
    <div className=" space-y-20">
        <div className="space-y-12 mt-20">
            <div className="text-[#0F34AE] text-[25px] font-bold">My Reviews</div>
            <div className="grid grid-cols-2 gap-11">
                <div className="border border-stroke rounded-lg px-10 py-8 space-y-6">
                    <div className="flex items-center gap-5">
                        <div className="relative w-14 h-14 shrink-0">
                            <Image src="/avatar.png" alt="" fill className="object-cover rounded-full" />
                        </div>
                        <div className="space-y-2">
                            <div className="text-[#0F34AE] text-[16px] font-bold">Maren Bergson</div>
                            <p className="text-[#454D59] leading-[213%]">I entrusted Drivee to sell my TAG Heuer, and the outcome was fantastic.</p>
                            <div className="flex items-center gap-2">
                                {/* star */}
                            </div>
                        </div>
                        <Image src="/quotes.png" alt="" height={40} width={45}  />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
