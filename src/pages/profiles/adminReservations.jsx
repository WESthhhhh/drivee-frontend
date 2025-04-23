import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ManageOffers from '../../components/layouts/profilesLayouts/manageOffers';
import ReservationAdmin from '../../components/layouts/profilesLayouts/adminReservations';

const resevations = () => {
  const navigate = useNavigate();


  return (
    <div className="bg-light">
      <ReservationAdmin />   
    </div>
  );
};

export default resevations;