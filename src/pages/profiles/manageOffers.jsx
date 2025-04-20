import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ManageOffers from '../../components/layouts/profilesLayouts/manageOffers';

const offers = () => {
  const navigate = useNavigate();


  return (
    <div className="bg-light">
      <ManageOffers />    
      
    </div>
  );
};

export default offers;