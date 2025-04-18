import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ManageOffers from '../../components/layouts/profilesLayouts/manageOffers';
import SchoolInfo from '../../components/layouts/profilesLayouts/schoolInfo';
const info = () => {
  const navigate = useNavigate();


  return (
    <div className="bg-light">
      <SchoolInfo />    
      
    </div>
  );
};

export default info;