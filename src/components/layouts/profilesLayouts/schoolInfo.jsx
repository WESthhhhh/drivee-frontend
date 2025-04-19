import SchoolSidebar from "../../schoolProfile/SideBar"
import Picprofile from "../../UI/picprofile";
// import Cover from "../../schoolProfile/Card"
import Cover from "../../cards/cover";
import InfoUpdate from "../../schoolProfile/InfoUpdate";
export default function Home() {
  return (
    <div className="flex ">
      <SchoolSidebar />
      <div className="border border-stroke rounded-large-md flex-1 mt-7.5 px-5 py-4 space-y-5  pb-32">
        <Cover />
        <InfoUpdate />
      </div>
    </div>
  );
}