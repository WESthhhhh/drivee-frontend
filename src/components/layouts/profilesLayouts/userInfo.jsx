import SchoolSidebar from "../../schoolProfile/SideBar"
import Picprofile from "../../UI/picprofile";
import Cover from "../../schoolProfile/Card"
import InfoUpdate from "../../schoolProfile/InfoUpdate";
export default function Home() {
  return (
    <div className="flex">
      <SchoolSidebar />
      <div className="border border-stroke rounded-large-md flex-1 mt-7.5 p-7 space-y-5 mb-12">
        <Cover />
        <InfoUpdate />
      </div>
    </div>
  );
}