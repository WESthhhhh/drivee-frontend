import { PrimaryInput, TextArea } from '../UI/formInputs'; 
import Button from '../UI/button';
import React, { useState } from 'react';
import  {DriveeChatbot}  from '../layouts/driveeChatbot';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false);

  const validate = () => {
    const newErrors = {};
    const phoneRegex = /^[0-9]{10,15}$/;

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    
    if (!validate()) return;

    setIsLoading(true);
    
    const whatsappMessage = `New contact message:%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Subject:* ${formData.subject}%0A*Message:* ${formData.message}`;
    const yourWhatsAppNumber = "+212604070252";
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${yourWhatsAppNumber}&text=${whatsappMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    setFormData({
      name: '',
      phone: '',
      subject: '',
      message: ''
    });
    
    setSubmitStatus('success');
    setIsLoading(false);
  };

  return (
    <div className="md:w-[45%] p-8 border shadow-primary-4 border-b50 rounded-large-md relative z-10 mt-10 md:mt-0">
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-success/10 text-success rounded-large-sm">
          Message sent successfully via WhatsApp!
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className='space-y-4'>
        <PrimaryInput 
          label="Full Name" 
          name="name" 
          placeholder="Your full name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />
        
        <PrimaryInput 
          label="Phone Number" 
          name="phone" 
          placeholder="Your WhatsApp number"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
        />
        
        <PrimaryInput 
          label="Subject" 
          name="subject" 
          placeholder="Message subject"
          value={formData.subject}
          onChange={handleChange}
          error={errors.subject}
        />
        
        <TextArea 
          label="Message" 
          name="message" 
          placeholder="Your message..."
          value={formData.message}
          onChange={handleChange}
          error={errors.message}
        />
        
        <div className="flex flex-col space-y-3">
          <Button 
            type="submit" 
            htmlType='submit'
            className="mt-6 p-2.5 text-light bg-primary rounded-small-md hover:bg-primary-dark transition-colors"
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
              'Send via WhatsApp'
            )}
          </Button>

          <Button 
            type="secondary"
            htmlType='button'
            onClick={() => setShowChatbot(true)}
            className="p-2.5 text-primary bg-light border border-primary rounded-small-md hover:bg-primary/10 transition-colors"
          >
            Chat with Drivee 
          </Button>
        </div>
      </form>

      {showChatbot && <DriveeChatbot onClose={() => setShowChatbot(false)} />}
    </div>
  );
};

export default ContactForm;