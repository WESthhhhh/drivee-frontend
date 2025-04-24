import { Calendar, Logout, Offers, Star, User } from "../UI/icons";
import { NavLink, Link } from "react-router-dom";
import api from "../../utils/axios";
import LogoutButton from "../UI/logoutButton";
export default function SideBar({ userData }) {
  return (
    <div className="font-poppins py-10 px-7.5">
      <div className="px-[19px] py-[15px] w-[273px]">
        <div className="space-y-[65px]">
          {/* Logo */}
          <div className="relative w-[104.23px] h-[32.14px]">
            <Link to="/">
              <img 
                src="/logo/Logo.svg" 
                alt="Profile" 
                className="md:w-[100px] md:h-[36px]" 
              />
            </Link>
          </div>
          {/* Profile  */}
          <div className="flex items-center gap-2">
            <div className="relative w-[29px] h-[29px]">
              <img 
               src={userData?.profilePicture || "/images/of-2.png"} 
                alt="Profile" 
                className="w-full h-full object-cover rounded-full"
              /> 
            </div>
            <div className="font-semibold text-base text-primary">
              {userData?.firstName && userData?.lastName 
                ? `${userData.firstName} ${userData.lastName}`
                : userData?.email?.split('@')[0] || 'User Profile'}
            </div>          </div>
        </div>
        <div className="mt-[37px] space-y-5">
          {/* Account details */}
          <NavLink
            to="/user-info"
            className={({ isActive }) => 
              `flex items-center gap-2 p-2 group transition-all duration-300 rounded-small-md ${
                isActive 
                  ? 'bg-cayan50 text-primary font-semibold [&>div>svg>path]:fill-primary'
                  : 'text-[#454D59] hover:bg-cayan50'
              }`
            }
          >
            <div className="w-4 h-4 flex items-center justify-center">
              <User />
            </div>
            <div className="text-base">
              Account Details
            </div>
          </NavLink>
          
          {/* Offers */}
          <NavLink
            to="/user-offers"
            className={({ isActive }) => 
              `flex items-center gap-2 p-2 group transition-all duration-300 rounded-small-md ${
                isActive 
                  ? 'bg-cayan50 text-primary font-semibold [&>div>svg>path]:fill-primary'
                  : 'text-[#454D59] hover:bg-cayan50'
              }`
            }
          >
            <div className="w-4 h-4 flex items-center justify-center">
              <Offers />
            </div>
            <div className="text-base">
              My Offers
            </div>
          </NavLink>

          {/* Reviews */}
          <NavLink
            to="/user-reviews"
            className={({ isActive }) => 
              `flex items-center gap-2 p-2 group transition-all duration-300 rounded-small-md ${
                isActive 
                  ? 'bg-cayan50 text-primary font-semibold  [&>div>svg>path]:fill-primary'
                  : 'text-[#454D59] hover:bg-cayan50'
              }`
            }
          >
            <div className="w-4 h-4 flex items-center justify-center">
              <Star />
            </div>
            <div className="text-base">
              My Reviews
            </div>
          </NavLink>
        </div>
        
        
        <div className="mt-[66px] text-error">
          <LogoutButton variant="danger" />
        </div>
        
      </div>
    </div>
  );
}