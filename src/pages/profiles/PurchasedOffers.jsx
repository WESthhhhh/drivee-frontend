import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Offers from '../../components/layouts/profilesLayouts/purchasedOffers';
const info = () => {
  const navigate = useNavigate();


  return (
    <div className="bg-light">
      <Offers />    
      
    </div>
  );
};

export default info;