import { PrimaryInput, TextArea } from '../UI/formInputs'; 
import Button from '../UI/button';
import React, { useState } from 'react';

const Contactform = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); 

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    if (!validate()) return;

    setIsLoading(true);

    try {
      const response = await fetch('your-api-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="md:w-[45%]  p-8 border shadow-primary-4 border-b50 rounded-large-md  relative z-10 mt-10 md:mt-0 ">
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-success/10 text-success bg-light rounded-large-sm">
          Message sent successfully! We'll get back to you soon.
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-error/10 text-error rounded-large-sm">
          Failed to send message. Please try again later.
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className='space-y-4'>
        <PrimaryInput 
          label="Name" 
          name="name" 
          placeholder="Enter Your Name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />
        
        <PrimaryInput 
          label="Email" 
          name="email" 
          placeholder="Enter Your Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        
        <PrimaryInput 
          label="Subject" 
          name="subject" 
          placeholder="Enter The Subject"
          value={formData.subject}
          onChange={handleChange}
          error={errors.subject}
        />
        
        <TextArea 
          label="Message" 
          name="message" 
          placeholder="Enter Your Message..."
          value={formData.message}
          onChange={handleChange}
          error={errors.message}
        />
        
        <Button 
          type="submit" 
          className=" mt-6 p-2.5 text-light bg-primary rounded-small-md hover:bg-primary-dark transition-colors"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-light" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          ) : (
            'Submit Message'
          )}
        </Button>
      </form>
    </div>
  );
};

export default Contactform;