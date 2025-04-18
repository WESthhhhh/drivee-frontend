import { Calendar, Logout, Offers, Star, User } from "../UI/icons";
import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <div className="font-poppins py-10 px-7.5">
      <div className="px-[19px] py-[15px] w-[273px]">
        <div className="space-y-[65px]">
          {/* Logo */}
          <div className="relative w-[104.23px] h-[32.14px]">
          <img 
                src="/logo/Logo.svg" 
                alt="Profile" 
                className="md:w-[100px] md:h-[36px]" 
          /> 
          </div>
          {/* Profile  */}
          <div className="flex items-center gap-2">
            <div className="relative w-[29px] h-[29px]">
            <img 
                src="/images/of-2.png" 
                alt="Profile" 
                className="w-full h-full object-cover rounded-full"
              /> 
            </div>
            <div className="font-semibold text-base text-[#0B247A]">Auto Ecole Saada</div>
          </div>
        </div>
        <div className="mt-[37px] space-y-5">
          {/* Account details */}
          <a
            href={"/user-info"}
            className="flex items-center gap-2 p-2 group hover:bg-[#F5FBFB]"
          >
            <div className="w-4 h-4 flex items-center justify-center">
              <User />
            </div>
            <div className="text-base text-[#454D59] group-hover:text-[#0B247A]">
              Account Details
            </div>
          </a>
          {/* Offers */}
          <a
            href={"/user-offers"}
            className="flex items-center gap-2 p-2 group hover:bg-[#F5FBFB]"
          >
            <div className="w-4 h-4 flex items-center justify-center">
              <Offers />
            </div>
            <div className="text-base text-[#454D59] group-hover:text-[#0B247A] group-hover:font-semibold">
              My Offers
            </div>
          </a>
          {/* Reviews */}
          <a
            href={"/user-reviews"}
            className="flex items-center gap-2 p-2 group hover:bg-[#F5FBFB]"
          >
            <div className="w-4 h-4 flex items-center justify-center">
              <Star />
            </div>
            <div className="text-base text-[#454D59] group-hover:text-[#0B247A] group-hover:font-semibold">
              My Reviews
            </div>
          </a>
        </div>
        <a href={"/"} className="flex items-center gap-2 p-2 group  mt-[66px]">
          <div className="w-4 h-4 flex items-center justify-center">
            <Logout />
          </div>
          <div className="text-base text-[#F16965] group-hover:font-semibold">
            Logout
          </div>
        </a>
      </div>
    </div>
  );
}
