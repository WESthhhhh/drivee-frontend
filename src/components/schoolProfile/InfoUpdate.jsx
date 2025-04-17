
import { PrimaryInput,  } from "../UI/formInputs"
export default function InfoUpdate() {
  return (
    <form className="space-y-12 px-5">
      <div className="space-y-10">
        <div className="text-[#0F34AE] text-[25px] font-bold">Account Details</div>
        <div className="grid grid-cols-2 gap-x-14 gap-y-6">
            <div className="">
                <label>First Name</label>
                <input type="text" className="w-full border border-stroke rounded-lg h-12 px-6" />
            </div>
            <div className="">
                <label>Last Name</label>
                <input type="text" className="w-full border border-stroke rounded-lg h-12 px-6" />
            </div>
            <div className="">
                <label>Email Address</label>
                <input type="text" className="w-full border border-stroke rounded-lg h-12 px-6" />
            </div>
            <div className="">
                <label>Phone Number</label>
                <input type="text" className="w-full border border-stroke rounded-lg h-12 px-6" />
            </div>
            <div className="">
                <label>Description of the school</label>
                <textarea  className="w-full border border-stroke rounded-lg h-[120px] px-6" />
            </div>
            <div className="">
                <label>Working Hours</label>
                <select  className="w-full border border-stroke rounded-lg h-12 px-6" />
            </div>
        </div>
      </div>
      <div className="space-y-10">
        <div className="text-[#0F34AE] text-[25px] font-bold">Security Settings</div>
        <div className="grid grid-cols-2 gap-x-14 gap-y-6">
            <div className="">
                <label>Password</label>
                <input type="text" className="w-full border border-stroke rounded-lg h-12 px-6" />
            </div>
            <div className="">
                <label>New password</label>
                <input type="text" className="w-full border border-stroke rounded-lg h-12 px-6" />
            </div>
            <div className="">
                <label>Confirm Password</label>
                <input type="text" className="w-full border border-stroke rounded-lg h-12 px-6" />
            </div>
        </div>
      </div>
      <button className="bg-[#0B247A] rounded-lg px-6 py-2 text-white ">Save Changes</button>
    </form>
  )
}
