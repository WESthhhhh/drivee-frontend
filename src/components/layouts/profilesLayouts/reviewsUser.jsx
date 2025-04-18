import Card from "@/components/account-user/Card";
import Reviews from "@/components/account-user/Reviews";
import SideBar from "@/components/account-user/SideBar";


export default function Home() {
  return (
    <div className="flex">
      <SideBar />
      <div className="border border-stroke rounded-lg flex-1 mt-7.5 p-7.5 space-y-5 mb-12">
        <Card />
        <Reviews />
      </div>
    </div>
  );
}
