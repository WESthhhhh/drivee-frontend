import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../../UI/button';
import { PrimaryInput, FileInput } from '../../UI/formInputs';
import { FiFile } from 'react-icons/fi';

// Configure axios to send credentials
axios.defaults.withCredentials = true; 

const VerificationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: "onChange",
    defaultValues: {
      schoolName: "",
      proof: "",
    }
  });

  // State management
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileError, setFileError] = useState('');
  const [formError, setFormError] = useState(null);

  // File input handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileError('');
    setSelectedFile(null);
    setFileName('');
    
    if (!file) {
      setFileError('Please select a verification document');
      return;
    }

    // Validate file type and size
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    const maxSize = 2 * 1024 * 1024; // 2MB
    
    if (!validTypes.includes(file.type)) {
      setFileError('Only PDF, JPG, or PNG files are allowed');
      return;
    }
    
    if (file.size > maxSize) {
      setFileError('File size must be less than 2MB');
      return;
    }
    
    setSelectedFile(file);
    setFileName(file.name);
  };

  // Form submission handler
  const onSubmit = async (data) => {
    if (!selectedFile) {
      setFileError('Please select a verification document');
      return;
      
    }
    console.log('Selected file:', selectedFile); // Debug
  
    const formData = new FormData();
    formData.append('schoolName', data.schoolName.trim());
    formData.append('proof', selectedFile);
  
    try {
      setIsSubmitting(true);
      setFormError(null);
      
      const response = await axios.post(
        'http://localhost:5000/verifications', 
        formData,
        {
          headers: { 
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        }
      );
  
      if (response.status === 201) {
        setSignupSuccess(true);
        toast.success('Verification submitted successfully!');
        setTimeout(() => navigate('/profile'), 1500);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setFormError(null);
      
      // Handle network errors
      if (!error.response) {
        const msg = 'Network error - please check your connection';
        setFormError(msg);
        toast.error(msg);
        return;
      }

      // Set user-friendly error messages
      const errorMessage = error.response.data?.error === 'Réservé aux écoles.' 
        ? 'This feature is reserved for schools only'
        : error.response.data?.message || 
          error.response.data?.error || 
          'Submission failed. Please try again.';
      
      // Display error in both places
      setFormError(errorMessage);
      toast.error(errorMessage);

      // Handle special cases
      if (error.response.status === 403 || error.response.status === 401) {
        setTimeout(() => navigate('/profile'), 2000);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto md:ml-30 xl:ml-30">
      <h1 className="text-4xl font-regular mb-8 text-text text-center md:text-start">
        Verify Your Profile to Start <span className='text-primary font-bold'>Listing Offers</span>
      </h1>
      
      {/* Success message */}
      {signupSuccess && (
        <div className="text-success bg-green-50 text-sm mb-4 p-2 rounded">
          Verification submitted! Redirecting...
        </div>
      )}
      
      {/* Form error display */}
      {formError && (
        <div className="text-error bg-red-50 text-sm mb-4 p-2 rounded animate-fade-in">
          {formError}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-7 w-full" noValidate>
        {/* School Name Input */}
        <PrimaryInput
          label="Official School Name"
          placeholder="As registered in official documents"
          error={errors.schoolName?.message}
          {...register("schoolName", {
            required: "School name is required",
            minLength: { value: 3, message: "Minimum 3 characters" }
          })}
        />
        
        {/* File Upload */}
        <FileInput
          label="Verification Document"
          onChange={handleFileChange}
          error={fileError}
          accept=".pdf,.jpg,.jpeg,.png"
          fileName={fileName}
          description="Upload official documents (PDF, JPG, PNG) proving your school's registration. Max 2MB."
        />
        <p className="text-[13px] text-inputtext">
          Upload official documents (PDF, JPG, PNG) proving your school's registration. Max 2MB.
        </p>

        {/* Form Actions */}
        <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-5">
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            disabled={isSubmitting}
            loading={isSubmitting}
          > 
            {isSubmitting ? 'Submitting...' : 'Submit Verification'}
          </Button>
          
          <Button
            type="ghost"
            onClick={() => navigate('/profile')}
            className="w-full md:w-[40%]"
          >
            Skip for Now
          </Button>
        </div>
      </form>
    </div>
  );
};

export default VerificationForm;