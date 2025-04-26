import { FaRegClock, FaDollarSign, FaMapMarkerAlt } from 'react-icons/fa';
import { IoCalendarClearOutline } from "react-icons/io5";
import { IoMdClose } from 'react-icons/io';
import React from 'react';
import { useState, useEffect } from 'react';
import Button from '../UI/button';
import { PrimaryInput, TextArea } from '../UI/formInputs';

const EditOfferModal = ({ 
  isOpen, 
  closeModal, 
  offer, 
  onOfferUpdated = () => {} 
}) => {
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
  const [errors, setErrors] = useState({});
  const [cities, setCities] = useState([]);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedCityLabel, setSelectedCityLabel] = useState('');

  // Initialize form with offer data when modal opens or offer changes
  useEffect(() => {
    if (offer) {
      setFormData({
        title: offer.title || '',
        description: offer.description || '',
        durationHours: offer.durationHours || '',
        price: offer.price || '',
        startDate: offer.startDate ? offer.startDate.split('T')[0] : '',
        endDate: offer.endDate ? offer.endDate.split('T')[0] : '',
        city: offer.location?.city || '',
        address: offer.location?.address || ''
      });
      setSelectedCityLabel(offer.location?.city || '');
    }
  }, [offer]);

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  useEffect(() => {
    const fetchCities = async () => {
      setIsLoadingCities(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/locations/cities`, {
          credentials: 'include'
        });
        if (!response.ok) throw new Error('Failed to fetch cities');
        const data = await response.json();
        
        const formattedCities = Array.isArray(data)
          ? data.map(city => typeof city === 'string' 
              ? { value: city, label: city }
              : city)
          : [];
        
        setCities(formattedCities);
      } catch (error) {
        console.error('Error fetching cities:', error);
        setErrors(prev => ({...prev, city: 'Failed to load cities'}));
      } finally {
        setIsLoadingCities(false);
      }
    };
  
    fetchCities();
  }, []);

  const handleCitySelect = (city) => {
    handleChange('city', city.value);
    setSelectedCityLabel(city.label);
    setOpenDropdown(null);
  };

  if (!isOpen) return null;

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const startDate = formData.startDate ? new Date(formData.startDate).toISOString() : null;
    const endDate = formData.endDate ? new Date(formData.endDate).toISOString() : null;
    
    const updatedOffer = {
      title: formData.title,
      description: formData.description,
      durationHours: formData.durationHours,
      price: formData.price,
      startDate, 
      endDate,
      location: {
        city: formData.city,
        address: formData.address
      }
    };
    
    onOfferUpdated(updatedOffer);
    closeModal();
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
            <h1 className="text-b200 font-bold text-xl text-center mt-4">Edit Offer</h1>
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

              <div className="col-span-1 relative">
                <label className="flex items-center gap-1 text-primary font-semibold text-xs mb-3">
                  <FaMapMarkerAlt className="text-bprimary text-xs" />
                  <span>Area</span>
                </label>
                
                <div
                  className={`w-full p-2 border text-[14px] flex items-center justify-between cursor-pointer rounded-small-md focus:outline-none focus:ring-thin focus:ring-border-b50 focus:border-b75 ${
                    errors.city ? 'border-red-500' : 'border-b50'
                  }`}
                  onClick={() => toggleDropdown('city')}
                >
                  <span>{selectedCityLabel || 'Select a city'}</span>
                  <svg
                    className={`w-4 h-4 transition-transform text-accent ${
                      openDropdown === 'city' ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {openDropdown === 'city' && (
                  <div className="dropdown absolute top-full left-0 mt-1 bg-light shadow-primary-4 rounded-small-md p-2 w-full z-50 border border-stroke max-h-60 overflow-y-auto">
                    {isLoadingCities ? (
                      <div className="py-2 px-4 text-b200">Loading cities...</div>
                    ) : (
                      cities.map((city) => (
                        <div
                          key={city.value}
                          className="py-2 px-4 hover:bg-cayan50 cursor-pointer text-b200 rounded-md"
                          onClick={() => handleCitySelect(city)}
                        >
                          {city.label}
                        </div>
                      ))
                    )}
                  </div>
                )}

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
          >
            Update Offer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditOfferModal;