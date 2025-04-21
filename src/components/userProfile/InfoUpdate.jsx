import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from "../UI/button";
import { PrimaryInput, TextArea, PasswordInput, BasicEmailInput } from "../UI/formInputs";
import api from '../../utils/axios'; 

export default function InfoUpdate() {
    
    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting },
        reset,
        setError,
        clearErrors
    } = useForm({
        mode: "onChange"
    });

    const [loading, setLoading] = useState(false);
    const [initialData, setInitialData] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [apiError, setApiError] = useState(null);
    
    useEffect(() => {
        const timers = [];
        
        if (updateSuccess) {
            const timer = setTimeout(() => {
                setUpdateSuccess(false);
            }, 3000);
            timers.push(timer);
        }
        
        if (apiError) {
            const timer = setTimeout(() => {
                setApiError(null);
            }, 3000);
            timers.push(timer);
        }

        return () => timers.forEach(timer => clearTimeout(timer));
    }, [updateSuccess, apiError]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get('/users/me', { 
                    withCredentials: true 
                });
                const userData = {
                    id: response.data.id,
                    firstName: response.data.firstName || '',
                    lastName: response.data.lastName || '',
                    email: response.data.email || '',
                    phone: response.data.phone || '',
                    // dateOfBirth: response.data.dateOfBirth || '',
                    address: response.data.address || '',
                    role: response.data.role || '',
                    // driverLicense: response.data.driverLicense || ''
                };
                setInitialData(userData);
                reset(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setApiError('Failed to load user data');
            }
        };

        fetchUserData();
    }, [reset]);

    const onSubmit = async (data) => {
        console.log('Form submitted with data:', data);
        clearErrors();
        setLoading(true);
        setUpdateSuccess(false);
        setApiError(null);
        
        try {
            const response = await api.put(`/users/${data.id}`, data, {
                withCredentials: true
            });

            console.log('API response:', response);
            setUpdateSuccess(true);
            setInitialData(data);
        } catch (error) {
            console.error('Update error:', error);
            
            if (error.response) {
                if (error.response.status === 409) {
                    setApiError('Email or phone number already exists');
                } else if (error.response.status === 404) {
                    setApiError('User not found');
                } else {
                    setApiError('Failed to update user information');
                }
            } else {
                setApiError('Network error. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="space-y-12 px-5" onSubmit={handleSubmit(onSubmit)}>
            {updateSuccess && (
                <div className="text-success bg-green-50 text-sm mb-4 p-2 rounded-small-md">
                    User information updated successfully!
                </div>
            )}

            {apiError && (
                <div className="text-error text-sm mb-4 p-2 bg-red-50 rounded-small-md">
                    {apiError}
                </div>
            )}

            {errors.root && (
                <div className="text-error text-sm mb-4 p-2 bg-red-50 rounded-small-md">
                    {errors.root.message}
                </div>
            )}
            <div className="space-y-10">
                <div className="text-[#0F34AE] text-[25px] font-bold">Account Details</div>
                <div className="grid grid-cols-2 gap-x-14 gap-y-6">
                    <div className="">
                        <PrimaryInput
                            label="First Name"
                            placeholder="Enter Your First Name"
                            error={errors.firstName?.message}
                            {...register("firstName")}
                        />
                    </div>
                    <div className="">
                        <PrimaryInput
                            label="Last Name"
                            placeholder="Enter Your Last Name"
                            error={errors.lastName?.message}
                            {...register("lastName")}
                        />
                    </div>
                   
                    <div className="">
                        <BasicEmailInput
                            label="Email Address"
                            placeholder="Enter Your Email Address"
                            error={errors.email?.message}
                            {...register("email", {
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                        />
                    </div>

                    <div className="">
                        <PrimaryInput
                            label="Phone Number"
                            placeholder="Enter Your Phone Number"
                            error={errors.phone?.message}
                            {...register("phone", {
                                pattern: {
                                    value: /^[0-9+\-\s]+$/,
                                    message: "Please enter a valid phone number"
                                }
                            })}
                        />           
                    </div>

                    {/* <div className="">
                        <PrimaryInput
                            label="Date of Birth"
                            type="date"
                            {...register("dateOfBirth")}
                        />
                    </div> */}

                    {/* <div className="">
                        <PrimaryInput
                            label="Driver License"
                            placeholder="Enter Driver License"
                            {...register("driverLicense")}
                        />
                    </div> */}

                    <div className="col-span-2">
                        <TextArea
                            label="Address"
                            placeholder="Enter Your Address"
                            rows={3}
                            {...register("address")}
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
                            {...register("currentPassword")}
                        />
                    </div>
                    <div className="">
                        <PasswordInput
                            label="New Password"
                            placeholder="Enter Your New Password"
                            error={errors.newPassword?.message}
                            {...register("newPassword", {
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters"
                                }
                            })}
                        />
                    </div>
                    <div className="">
                        <PasswordInput
                            label="Confirm Password"
                            placeholder="Confirm Your New Password"
                            error={errors.confirmPassword?.message}
                            {...register("confirmPassword", {
                                validate: (value, { newPassword }) => 
                                    !newPassword || !value || value === newPassword || "Passwords do not match"
                            })}
                        />
                    </div>
                </div>
            </div>
            <Button type="primary" htmlType='submit' disabled={isSubmitting || loading}>
                {isSubmitting || loading ? 'Saving...' : 'Save Changes'}
            </Button>
        </form>
    );
}