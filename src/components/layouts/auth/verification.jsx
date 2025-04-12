import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../../UI/button';
import { PrimaryInput } from '../../UI/formInputs';
import { FiFile } from 'react-icons/fi';

// Configure axios to send cookies
axios.defaults.withCredentials = true;

const VerificationForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: "onChange",
    defaultValues: {
      schoolName: "",
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileError, setFileError] = useState('');
  const [showErrors, setShowErrors] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileError('');
    
    if (!file) return;

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

  const onSubmit = async (data) => {
    setShowErrors(true);
    
    // Validate both fields
    const isFileValid = !!selectedFile;
    const isNameValid = data.schoolName.trim().length >= 3;

    if (!isNameValid || !isFileValid) {
      if (!isFileValid) setFileError('Please select a verification document');
      return;
    }

    const formData = new FormData();
    formData.append('schoolName', data.schoolName.trim());
    formData.append('proof', selectedFile);

    try {
      setIsLoading(true);
      
      // First verify the endpoint exists
      try {
        await axios.head('http://localhost:5000/verifications');
      } catch (headError) {
        if (headError.response?.status === 404) {
          toast.error('Verification endpoint not found. Contact support.');
          return;
        }
      }

      const response = await axios.post(
        'http://localhost:5000/verifications', 
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );

      if (response.status === 201) {
        setSignupSuccess(true);
        toast.success('Verification submitted successfully!');
        setTimeout(() => navigate('/profile'), 1500);
      }
    } catch (error) {
      console.error('Full error:', error);
      
      if (error.response) {
        console.log('Error details:', error.response.data);
        
        if (error.response.status === 403) {
          if (error.response.data?.error === "Réservé aux écoles.") {
            toast.error('Only schools can submit verifications');
          } else if (error.response.data?.error?.includes?.('already verified')) {
            toast.info('Your school is already verified');
            navigate('/profile');
          } else {
            toast.error('You do not have permission for this action');
          }
        } else if (error.response.status === 404) {
          toast.error('Verification service unavailable. Contact support.');
        } else {
          toast.error(error.response.data?.message || 'Submission failed');
        }
      } else if (error.request) {
        toast.error('No response from server. Check your connection.');
      } else {
        toast.error('Request setup error: ' + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto md:ml-30 xl:ml-30">
      <h1 className="text-4xl font-regular mb-8 text-text">
        Verify Your Profile to Start <span className='text-primary font-bold'>Listing Offers</span>
      </h1>
      
      {signupSuccess && (
        <div className="text-success bg-green-50 text-sm mb-4 p-2 rounded">
          Verification submitted! Redirecting...
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-7 w-full" noValidate>
        <PrimaryInput
          label="Official School Name"
          placeholder="As registered in official documents"
          error={showErrors && errors.schoolName?.message}
          {...register("schoolName", {
            required: "School name is required",
            minLength: { value: 3, message: "Minimum 3 characters" }
          })}
        />
        
        <div className="space-y-2">
          <div className={`flex items-center border rounded-small-md px-3 py-2 ${
            (fileError || (showErrors && !selectedFile)) ? 'border-red-500' : 'border-border-b50'
          }`}>
            <label htmlFor="file-upload" className="flex items-center cursor-pointer gap-3 w-full">
              <FiFile className={`w-4 h-4 ${
                (fileError || (showErrors && !selectedFile)) ? 'text-red-500' : 'text-gray-400'
              }`} />
              <span className={`text-sm ${
                (fileError || (showErrors && !selectedFile)) ? 'text-red-500' : 'text-inputtext'
              } truncate`}>
                {fileName || "Upload File"}
              </span>
            </label>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </div>
          
          <p className="text-[13px] text-inputtext">
            Upload official documents (PDF, JPG, PNG) proving your school's registration. Max 2MB.
          </p>
          
          {(fileError || (showErrors && !selectedFile)) && (
            <p className="text-sm text-red-500 mt-1">
              {fileError || 'Please select a verification document'}
            </p>
          )}
        </div>

        <div className="flex justify-between items-center gap-5">
          <Button
            type="ghost"
            onClick={() => navigate('/profile')}
            className="w-[40%]"
          >
            Skip for Now
          </Button>
          
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            disabled={isLoading}
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