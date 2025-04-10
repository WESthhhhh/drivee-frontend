import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../../UI/button';
import { FileInput, PrimaryInput } from '../../UI/formInputs';

const VerificationForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm({
    mode: "onChange",
    defaultValues: {
      schoolName: "",
      document: null
    }
  });

  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('schoolName', data.schoolName.trim());
    formData.append('proof', selectedFile);

    try {
      setApiError('');
      setIsLoading(true);
      
      const response = await axios.post('http://localhost:5000/verifications', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 201) {
        setSignupSuccess(true);
        toast.success('Verification submitted successfully!');
        reset();
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      }
    } catch (error) {
      console.error("[DEBUG] Verification error:", error);
      let errorMessage = 'Verification submission failed';
      
      if (error.response) {
        if (error.response.data?.error) {
          errorMessage = error.response.data.error;
        } else if (error.response.status === 400) {
          errorMessage = 'Invalid verification data';
        } else if (error.response.status === 403) {
          errorMessage = 'Only schools can submit verification';
        } else if (error.response.status === 413) {
          errorMessage = 'File size too large';
        }
      }
      
      setApiError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Basic validation for file type and size (2MB max)
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      const maxSize = 2 * 1024 * 1024; // 2MB
      
      if (!validTypes.includes(file.type)) {
        setApiError('Only PDF, JPG, or PNG files are allowed');
        return;
      }
      
      if (file.size > maxSize) {
        setApiError('File size must be less than 2MB');
        return;
      }
      
      setSelectedFile(file);
      setApiError('');
    }
  };

  return (
    <div className="max-w-lg mx-auto  md:ml-30 xl:ml-30">
      <h1 className="text-4xl font-regular mb-8 text-text">
      Verify Your Profile to Start <span className='text-primary font-bold'>Listing Offers </span>
      </h1>
      
      {signupSuccess && (
        <div className="text-success bg-green-50 text-sm mb-4 p-2 rounded">
          Verification submitted! Redirecting...
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-7 w-full">
        <PrimaryInput
          label="Official School Name"
          placeholder="As registered in official documents"
          error={errors.schoolName?.message}
          {...register("schoolName", {
            required: "School name is required",
            minLength: { value: 3, message: "Minimum 3 characters" }
          })}
        />
        <div className='space-y-2'>
        <FileInput
          label="Verification Document"
          onChange={handleFileChange}
          accept=".pdf,.jpg,.jpeg,.png"
          error={errors.document?.message}
          required
        />
        <p className="text-[13px] text-inputtext">
          Upload official documents (PDF, JPG, PNG) proving your school's registration. Max 2MB.
        </p>
        </div>
        
        {apiError && (
          <div className="text-red-500 text-sm">{apiError}</div>
        )}

        <div className="flex justify-between items-center gap-5">
          <Button
            type="ghost"
            onClick={() => navigate('/dashboard')}
            className="w-[40%]"
          >
            Skip for Now
          </Button>
          
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            // disabled={!isValid || !selectedFile || isLoading}
            loading={isLoading}
          >
            Submit Verification
          </Button>
        </div>
      </form>
    </div>
  );
};

export default VerificationForm;