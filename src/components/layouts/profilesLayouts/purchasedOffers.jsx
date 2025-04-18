import UserSidebar from "../../userProfile/SideBar"
import Cover from "../../userProfile/Card"
import PurchasedOffers from "../../userProfile/Offers";
export default function Home() {
  return (
    <div className="flex">
      <UserSidebar />
      <div className="border border-stroke rounded-large-md flex-1 mt-7.5 px-5 py-4 space-y-5 mb-12">
        <Cover />
        <PurchasedOffers />
      </div>
    </div>
  );
}