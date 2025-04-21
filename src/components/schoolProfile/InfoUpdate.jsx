import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from "../UI/button";
import { PrimaryInput, PasswordInput, BasicEmailInput, TimeRangeInput } from "../UI/formInputs";
import api from '../../utils/axios'; 

export default function InfoUpdate() {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        id: ''
    });
    
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get('/users/me', { 
                    withCredentials: true 
                });
                setUserData({
                    id: response.data.id,
                    firstName: response.data.firstName || '',
                    lastName: response.data.lastName || '',
                    email: response.data.email || '',
                    phone: response.data.phone || '',
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
                toast.error('Failed to load user data');
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await api.patch(`/users/${userData.id}`, userData, {
                withCredentials: true
            });
            
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error('Update error:', error);
            
            if (error.response) {
                if (error.response.status === 409) {
                    toast.error('Email or phone number already exists');
                } else if (error.response.status === 404) {
                    toast.error('User not found');
                } else {
                    toast.error(error.response.data.message || 'Failed to update profile');
                }
            } else {
                toast.error('Network error. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            
            <form className="space-y-12 px-5" onSubmit={handleSubmit}>
                <div className="space-y-10">
                    <div className="text-[#0F34AE] text-[25px] font-bold">Account Details</div>
                    <div className="grid grid-cols-2 gap-x-14 gap-y-6">
                        <div className="">
                            <PrimaryInput
                                name="firstName"
                                label="First Name"
                                placeholder="Enter Your First Name"
                                value={userData.firstName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="">
                            <PrimaryInput
                                name="lastName"
                                label="Last Name"
                                placeholder="Enter Your Last Name"
                                value={userData.lastName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                       
                        <div className="">
                            <BasicEmailInput
                                name="email"
                                label="Email Address"
                                placeholder="Enter Your Email Address"
                                value={userData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="">
                            <PrimaryInput
                                name="phone"
                                label="Phone Number"
                                placeholder="Enter Your Phone Number"
                                value={userData.phone}
                                onChange={handleInputChange}
                            />           
                        </div>

                        <div className="">
                            <TimeRangeInput
                                label="Select Working Hours"
                                fromValue="09:00"
                                toValue="17:00"
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
                <Button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                </Button>
            </form>
        </>
    );
}