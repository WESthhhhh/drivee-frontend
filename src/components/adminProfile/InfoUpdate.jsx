import React, { useState, useEffect } from 'react';
import Button from "../UI/button";
import { PrimaryInput, TextArea, PasswordInput, EmailInput, BasicEmailInput, TimeRangeInput } from "../UI/formInputs";
import api from '../../utils/axios'; 


export default function InfoUpdate() {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '' 
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get('/users/me', { 
                    withCredentials: true 
                });
                setUserData({
                    firstName: response.data.firstName || '',
                    lastName: response.data.lastName || '',
                    email: response.data.email || '',
                    phone: response.data.phone || '',
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <form className="space-y-12 px-5">
            <div className="space-y-10">
                <div className="text-[#0F34AE] text-[25px] font-bold">Account Details</div>
                <div className="grid grid-cols-2 gap-x-14 gap-y-6">
                    <div className="">
                        <PrimaryInput
                            name="firstName"
                            label="First Name"
                            placeholder={userData.firstName || "Enter Your First Name"}
                            value={userData.firstName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="">
                        <PrimaryInput
                            name="lastName"
                            label="Last Name"
                            placeholder={userData.lastName || "Enter Your Last Name"}
                            value={userData.lastName}
                            onChange={handleInputChange}
                        />
                    </div>
                   
                    <div className="">
                    <BasicEmailInput
                    name="email"
                    label="Email Address"
                    placeholder="Enter Your Email Address"
                    value={userData.email || ""}
                    onChange={handleInputChange}
                />
                    </div>

                    <div className="">
                        <PrimaryInput
                            name="phoneNumber"
                            label="Phone Number"
                            placeholder={userData.phone || "Enter Your Phone Number" }
                            value={userData.phone}
                            onChange={handleInputChange}
                        />           
                    </div>

                    {/* Removed description field since it's not in backend */}
                    
                    
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
    );
}