import React from 'react';
import { useForm } from 'react-hook-form';
import { PasswordInput } from '../../UI/formInputs';
import Button from '../../UI/button';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/users/reset-password',
        { email: data.email }
      );
      toast.success(response.data.message); 
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to send reset email'
      );
    }
  };

  return (
    <div className="w-full max-w-lg md:ml-30 xl:ml-30">
      <h1 className="text-4xl font-regular mb-8 text-text text-center md:text-start">
      Change Your Password
      </h1>
      <h3 className="text-inputtext text-center mb-8">
      You're almost there! Just choose a new password to complete the reset.
      </h3>
      

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <PasswordInput
            label="Password"
            placeholder="Enter Your New password"
            error={errors.password?.message} 
            {...register("password", {
            required: "Password is required",
            minLength: {
            value: 8,
            message: "Password must be at least 8 characters"
            },
            pattern: {
            value: /[A-Z]/,
            message: "Need at least one uppercase letter"
            }
                      })}
                    />

        <Button
          type="primary"
          htmlType="submit"
          className="w-full mt-2"
          // disabled={isSubmitting}
        >
          {isSubmitting ? 'Changing Password..' : 'Change Password'}
        </Button>
       
      <p className='text-primary no-underline text-sm text-center'>Remember Your Password? <Link to={'/login'} className='font-bold'>Login</Link></p>
      </form>
    </div>
  );
};

export default ResetPassword;