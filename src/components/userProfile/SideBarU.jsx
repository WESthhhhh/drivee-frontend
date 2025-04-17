import { Calendar, Logout, Offers, Star, User } from "../UI/icons";
import Img from '/images/of-2.png';
import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <div className="font-poppins py-10 px-7.5">
      <div className="px-[19px] py-[15px] w-[273px]">
        <div className="space-y-[65px]">
          {/* Logo */}
          <div className="relative w-[104.23px] h-[32.14px]">
          <Link to={'/'} className="flex items-center">
          <img src='/logo/Logo.svg' className="hidden md:block md:w-[100px] md:h-[36px]" alt="Drive logo" />
          {/* <img src={logo2} className="block md:hidden w-[80px]" alt="Mobile logo" /> */}
        </Link>
          </div>
          {/* Profile  */}
          <div className="flex items-center gap-2">
            <div className="relative w-[29px] h-[29px]">
              <img src="/images/of-2.png" alt="" className="object-cover rounded-full" />
            </div>
            <div className="font-semibold text-base text-[#0B247A]">Auto Ecole Saada</div>
          </div>
        </div>
        <div className="mt-[37px] space-y-5">
          {/* Account details */}
          <a
            href={"/account-info"}
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
            href={"/account-offer"}
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
            href={"/account-review"}
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
