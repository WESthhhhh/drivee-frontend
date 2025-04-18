import Card from "@/components/School/Card";
import InfoUpdate from "@/components/School/InfoUpdate";
import SideBar from "@/components/School/SideBar";


export default function Home() {
  return (
    <div className="flex">
      <SideBar />
      <div className="border border-stroke rounded-lg flex-1 mt-7.5 p-7 space-y-5 mb-12">
        <Card />
        <InfoUpdate />
      </div>
    </div>
  );
}
