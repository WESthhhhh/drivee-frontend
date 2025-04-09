import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../UI/button';
import { FileInput } from '../../UI/formInputs';
import { Link } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";

const Verification = () => {


 
  return (
    <div className=''>
      <div className="w-full max-w-lg md:ml-30 xl:ml-30">
        <h1 className="text-4xl font-regular mb-8 text-text text-center md:text-start">
        Verify Your Profile to Start<span className='text-primary font-bold pl-2'>Listing Offers</span>
        </h1>
        <h3 className='text-inputtext text-center mb-8'>Before listing your driving school’s offers, we need to verify your profile. This ensures a trusted experience for users.</h3>
        
        <form  className='flex flex-col gap-4'>
         <FileInput
         label="Verification"
         placeholder="Upload your file"
         ></FileInput>
          <div className="flex flex-col gap-1">
           
            <Link to={'/'} className='text-primary no-underline text-sm text-right'>
              later
            </Link>
          </div>

          <Button 
            type='primary' 
            htmlType='submit' 
            className='w-full mt-2'
          >
            Complete Verification
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Verification;