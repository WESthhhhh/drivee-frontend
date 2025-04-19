import {React, useState} from 'react';
import { useForm } from 'react-hook-form';
import { EmailInput } from '../../UI/formInputs';
import Button from '../../UI/button';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import api from '../../../utils/axios';

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  
  const [forgotSuccess, setForgotSuccess] = useState(false);
  const onSubmit = async (data) => {
    try {
      const response = await api.post(
        'users/forgot-password',
        { email: data.email }
      );
      // toast.success(response.data.message); 
      if (response.status === 200) {
          setForgotSuccess(true);
          toast.success('Email is Sent');
          setTimeout(() => {
          navigate('/');
              }, 1500);
      }
      setForgotSuccess(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to send reset email'
      );
    }
  };

  return (
    <div className="w-full max-w-lg md:ml-30 xl:ml-30">
      <h1 className="text-[35px] md:text-4xl  font-regular mb-8 text-text text-center md:text-start">
        Did You Forget Your Password?
      </h1>
      <h3 className="text-inputtext mb-8">
        Enter your email address to receive a reset link.
      </h3>
      {forgotSuccess && (
          <div className="text-success bg-green-50 text-sm mb-4 p-2 rounded">
            Login successful! Redirecting...
          </div>
        )}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <EmailInput
                  label="Email Address"
                  placeholder="Enter Your email"
                  error={errors.email?.message}
                  register={register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                />

        <Button
          type="primary"
          htmlType="submit"
          className="w-full mt-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Reset Password'}
        </Button>
       
      <p className='text-primary no-underline text-sm text-center'>Remember Your Password? <Link to={'/login'} className='font-bold'>Login</Link></p>
      </form>
    </div>
  );
};

export default ForgotPassword;