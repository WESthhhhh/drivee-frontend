import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../UI/button';
import { EmailInput } from '../../UI/formInputs';
import { Link } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";

const forgotPassword = () => {


 
  return (
    <div className=''>
      <div className="w-full max-w-lg md:ml-30 xl:ml-30">
        <h1 className="text-4xl font-regular mb-8 text-text text-center md:text-start">Did You Forget Your Password?</h1>
        <h3 className='text-inputtext text-center mb-8'>If you've forgotten your password, enter your e-mail address and we'll send you an e-mail </h3>
        
        <form  className='flex flex-col gap-4'>
         <EmailInput
         label="Email Address"
         placeholder="Enter Your email"
         />

          <Button 
            type='primary' 
            htmlType='submit' 
            className='w-full mt-2'
          >
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default forgotPassword;