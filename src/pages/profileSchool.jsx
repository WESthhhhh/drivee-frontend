import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SchoolProfile from '../components/layouts/profilesLayouts/schoolProfile';

const Profile = () => {
  const navigate = useNavigate();


  return (
    <div className="bg-light">
      <SchoolProfile />
      
    </div>
  );
};

export default Profile;