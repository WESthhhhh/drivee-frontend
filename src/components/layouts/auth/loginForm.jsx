import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../UI/button';
import { EmailInput, PasswordInput } from '../../UI/formInputs';
import { Link } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = (data) => {
    console.log('Login data:', data);
  };

  return (
    <div className=''>
      <div className="w-full max-w-lg md:ml-30 xl:ml-30">
        <h1 className="text-4xl font-regular mb-8 text-text text-center md:text-start">
          Welcome back to <span className='text-primary font-bold'>Drivee.</span>
        </h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
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

          <div className="flex flex-col gap-1">
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
            <Link to={'/forgotPassword'} className='text-primary no-underline text-sm text-right'>
              Forgot Password?
            </Link>
          </div>

          <Button 
            type='primary' 
            htmlType='submit' 
            className='w-full mt-2'
          >
            Log In
          </Button>

          <div className='text-center mt-2'>
            <Link to={'/select-user'} className='text-primary text-sm flex justify-center items-center'>
              New Here? <span className='font-bold ml-1'>Sign up</span>
            </Link>
          </div>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-b200"></div>
            <span className="mx-4 text-b200">or</span>
            <div className="flex-grow border-t border-b200"></div>
          </div>

          <Button 
            type='secondary' 
            htmlType='button'
            className='gap-2 w-full'
          >
            <FaGoogle/> Login With Google
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;