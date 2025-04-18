import SchoolSidebar from "../../schoolProfile/SideBar"
import OffersTable from "../../schoolProfile/OffersTable"
import Picprofile from "../../UI/picprofile";



// import Image from "/images/of-2.png";

export default function ManageOffers() {
  return (
    <div className="flex">
      <SchoolSidebar/>
      <div className="border border-stroke rounded-large-md flex-1 mt-7.5 p-10 space-y-5 mb-12">
    
        <Picprofile/>
        {/* list */}
        <OffersTable />
      </div>
    </div>
  );
}
