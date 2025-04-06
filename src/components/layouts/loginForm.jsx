import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../UI/button';
import { EmailInput, PasswordInput } from '../UI/formInputs';
import { Link } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isValid } 
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = (data) => {
    console.log('Login data:', data);
    // Add your authentication logic here
  };

  return (
    <div className='flex gap-32 xl:gap-40 items-center my-4 ml-4'>
      <img 
        src="/images/home-ellipse.png" 
        className="absolute top-0 right-0 w-auto h-auto" 
        alt="background circle" 
      />
      <div className="max-w-[50%]">
        <img src="/images/loginpic.svg" alt="Login image" className='h-[700px]' />
      </div>
      
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-regular mb-8 text-text">
          Welcome back to <span className='text-primary font-bold'>Drivee.</span>
        </h1>
        
        <form onSubmit={handleSubmit(onSubmit)}>
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
  className="mb-4"
/>

          <div className="flex flex-col gap-1 py-7">
            <PasswordInput
              label="Password"
              placeholder="Enter Your password"
              error={errors.password?.message}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters"
                }
              })}
            />
            <Link to={'/forgotPassword'} className='text-primary no-underline text-[12px]'>
              Forgot Password
            </Link>
          </div>

          <Button 
            type='primary' 
            htmlType='submit' 
            className='w-full'
           
          >
            Log In
          </Button>

          <Link to={'/Signup'} className='text-primary no-underline text-[12px] text-center items-center my-4 flex justify-center'>
            New Here? <span className='font-bold'>Sign up</span>
          </Link>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-b200"></div>
            <span className="mx-4 text-b200">or</span>
            <div className="flex-grow border-t border-b200"></div>
          </div>

          <Button 
            type='secondary' 
            htmlType='button'
            className='gap-2 w-full mt-4'
            onClick={() => {
              // Handle Google login here
            }}
          >
            <FaGoogle/> Login With Google
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;