import React, { useState } from 'react';
import Button from "../UI/button"
import { PrimaryInput, TextArea, PasswordInput, EmailInput, TimeRangeInput } from "../UI/formInputs"
export default function InfoUpdate() {
    const [timeRange, setTimeRange] = useState({
        from: '09:00',
        to: '17:00'
      });
      
      const handleFromChange = (time) => {
        setTimeRange(prev => ({ ...prev, from: time }));
      };
    
      const handleToChange = (time) => {
        setTimeRange(prev => ({ ...prev, to: time }));
      };
  return (
    <form className="space-y-12 px-5">
      <div className="space-y-10">
        <div className="text-[#0F34AE] text-[25px] font-bold">Account Details</div>
        <div className="grid grid-cols-2 gap-x-14 gap-y-6">
            <div className="">
                <PrimaryInput
                    label="First Name"
                    placeholder="Enter Your First Name"
                />
            </div>
            <div className="">
                <PrimaryInput
                    label="Last Name"
                    placeholder="Enter Your Last Name"
                />
            </div>
           
            <div className="">
                <EmailInput
                    label="Email Address"
                    placeholder="Enter Your Email Address"
                />
            </div>

            <div className="">
                <PrimaryInput
                     label="Phone Number"
                    placeholder="Enter Your Phone Number"
                />           
            </div>

            <div className="">
                <TextArea
                    label="Description of the school"
                    placeholder="Enter Description of the schoo"
                />  
            </div>

            <div className="">
                <TimeRangeInput
                    label="Select Working Hours"
                    fromValue={timeRange.from}
                    toValue={timeRange.to}
                    onFromChange={handleFromChange}
                    onToChange={handleToChange}
                />
            </div>
        </div>
      </div>
      <div className="space-y-10">
        <div className="text-[#0F34AE] text-[25px] font-bold">Security Settings</div>
        <div className="grid grid-cols-2 gap-x-14 gap-y-6">
            <div className="">
                <PasswordInput
                label="Your Current Password"
                placeholder="Enter Your Current Password"
                />
            </div>
            <div className="">
            <PasswordInput
                label="New Password"
                placeholder="Enter Your New Password"
                />
            </div>
            <div className="">
            <PasswordInput
                label="Confirm Password"
                placeholder="Confirm Your New Password"
                />
            </div>
        </div>
      </div>
      <Button>Save Changes</Button>
    </form>
  )
}
