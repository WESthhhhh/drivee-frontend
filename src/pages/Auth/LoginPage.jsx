import loginpic from '/images/loginpic.svg';
import React from 'react';
import Button from '../../components/UI/button';
import { PrimaryInput } from '../../components/UI/formInputs';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
      <>
      <div className='flex gap-11'>
            <div className="w-[50%] ">
                <img src="/images/loginpic.svg" alt="" />
            </div>
            <div>
                <h1 className="text-3xl font-regular text-text">Welcome back to <span className='text-primary font-bold'>Drivee.</span></h1>
            </div>
       </div>
     
      </>
    );
  };
  
  export default Login;