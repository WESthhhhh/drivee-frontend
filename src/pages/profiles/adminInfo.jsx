import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AdminInfo from '../../components/layouts/profilesLayouts/adminInfo';
const info = () => {
  const navigate = useNavigate();


  return (
    <div className="bg-light">
      <AdminInfo />    
      
    </div>
  );
};

export default info;