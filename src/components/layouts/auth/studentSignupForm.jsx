import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../../utils/axios';
import Button from '../../UI/button';
import { toast } from 'react-toastify'
import RadioButton from '../../UI/radioButton';

import { EmailInput, PasswordInput, PrimaryInput } from '../../UI/formInputs';

const StudentSignupForm = () => {
  const location = useLocation();
  const { role } = location.state || { role: 'STUDENT' };

  const { 
    register, 
    handleSubmit,
    reset, 
    formState: { errors, isValid },
    watch,
    setValue,
    trigger
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      driverLicense: null
    }
  });
  const driverLicenseValue = watch("driverLicense");
  const validateDriverLicense = (value) => {
    const validateDriverLicense = (value) => {
      if (value !== true) {
        return false; 
      }
      return true;
    };
  };
  const [apiError, setApiError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const [signupSuccess, setSignupSuccess] = useState(false);
  const onSubmit = async (data) => {
    try {
      if (!data.driverLicense) return;

      setApiError('');
      setIsLoading(true);
        const payload = {
            firstName: data.firstName.trim(),
            lastName: data.lastName.trim(),
            email: data.email.trim(),
            phone: data.phone.trim(),
            password: data.password,
            driverLicense: data.driverLicense === "true" || data.driverLicense === true,
            role: 'STUDENT'
            
        };

        console.log("Sending payload:", payload); // Debug log

        const response = await api.post('/users/signupLearner', payload);
        reset();

        if (response.data.success) {
          setSignupSuccess(true); // Set success state
          toast.success('Signup successful!');
          setTimeout(() => {
            navigate('/login');
          }, 1500);
        }
    } catch (error) {
        console.error("Registration error:", error);
        
        let errorMessage = 'Registration failed';
        if (error.response) {
            if (error.response.status === 409) {
                errorMessage = error.response.data.message || 'Email or phone already exists';
            } else if (error.response.status === 400) {
                errorMessage = error.response.data.message || 'Invalid input data';
            }
        } else if (error.message === "Network Error") {
            errorMessage = "Cannot connect to server";
        }
        
        setApiError(errorMessage);
    } finally {
        setIsLoading(false);
    }
};

  return (
    <div className="max-w-xl mx-auto md:ml-30 xl:ml-30">
      <h1 className="text-[35px] md:text-4xl  font-regular mb-8 text-text">
        Welcome to <span className='text-primary font-bold'>Drivee.</span>
      </h1>
      {signupSuccess && (
        <div className="text-success bg-green-50 text-sm mb-4 p-2 rounded">
          Signup successful! Redirecting...
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <PrimaryInput
            label="First Name"
            placeholder="Your first name"
            error={errors.firstName?.message}
            {...register("firstName", {
              required: "First name is required",
              minLength: { value: 2, message: "Minimum 2 characters" }
            })}
          />
          <PrimaryInput
            label="Last Name"
            placeholder="Your last name"
            error={errors.lastName?.message}
            {...register("lastName", {
              required: "Last name is required",
              minLength: { value: 2, message: "Minimum 2 characters" }
            })}
          />
        </div>


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
                /^(?:\+212|0)([ \-_/]*)([675][ \-_/]*)/.test(value) || 
                "Must start with +2126/7/5 or 06/07/05"
            }
          })}
        />

        <PasswordInput
          label="Password"
          placeholder="At least 8 characters"
          error={errors.password?.message}
          {...register("password", {
            required: "Password is required",
            minLength: { value: 8, message: "Minimum 8 characters" },
            pattern: {
              value: /[A-Z]/,
              message: "Requires at least one uppercase letter"
            }
          })}
        />

        {/* Confirm Password */}
        {/* <PasswordInput
          label="Confirm Password"
          placeholder="Confirm your password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: value => 
              value === watch('password') || "Passwords do not match"
          })}
        /> */}

        


      {/* permit */}
      <div className="space-y-2">
          <div className=" items-center gap-3">
            <label className="text-sm font-medium text-primary mb-2">
            Do you have a valid permit?
            </label>
            <div className="flex items-center gap-4">
              <RadioButton
                label="Yes"
                name="driverLicense"
                value={true}
                checked={driverLicenseValue === true}
                onChange={() => {
                  setValue("driverLicense", true);
                  trigger("driverLicense");
                }}
              />
              <RadioButton
                label="No"
                name="driverLicense"
                value={false}
                checked={driverLicenseValue === false}
                onChange={() => {
                  setValue("driverLicense", false);
                  trigger("driverLicense");
                }}
              />
            </div>
          </div>

          {driverLicenseValue === false && (
            <div className="flex items-start p-3 bg-red-50 rounded-lg border border-red-200">
              <span className=" text-error mr-2">❌</span>
              <p className="text-red-500 text-sm">
                Sorry, this platform is only for those with a valid permit.
              </p>
            </div>
          )}
        </div>

        {apiError && (
          <div className="text-red-500 text-sm">{apiError}</div>
        )}

        <Button
          type="primary"
          htmlType="submit"
          className="w-full mt-6"
          loading={isLoading}
        >
          {driverLicenseValue ? "Sign Up" : "Sign Up"}  
        </Button>
      </form>
    </div>
  );
};

export default StudentSignupForm;