import Card from "@/components/account-user/Card";
import InfoUpdate from "@/components/account-user/InfoUpdate";
import Offers from "@/components/account-user/Offers";
import SideBar from "@/components/account-user/SideBar";


export default function Home() {
  return (
    <div className="flex">
      <SideBar />
      <div className="border border-stroke rounded-lg flex-1 mt-7.5 p-7.5 space-y-5 mb-12">
        <Card />
        <Offers />
      </div>
    </div>
  );
}
