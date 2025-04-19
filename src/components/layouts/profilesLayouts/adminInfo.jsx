import AdminSidebar from "../../adminProfile/SideBar"
import Cover from "../../cards/cover";
import InfoUpdate from "../../adminProfile/InfoUpdate";
export default function Home() {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="border border-stroke rounded-large-md flex-1 mt-7.5 px-5 py-4 space-y-5 mb-12">
        <Cover />
        <InfoUpdate />
      </div>
    </div>
  );
}