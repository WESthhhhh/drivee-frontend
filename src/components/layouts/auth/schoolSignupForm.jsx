import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Button from '../../UI/button';
import { EmailInput, PasswordInput, PrimaryInput } from '../../UI/formInputs';

const SchoolSignupForm = () => {
    const location = useLocation();
    const { role } = location.state || { role: 'SCHOOL' };
  
    const { 
      register, 
      handleSubmit, 
      formState: { errors, isValid }
    } = useForm({
      mode: "onChange",
      defaultValues: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        address: ""
      }
    });
  
    const [apiError, setApiError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const navigate = useNavigate();
  
    const onSubmit = async (data) => {
      console.log("[DEBUG] Form data:", JSON.stringify(data, null, 2));
      const payload = {
        firstName: data.firstName.trim(),
        lastName: data.lastName?.trim() || "School",
        email: data.email.trim(),
        phone: data.phone.trim(),
        // replace(/\D/g, ''),
        password: data.password,
        address: data.address.trim(),
        // role: role
        role: 'SCHOOL' 
      };
      try {
        setApiError('');
        setIsLoading(true);
        console.log("[DEBUG] Payload being sent:", JSON.stringify(payload, null, 2));
        const response = await axios.post('http://localhost:5000/users/signupSchool', payload);
  
        if (response.status === 201) {
          navigate('/signup/school/verification');
          // navigate('/school/dashboard');
        }
      } catch (error) {
        console.error("[DEBUG] Full error object:", error);
        console.error("[DEBUG] Error response data:", error.response?.data);
        console.error("[DEBUG] Error status:", error.response?.status);
        let errorMessage = 'Registration failed';
        if (error.response) {
          if (error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
          } else if (error.response.status === 400) {
            errorMessage = 'Validation failed - please check your inputs';
          } else if (error.response.status === 409) {
            errorMessage = 'Email already exists';
          } else if (error.response.status === 403) {
            errorMessage = 'School registration requires admin approval';
          }
        }
        setApiError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };
  
  return (
    <div className="max-w-xl mx-auto p-4">
        <h1 className="text-4xl font-regular mb-8 text-text">
        Welcome to <span className='text-primary font-bold'>Drivee.</span>
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* School Name */}
        <div className=' grid grid-cols-1 md:grid-cols-2 gap-4'>
        <PrimaryInput
          label="School Name"
          placeholder="Your driving school name"
          error={errors.firstName?.message}
          {...register("firstName", {
            required: "School name is required",
            minLength: { value: 2, message: "Minimum 2 characters" }
          })}
        />
        <PrimaryInput
          label="Owner's Last Name"
          placeholder="School owner's last name"
          error={errors.lastName?.message}
          {...register("lastName", {
            required: false, // Make optional
            minLength: { value: 2, message: "Minimum 2 characters" }
          })}
        />
        </div>
        {/* Email */}
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

        {/* Phone */}
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
         <PrimaryInput
          label="Address"
          placeholder="Your driving school's address"
          error={errors.address?.message}
          {...register("address", {
            required: "address is required",
            minLength: { value: 5, message: "Minimum 5 characters" }
          })}
        />


        {/* Password */}
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

        {apiError && (
          <div className="text-red-500 text-sm">{apiError}</div>
        )}

        <Button
          type="primary"
          htmlType="submit"
          className="w-full"
        //   disabled={!isValid || isLoading}
          loading={isLoading}
        >
          Continue to Verification
        </Button>
      </form>
    </div>
  );
};

export default SchoolSignupForm;