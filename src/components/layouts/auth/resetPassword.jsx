import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { PasswordInput } from '../../UI/formInputs';
import Button from '../../UI/button';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const [resetSuccess, setResetSuccess] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    if (!token) {
      toast.error('Missing reset token in URL');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/users/reset-password',
        { 
          token,
          newPassword: data.password 
        }
      );

      if (response.status === 200) {
        setResetSuccess(true);
        toast.success('Password reset successful!');
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to reset password'
      );
    }
  };

  return (
    <div className="w-full max-w-lg md:ml-30 xl:ml-30">
      <h1 className="text-4xl font-regular mb-8 text-text text-center md:text-start">
        Change Your Password
      </h1>

      {resetSuccess ? (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          <p className="font-bold">Password reset successful!</p>
          <p>Redirecting to login page...</p>
        </div>
      ) : (
        <>
          <h3 className="text-inputtext text-center mb-8">
            You're almost there! Just choose a new password to complete the reset.
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <PasswordInput
              label="New Password"
              placeholder="Enter your new password"
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
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Resetting Password...' : 'Reset Password'}
            </Button>
          
            <p className='text-primary no-underline text-sm text-center'>
              Remember Your Password? <Link to={'/login'} className='font-bold'>Login</Link>
            </p>
          </form>
        </>
      )}
    </div>
  );
};

export default ResetPassword;