import Picprofile from "../UI/picprofile"
export default function Card() {
  return (
    <div className="-space-y-4">
      <div className="relative w-full h-[140px] top-2">
        <img src="/images/cover.svg" alt="" className="rounded-small-md" />
        {/* <div className="bg-[#F5FBFB] rounded-lg py-2 px-6 absolute right-5 bottom-4 cursor-pointer">Edit Cover</div> */}
    </div>
      <div className="flex items-center gap-2 pl-6 relative">
        <div className="relative w-[60px] h-[60px] border-2 border-white rounded-full">
        <img src="/images/of-2.png" alt="Profile" className="w-full h-full object-cover rounded-full"/>
        </div>
       <div className="font-semibold text-[#0B247A]">
        <div>Maren Bergson</div>
        <div className="bg-b50 px-1 py-0.5 w-fit rounded-[4px] text-xs">Pro</div>
       </div>
      </div>
      {/* <Picprofile className="pl-6"/> */}
    </div>
  )
}
