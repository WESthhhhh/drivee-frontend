import { Calendar, Logout, Offers, Users, School, User } from "../UI/icons";
import { NavLink, Link } from "react-router-dom"; // Import NavLink
import LogoutButton from "../UI/logoutButton";

export default function SideBar({userData}) {
  return (
    <div className="font-poppins py-10 px-7.5">
      <div className="px-[19px] py-[15px] w-[273px]">
        <div className="space-y-[65px]">
          {/* Logo */}
          <div className="relative">
            <Link to={'/'} className="flex items-center">
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
                : userData?.email?.split('@')[0] || 'Auto Ecole Saada'}
            </div>
          </div>
        </div>
        <div className="mt-[37px] space-y-5">
           {/* Account details */}
           <NavLink
            to="/admin-info"
            className={({ isActive }) => 
              `flex items-center gap-2 p-2 group transition-all duration-300 rounded-small-md ${
                isActive 
                  ? 'bg-cayan50 text-primary font-semibold [&>div>svg>path]:fill-primary'
                  : 'text-[#454D59] hover:bg-cayan50 '
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
            to="/admin-offers"
            className={({ isActive }) => 
              `flex items-center gap-2 p-2 group transition-all duration-300 rounded-small-md ${
                isActive 
                  ? 'bg-cayan50 text-primary font-semibold [&>div>svg>path]:fill-primary'
                  : 'text-[#454D59] hover:bg-cayan50 '
              }`
            }
          >
            <div className="w-4 h-4 flex items-center justify-center">
              <Offers />
            </div>
            <div className="text-base">
              Manage Offers
            </div>
          </NavLink>
          
          {/* School Management */}
          <NavLink
            to="/admin-schools"
            className={({ isActive }) => 
              `flex items-center gap-2 p-2 group transition-all duration-300 rounded-small-md ${
                isActive 
                  ? 'bg-cayan50 text-primary font-semibold'
                  : 'text-[#454D59] hover:bg-cayan50'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="w-4 h-4 flex items-center justify-center">
                  <School fill={isActive ? "#0B247A" : "#454D59"} />
                </div>
                <div className="text-base">
                  School Management
                </div>
              </>
            )}
          </NavLink>

          {/* Users */}
          <NavLink
            to="/admin-users"
            className={({ isActive }) => 
              `flex items-center gap-2 p-2 group transition-all duration-300 rounded-small-md ${
                isActive 
                  ? 'bg-cayan50 text-primary font-semibold'
                  : 'text-[#454D59] hover:bg-cayan50'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="w-4 h-4 flex items-center justify-center">
                  <Users fill={isActive ? "#0B247A" : "#454D59"} />
                </div>
                <div className="text-base">
                  User Management
                </div>
              </>
            )}
          </NavLink>

           {/* Reservations */}
           <NavLink
            to="/admin-reservations"
            className={({ isActive }) => 
              `flex items-center gap-2 p-2 group transition-all duration-300 rounded-small-md ${
                isActive 
                  ? 'bg-cayan50 text-primary font-semibold [&>div>svg>path]:fill-primary'
                  : 'text-[#454D59] hover:bg-cayan50 '
              }`
            }
          >
            <div className="w-4 h-4 flex items-center justify-center">
              <Calendar />
            </div>
            <div className="text-base">
              Reservations
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