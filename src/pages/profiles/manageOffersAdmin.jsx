import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ManageOffers from '../../components/layouts/profilesLayouts/manageOffersAdmin';

const Offers = () => {
  const navigate = useNavigate();


  return (
    <div className="bg-light">
      <ManageOffers />    
      
    </div>
  );
};

export default Offers;