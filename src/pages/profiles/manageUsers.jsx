import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ManageUsers from '../../components/layouts/profilesLayouts/manageUsers';

const Users = () => {
  const navigate = useNavigate();


  return (
    <div className="bg-light">
      <ManageUsers />    
      
    </div>
  );
};

export default Users;