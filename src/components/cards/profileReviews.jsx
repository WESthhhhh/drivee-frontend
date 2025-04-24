export default function ProfileReviews() {
    return (
        <div className="grid grid-cols-2 gap-7">

                
        <div className="border border-stroke rounded-large-md px-[26px] py-4 space-y-6 w-[400px]">
            <div className="flex  gap-5">
                <div className="relative w-10 h-10 shrink-0">
                    <img src="/images/of-2.png" alt="Profile" className="w-full h-full object-cover rounded-full"
        />
                </div>
                <div className="space-y-2">
                    <div className="text-b200 text-[16px] font-bold">Maren Bergson</div>
                    <p className="text-[#454D59]">I entrusted Drivee to sell my TAG Heuer, and the outcome was fantastic.</p>
                    <div className="flex items-center gap-2">
                        {/* star */}
                    </div>
                    <img src="/icons/stars.svg" alt="" />
                </div>

            </div>
        </div>
      </div>
    )
  }
  