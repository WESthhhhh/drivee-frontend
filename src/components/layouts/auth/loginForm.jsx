import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../UI/button';
import { EmailInput, PasswordInput } from '../../UI/formInputs';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors, isSubmitting },
    setError,
    clearErrors
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(' Auth cookie received');
    console.log(' Redirecting to /home');
    clearErrors(['email', 'password', 'root']);
    setLoginSuccess(false);
    
    try {
      const response = await axios.post('http://localhost:5000/users/login', data, {
        withCredentials: true
      });
      reset();
      if (response.status === 200) {
        setLoginSuccess(true);
        toast.success('Login successful!');
        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
    } catch (error) {
      setLoginSuccess(false);
      if (error.response) {
        if (error.response.status === 401) {
          if (error.response.data.message === 'User not found') {
            setError('email', {
              type: 'manual',
              message: 'No account found with this email'
            });
          } 
          else if (error.response.data.message === 'Invalid password') {
            setError('password', {
              type: 'manual',
              message: 'Incorrect password'
            });
          }
          else {
            setError('root', {
              type: 'manual',
              message: 'Invalid email or password'
            });
          }
        }
        else {
          setError('root', {
            type: 'manual',
            message: error.response.data.message || 'Login failed'
          });
        }
      } else if (error.request) {
        setError('root', {
          type: 'manual',
          message: 'No response from server'
        });
      } else {
        setError('root', {
          type: 'manual',
          message: 'Login error: ' + error.message
        });
      }
    }
  };

  return (
    <div className=''>
      <div className="w-full max-w-lg md:ml-30 xl:ml-30">
        <h1 className="text-4xl font-regular mb-8 text-text text-center md:text-start">
          Welcome back to <span className='text-primary font-bold'>Drivee.</span>
        </h1>
        
        
        {loginSuccess && (
          <div className="text-success bg-green-50 text-sm mb-4 p-2 rounded">
            Login successful! Redirecting...
          </div>
        )}

       
        {errors.root && (
          <div className="text-error text-sm mb-4 p-2 bg-red-50 rounded">
            {errors.root.message}
          </div>
        )}

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
            <Link to={'/forgot-password'} className='text-primary no-underline text-sm text-right'>
              Forgot Password?
            </Link>
          </div>

          <Button 
            type='primary' 
            htmlType='submit' 
            className='w-full mt-2'
          >
            {isSubmitting ? 'Logging in...' : 'Log In'}
          </Button>

          <div className='text-center mt-2'>
            <Link to={'/select-user'} className='text-primary text-sm flex justify-center items-center'>
              New Here? <span className='font-bold ml-1'>Sign up</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;