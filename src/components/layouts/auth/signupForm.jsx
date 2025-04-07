import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '../../UI/button';
import { EmailInput, PasswordInput, PrimaryInput } from '../../UI/formInputs';
import { FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: "",  
      lastName: "",
      email: "",
      phone: "",      
      password: ""
    }
  });

  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setApiError('');
      
      const response = await axios.post('http://localhost:5000/users/signup', {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        phone: data.phone,  // Changed from phoneNumber
        role: 'STUDENT'
      });

      if (response.status === 201) {
        navigate('/');
      }
    } catch (error) {
      if (error.response) {
        setApiError(error.response.data.message || 'Registration failed');
      } else if (error.request) {
        setApiError('Network error - please try again');
      } else {
        setApiError('An unexpected error occurred');
      }
    }
  };

  return (
    <>
      <h1 className="text-4xl font-regular mb-8 text-text">
        Welcome to <span className='text-primary font-bold'>Drivee.</span>
      </h1>
      
      {apiError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        {/* Updated field names to match backend */}
        <PrimaryInput
          label="First Name"
          placeholder="Your first name"
          error={errors.firstName?.message}
          {...register("firstName", {
            required: "First name is required",
            minLength: { value: 2, message: "Minimum 2 characters" },
            maxLength: { value: 50, message: "Maximum 50 characters" },
            pattern: { 
              value: /^[A-Za-z\s]+$/i,
              message: "Only letters allowed"
            }
          })}
        />

        <PrimaryInput
          label="Last Name"
          placeholder="Your last name"
          error={errors.lastName?.message}
          {...register("lastName", {
            required: "Last name is required",
            minLength: { value: 2, message: "Minimum 2 characters" },
            maxLength: { value: 50, message: "Maximum 50 characters" },
            pattern: { 
              value: /^[A-Za-z\s]+$/i,
              message: "Only letters allowed"
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
          placeholder="+212 6XX-XXX-XXX or 06XX-XXX-XXX"
          error={errors.phone?.message}
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^(?:\+212|0)([ \-_/]*)(?:[0-9][ \-_/]*){9}$/,
              message: "Invalid Moroccan phone format"
            },
            validate: {
              validPrefix: value => 
                /^(?:\+212|0)([ \-_/]*)([67][ \-_/]*)/.test(value) || 
                "Must start with +2126/7 or 06/07"
            }
          })}
        />

        <PasswordInput
          label="Password"
          placeholder="At least 8 characters"
          error={errors.password?.message}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Minimum 8 characters"
            },
            pattern: {
              value: /[A-Z]/,
              message: "Requires at least one uppercase letter"
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