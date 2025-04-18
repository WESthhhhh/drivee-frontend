import Image from "next/image";

export default function Card() {
  return (
    <div className="-space-y-4">
      <div className="relative w-full h-[140px]">
        <Image src={"/cover.png"} alt="cover" fill className="object-cover rounded-lg" />
        <div className="bg-[#F5FBFB] rounded-lg py-2 px-6 absolute right-5 bottom-4 cursor-pointer">Edit Cover</div>
    </div>
      <div className="flex items-center gap-2 pl-6">
        <div className="relative w-[78px] h-[78px] border-2 border-white rounded-full">
            <Image src={"/avatar.png"} alt="avatar" fill className="object-cover rounded-full" />
        </div>
        <div className="font-semibold text-[#0B247A]">Maren Bergson</div>
      </div>
    </div>
  )
}
