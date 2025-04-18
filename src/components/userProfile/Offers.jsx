import PurchasedOffers from "../cards/purchasedOffers";
import Button from "../UI/button";
import { useNavigate } from "react-router-dom";


const navigate = useNavigate();
export default function Offers() {
  return (
    <div className=" space-y-20">
        <div className="space-y-12 mt-20">
            <div className="text-[#0F34AE] text-[25px] font-bold">My Purchased  Offers</div>
            <div className="grid grid-cols-2 gap-11">
                <PurchasedOffers/>
                <PurchasedOffers/>
            </div>
            <Button type="primary"onClick={() => navigate('/offers')} >Get More Offers</Button>
        <button className="bg-[#0B247A] rounded-lg px-6 py-2 text-light "></button>
        </div>
        
    </div>
  )
}
