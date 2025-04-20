import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ManageOffers from '../../components/layouts/profilesLayouts/manageOffers';
import ReservationSchool from '../../components/layouts/profilesLayouts/reservationsSchool';

const resevations = () => {
  const navigate = useNavigate();


  return (
    <div className="bg-light">
      <ReservationSchool />   
    </div>
  );
};

export default resevations;