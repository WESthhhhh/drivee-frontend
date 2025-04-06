import loginpic from '/images/loginpic.svg';
import React from 'react';
import Button from '../../components/UI/button';
import { PrimaryInput, EmailInput, PasswordInput } from '../../components/UI/formInputs';
import { Link } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa"
const Login = () => {
    return (
      <>
      <div className='flex gap-32 xl:gap-40 items-center my-4 ml-4'>
            <div className="max-w-[50%] ">
                <img src="/images/loginpic.svg" alt="" className='h-[700px]' />
            </div>
            <div>
                <h1 className="text-4xl  font-regular mb-8 text-text">Welcome back to   <span className='text-primary font-bold'> Drivee.</span></h1>
                <div>
                  <form action="post">
                    <EmailInput label="Email Address" name="name" placeholder="Enter Your email" className="mb-4"/>
                    <div className="flex flex-col gap-1 py-7">
                      <PasswordInput label="Password" name="name" placeholder="Enter Your password"/>
                      <Link to={'/forgotPassword'} className='text-primary no-underline text-[12px]'>Forgot Password</Link>
                    </div>
                    <Button type='primary' htmlType='submit' className='w-full '>Log In</Button>
                    <Link to={'/Signup'} className='text-primary no-underline text-[12px] text-center items-center my-4 flex justify-center'>New Here? <span className='font-bold'>Sign up</span> </Link>
                    <img src="/images/or.svg" alt="" />
                    <Button type='secondary' className='gap-2 w-full mt-4'><FaGoogle/>Login With Google</Button>

                  </form>
                </div>
            </div>
       </div>
     
      </>
    );
  };
  
  export default Login;