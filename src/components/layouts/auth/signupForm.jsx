import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../UI/button';
import { EmailInput, PasswordInput, PrimaryInput } from '../../UI/formInputs';
import { FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Signup = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: ""
    }
  });

  const onSubmit = (data) => {
    console.log('Signup data:', data);
  };

  return (
    <>
      <h1 className="text-4xl font-regular mb-8 text-text">
        Welcome to <span className='text-primary font-bold'>Drivee.</span>
      </h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>

        <PrimaryInput
          label="Full Name"
          placeholder="User Name Or School name"
          error={errors.fullName?.message}
          {...register("fullName", {
            required: "Full name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters"
            },
            maxLength: {
              value: 50,
              message: "Name cannot exceed 50 characters"
            },
            pattern: {
              value: /^[A-Za-z\s]+$/i,
              message: "Name should only contain letters"
            }
          })}
        />
        
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
        
        <PrimaryInput
        label="Phone Number"
        placeholder="eg: +212 6XX-XXX-XXX"
        error={errors.phoneNumber?.message}
        {...register("phoneNumber", {
            required: "Phone number is required",
            pattern: {
            value: /^(?:\+212|0)([ \-_/]*)(?:[0-9][ \-_/]*){9}$/,
            message: "Please enter a valid Moroccan phone number (e.g., +212 6XX-XXX-XXX or 06XX-XXX-XXX)"
            },
            validate: {
            validPrefix: value => 
                /^(?:\+212|0)([ \-_/]*)([67][ \-_/]*)/.test(value) || 
                "Must start with +2126, +2127, 06, or 07"
            }
        })}
        />

        <PasswordInput
          label="Password"
          placeholder="Enter Your password"
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
          type='primary' 
          htmlType='submit' 
          className='w-full mt-2'
        >
          Sign Up
        </Button>

        <div className='text-center mt-2'>
          <Link to='/login' className='text-primary text-sm flex justify-center items-center'>
            Already Have an Account? <span className='font-bold ml-1'>Login</span>
          </Link>
        </div>
        <Button 
          type='secondary' 
          htmlType='button'
          className='gap-2 w-full'
        >
          <FaGoogle/> Sign Up With Google
        </Button>
      </form>
    </>
  );
};

export default Signup;