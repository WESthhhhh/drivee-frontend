import UserSidebar from "../../userProfile/SideBar"
import Cover from "../../cards/cover";
import ReviewsUser from "../../userProfile/Reviews";
export default function Home() {
  return (
    <div className="flex">
      <UserSidebar />
      <div className="border border-stroke rounded-large-md flex-1 mt-7.5 px-5 pt-4 pb-52 space-y-5 mb-12">
        <Cover />
        <ReviewsUser />
      </div>
    </div>
  );
}