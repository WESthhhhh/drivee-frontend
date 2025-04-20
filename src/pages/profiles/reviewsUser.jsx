import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserReviews from '../../components/layouts/profilesLayouts/reviewsUser';

const offers = () => {
  const navigate = useNavigate();


  return (
    <div className="bg-light">
      <UserReviews />    
      
    </div>
  );
};

export default offers;