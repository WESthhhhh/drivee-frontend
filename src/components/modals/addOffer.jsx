import { FaRegClock, FaDollarSign, FaMapMarkerAlt } from 'react-icons/fa';
import { IoCalendarClearOutline } from "react-icons/io5";
import { IoMdClose } from 'react-icons/io';
import React, { useState } from 'react';
import Button from '../UI/button';
import { PrimaryInput, TextArea } from '../UI/formInputs';

const AddOfferModal = ({ isOpen, closeModal, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    price: '',
    startDate: '',
    endDate: '',
    location: ''
  });

  const [errors, setErrors] = useState({
    title: '',
    description: '',
    duration: '',
    price: '',
    startDate: '',
    endDate: '',
    location: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      title: '',
      description: '',
      duration: '',
      price: '',
      startDate: '',
      endDate: '',
      location: ''
    };

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters";
      isValid = false;
    }

    if (!formData.duration) {
      newErrors.duration = "Duration is required";
      isValid = false;
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
      isValid = false;
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
      isValid = false;
    }

    if (!formData.endDate) {
      newErrors.endDate = "End date is required";
      isValid = false;
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      
      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        duration: parseInt(formData.duration),
        price: parseFloat(formData.price),
        startDate: formData.startDate,
        endDate: formData.endDate,
        location: formData.location.trim()
      };
      
      
      await onSubmit(payload);
      
     
      setFormData({
        title: '',
        description: '',
        duration: '',
        price: '',
        startDate: '',
        endDate: '',
        location: ''
      });
      
      closeModal();
    } catch (error) {
      console.error('Submission error:', error);
      
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-b500 bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-[9999999999] p-4">
      <div className="bg-light rounded-large-md max-w-lg w-full max-h-[90vh] flex flex-col relative">
        <button 
          onClick={closeModal}
          className="absolute right-4 top-4 w-8 h-8 flex justify-center items-center bg-b50 hover:bg-blue-100 rounded-small-sm text-b500 font-bold text-xl z-10 transition-colors"
        >
          <IoMdClose />
        </button>

        <div className="p-5 flex-1 overflow-y-auto">
          <h1 className="text-b200 font-bold text-xl text-center pt-8 pb-8">Add New Offer</h1>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <PrimaryInput
              label="Offer Title"
              placeholder="Enter offer title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              error={errors.title}
            />
            
            <TextArea
              label="Description"
              placeholder="Enter course description (minimum 10 characters)"
              rows={3}
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              error={errors.description}
            />

            <div className="grid grid-cols-2 gap-3 my-2 border-t border-b border-blue-50 py-4">
              <PrimaryInput
                label={
                  <div className="flex items-center gap-1">
                    <FaRegClock className="text-xs" />
                    <span>Duration (hours)</span>
                  </div>
                }
                type="number"
                placeholder="0"
                value={formData.duration}
                onChange={(e) => handleChange('duration', e.target.value)}
                error={errors.duration}
                min="1"
              />

              <PrimaryInput
                label={
                  <div className="flex items-center gap-1">
                    <FaDollarSign className="text-xs" />
                    <span>Price (dh)</span>
                  </div>
                }
                type="number"
                placeholder="0"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                error={errors.price}
                min="0"
                step="0.01"
              />

              <PrimaryInput
                label={
                  <div className="flex items-center gap-1">
                    <IoCalendarClearOutline className="text-xs" />
                    <span>Start Date</span>
                  </div>
                }
                type="date"
                value={formData.startDate}
                onChange={(e) => handleChange('startDate', e.target.value)}
                error={errors.startDate}
                min={new Date().toISOString().split('T')[0]}
              />

              <PrimaryInput
                label={
                  <div className="flex items-center gap-1">
                    <IoCalendarClearOutline className="text-xs" />
                    <span>End Date</span>
                  </div>
                }
                type="date"
                value={formData.endDate}
                onChange={(e) => handleChange('endDate', e.target.value)}
                error={errors.endDate}
                min={formData.startDate || new Date().toISOString().split('T')[0]}
              />

              <div className="col-span-2">
                <PrimaryInput
                  label={
                    <div className="flex items-center gap-1">
                      <FaMapMarkerAlt className="text-xs" />
                      <span>Location</span>
                    </div>
                  }
                  placeholder="Enter location"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  error={errors.location}
                />
              </div>
            </div>

            <div className="p-5 pt-2 border-t border-blue-50">
              <Button
                htmlType="submit"
                type="primary"
                className="w-full py-2 text-sm"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Create Offer'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddOfferModal;