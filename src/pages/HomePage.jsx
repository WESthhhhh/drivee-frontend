import React from 'react';
import Button from '../components/UI/button';
import Union from '../components/layouts/union';
import { useNavigate, Link } from 'react-router-dom';
import Work from '../components/layouts/work';
import Features from '../components/layouts/features';
import Reviews from '../components/layouts/reviews';
import Journey from '../components/layouts/startJourney';
import HeroSection from '../components/layouts/hero';

const HomePage = () => {
  const navigate = useNavigate();


  return (
    <div className="bg-light">
      <HeroSection />
      <Union/>
      <Work/>
      <Features/>
      <Reviews/>
      <Journey/>    
      
    </div>
  );
};

export default HomePage;