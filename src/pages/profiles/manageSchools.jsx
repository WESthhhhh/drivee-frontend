import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ManageSchools from '../../components/layouts/profilesLayouts/manageSchools';

const Schools = () => {
  const navigate = useNavigate();


  return (
    <div className="bg-light">
      <ManageSchools />    
      
    </div>
  );
};

export default Schools;