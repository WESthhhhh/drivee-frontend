import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SchoolReviews from '../../components/layouts/profilesLayouts/schoolReviews';

const offers = () => {
  const navigate = useNavigate();


  return (
    <div className="bg-light">
      <SchoolReviews />    
      
    </div>
  );
};

export default offers;