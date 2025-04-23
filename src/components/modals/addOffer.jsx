import { FaRegClock, FaDollarSign, FaMapMarkerAlt } from 'react-icons/fa';
import { IoCalendarClearOutline } from "react-icons/io5";
import { IoMdClose } from 'react-icons/io';
import React from 'react';
import { useState, useEffect } from 'react';
import Button from '../UI/button';
import { PrimaryInput, TextArea } from '../UI/formInputs';
import api from '../../utils/axios'; 
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const AddOfferModal = ({ isOpen, closeModal, onOfferCreated }) => {
  
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    durationHours: '',
    price: '',
    startDate: '',
    endDate: '',
    city: '',
    address: ''
  });
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    durationHours: '',
    price: '',
    startDate: '',
    endDate: '',
    city: '',
    address: ''
  });
  const [cities, setCities] = useState([]);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  
// In AddOfferModal
useEffect(() => {
  const fetchCities = async () => {
    if (!isOpen || cities.length > 0) return; // Skip if already fetched
    
    setIsLoadingCities(true);
    try {
      const response = await api.get('/locations/cities', {
        headers: {
          'Cache-Control': 'max-age=3600' // Cache for 1 hour
        }
      });
      
      const cityNames = response.data.map(item => 
        typeof item === 'string' ? item : item.value || item.label || item.name
      ).filter(Boolean);
      
      setCities([...new Set(cityNames)]);
    } catch (error) {
      if (error.response?.status !== 429) {
        console.error('Failed to fetch cities:', error);
      }
      // Consider implementing exponential backoff here
    } finally {
      setIsLoadingCities(false);
    }
  };

  const timer = setTimeout(fetchCities, 300); // Small delay
  return () => clearTimeout(timer);
}, [isOpen]);

  
  if (!isOpen) return null;

  
  if (isLoading || isLoadingCities) {
    return (
      <div className="fixed inset-0 bg-b500 bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-[9999999999] p-4">
        <div className="bg-light rounded-large-md p-8">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      title: '',
      description: '',
      durationHours: '',
      price: '',
      startDate: '',
      endDate: '',
      city: '',
      address: ''
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

    if (!formData.durationHours) {
      newErrors.durationHours = "Duration is required";
      isValid = false;
    } else if (isNaN(formData.durationHours)) {
      newErrors.durationHours = "Duration must be a number";
      isValid = false;
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
      isValid = false;
    } else if (isNaN(formData.price)) {
      newErrors.price = "Price must be a number";
      isValid = false;
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
      isValid = false;
    } else if (new Date(formData.startDate) < new Date()) {
      newErrors.startDate = "Start date cannot be in the past";
      isValid = false;
    }

    if (!formData.endDate) {
      newErrors.endDate = "End date is required";
      isValid = false;
    } else if (new Date(formData.endDate) < new Date(formData.startDate)) {
      newErrors.endDate = "End date must be after start date";
      isValid = false;
    }

    if (!formData.city) {
      newErrors.city = "City is required";
      isValid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
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
      // First create or find the location
      const locationResponse = await api.post('/locations/find-or-create', {
        city: formData.city,
        address: formData.address.trim()
      });

     
      const response = await api.post('/offres', {
        title: formData.title.trim(),
        description: formData.description.trim(),
        durationHours: parseInt(formData.durationHours),
        price: parseFloat(formData.price),
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
        locationId: locationResponse.data.id
      });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        durationHours: '',
        price: '',
        startDate: '',
        endDate: '',
        city: '',
        address: ''
      });
      
      onOfferCreated(response.data);
      closeModal();
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/login');
      } else {
        console.error('Error creating offer:', error);
        alert(
          error.response?.data?.error || 
          error.response?.data?.details || 
          "Failed to create offer"
        );
      }
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
      <div className="bg-light rounded-large-md max-w-lg w-full max-h-[90vh] flex flex-col relative overflow-hidden">
        <div className="sticky top-0 bg-light z-10 pt-5 px-5 pb-4 border-b border-stroke">
          <div className="relative flex justify-center items-center">
            <h1 className="text-b200 font-bold text-xl text-center mt-4">Add New Offer</h1>
            <button 
              onClick={closeModal}
              className="absolute right-0 w-8 h-8 flex justify-center items-center bg-b50 hover:bg-blue-100 rounded-small-sm text-b500 font-bold text-xl transition-colors"
            >
              <IoMdClose />
            </button>
          </div>
        </div>
  
        <div className="p-5 flex-1 overflow-y-auto">
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

            <div className="grid grid-cols-2 gap-3 my-2 border-t border-b border-stroke py-4">
              <PrimaryInput
                label={
                  <div className="flex items-center gap-1">
                    <FaRegClock className="text-b500 text-xs" />
                    <span className="text-b500 font-semibold text-xs">Duration (hours)</span>
                  </div>
                }
                type="number"
                placeholder="0"
                value={formData.durationHours}
                onChange={(e) => handleChange('durationHours', e.target.value)}
                error={errors.durationHours}
                min="1"
              />

              <PrimaryInput
                label={
                  <div className="flex items-center gap-1">
                    <FaDollarSign className="text-b500 text-xs" />
                    <span className="text-b500 font-semibold text-xs">Price (dh)</span>
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
                    <IoCalendarClearOutline className="text-b500 text-xs" />
                    <span className="text-b500 font-semibold text-xs">Start Date</span>
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
                    <IoCalendarClearOutline className="text-b500 text-xs" />
                    <span className="text-b500 font-semibold text-xs">End Date</span>
                  </div>
                }
                type="date"
                value={formData.endDate}
                onChange={(e) => handleChange('endDate', e.target.value)}
                error={errors.endDate}
                min={formData.startDate || new Date().toISOString().split('T')[0]}
              />

              <div className="col-span-1">
                    <label className="flex items-center gap-1 text-b500 font-semibold text-xs mb-1">
                      <FaMapMarkerAlt className="text-b500 text-xs" />
                      <span>City</span>
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => handleChange('city', e.target.value)}
                      className={`w-full p-2 border rounded-md ${
                        errors.city ? 'border-red-500' : 'border-gray-300'
                      }`}
                      disabled={isLoadingCities}
                    >
                      <option value="">Select a city</option>
                      {isLoadingCities ? (
                        <option>Loading cities...</option>
                      ) : (
                        cities.map((city, index) => (
                          <option key={`city-${index}-${city}`} value={city}>
                            {city}
                          </option>
                        ))
                      )}
                    </select>
                    {errors.city && (
                      <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                    )}
                  </div>

              <div className="col-span-1">
                <PrimaryInput
                  label={
                    <div className="flex items-center gap-1">
                      <FaMapMarkerAlt className="text-b500 text-xs" />
                      <span className="text-b500 font-semibold text-xs">Address</span>
                    </div>
                  }
                  placeholder="Enter exact address"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  error={errors.address}
                />
              </div>
            </div>
          </form>
        </div>
        
        <div className="p-5 pt-2 border-t border-stroke">
          <Button
            htmlType="submit"
            type="primary"
            onClick={handleSubmit}
            className="w-full py-2 text-sm"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Offer'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddOfferModal;