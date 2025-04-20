import SchoolSidebar from "../../schoolProfile/SideBar"
import Reviews from "../../schoolProfile/Reviews"
import Picprofile from "../../UI/picprofile";

export default function reviewsSchool() {
  return (
    <div className="flex">
      <SchoolSidebar />
      <div className="border border-stroke rounded-large-md flex-1  p-10 space-y-5 mb-12">
        <Picprofile/>
        <Reviews />
      </div>
    </div>
  );
}
