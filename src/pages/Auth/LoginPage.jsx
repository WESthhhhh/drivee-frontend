import loginpic from '/images/loginpic.svg';
import React from 'react';
import Button from '../../components/UI/button';
import { PrimaryInput } from '../../components/UI/formInputs';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
      <>
      <div className='flex gap-11'>
            <div className="max-w-[50%] ">
                <img src="/images/loginpic.svg" alt="" className='w-[500px]' />
            </div>
            <div>
                <h1 className="text-3xl font-regular text-text">Welcome back to <span className='text-primary font-bold'>Drivee.</span></h1>
                <div>
                  <form action="post">
                    <PrimaryInput label="Email Address" name="name" placeholder="Enter Your email" className="mb-4"/>
                    <div className="flex flex-col gap-1 py-7">
                      <PrimaryInput label="Password" name="name" placeholder="Enter Your password"/>
                      <Link to={'/forgotPassword'} className='text-primary no-underline text-[12px]'>Forgot Password</Link>
                    </div>
                    <Button type='primary' htmlType='submit' className='w-full mb-'>Log In</Button>
                    <Link to={'/Signup'} className='text-primary no-underline text-[12px] text-center items-center'>New Here? <span className='font-bold'>Sign up</span> </Link>

                  </form>
                </div>
            </div>
       </div>
     
      </>
    );
  };
  
  export default Login;