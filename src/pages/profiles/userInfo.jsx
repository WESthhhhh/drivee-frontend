import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ManageOffers from '../../components/layouts/profilesLayouts/manageOffers';
import UserInfo from '../../components/layouts/profilesLayouts/userInfo';
const info = () => {
  const navigate = useNavigate();


  return (
    <div className="bg-light">
      <UserInfo />    
      
    </div>
  );
};

export default info;