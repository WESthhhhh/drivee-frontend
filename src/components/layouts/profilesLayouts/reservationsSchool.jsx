import SchoolSidebar from "../../schoolProfile/SideBar"
import ReservationsTable from "../../schoolProfile/ReservationTable"
import Picprofile from "../../UI/picprofile";

export default function Home() {
  return (
    <div className="flex">
      <SchoolSidebar />
      <div className="border border-stroke rounded-large-md flex-1 mt-7.5 p-8 space-y-5 mb-12">
        
        <Picprofile/>
        <ReservationsTable />
      </div>
    </div>
  );
}
