import AdminSidebar from "../../adminProfile/SideBar"
import UsersTable from "../../adminProfile/manageUsers"
import Picprofile from "../../UI/picprofile";



// import Image from "/images/of-2.png";

export default function ManageUsers() {
  return (
    <div className="flex">
      <AdminSidebar/>
      <div className="border border-stroke rounded-large-md flex-1 mt-7.5 p-10 space-y-5 mb-12">
    
        <Picprofile/>
        {/* list */}
        <UsersTable />
      </div>
    </div>
  );
}
