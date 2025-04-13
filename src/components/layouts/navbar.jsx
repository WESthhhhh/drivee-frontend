import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import { IoChevronDown } from 'react-icons/io5';
import { HiMenuAlt1 } from "react-icons/hi";
import { TbLogout } from 'react-icons/tb';
import Button from '../UI/button';
import axios from 'axios';

import logo from '/logo/Logo.svg';
import logo2 from '/logo/Logosm.svg';
import logo3 from '/logo/Logolightsm.svg';
import profile from '../../assets/avatar.png';

const Navbar = () => {
  const navigate = useNavigate();
  const [opendrop, setOpendrop] = useState(false);
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navRef = useRef(null);
  const dropRef = useRef(null);

  const toggleDropdown = (e) => {
    e.stopPropagation(); 
    setOpendrop((prev) => !prev);
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        await axios.get('http://localhost:5000/users/me', { 
          withCredentials: true // This sends cookies automatically
        });
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [open]);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  useEffect(() => {
    const closeMenus = (e) => {
      if (
        navRef.current && !navRef.current.contains(e.target) && 
        dropRef.current && !dropRef.current.contains(e.target)
      ) {
        setOpendrop(false);
        setOpen(false);
      }
    };

    document.addEventListener('click', closeMenus);
    return () => document.removeEventListener('click', closeMenus);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/users/logout', {}, {
        withCredentials: true
      });
      setIsLoggedIn(false);
      setOpendrop(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (isLoading) {
    return <div className="h-[80px]"></div>; // Loading state
  }

  return (
    <>
      {open && (
        <div 
          className="fixed inset-0 bg-b500 bg-opacity-30 z-[999999998] md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div className={`fixed inset-0 backdrop-blur-sm z-[999999997] pointer-events-none transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}></div>

      <header 
        ref={navRef}
        className="w-full max-w-7xl fixed top-[50px] left-1/2 transform -translate-x-1/2 bg-light px-5 py-3 shadow-primary-4 rounded-large-md z-[9999999] flex justify-between items-center"
      >
        <HiMenuAlt1
          className="block md:hidden text-3xl text-primary cursor-pointer" 
          onClick={toggleMenu} 
        />
        
        <Link to={'/'} className="flex items-center">
          <img src={logo} className="hidden md:block md:w-[100px] md:h-[36px]" alt="Drive logo" />
          <img src={logo2} className="block md:hidden w-[80px]" alt="Mobile logo" />
        </Link>
        
        <nav className="hidden md:flex items-center gap-12">
          <Link to={'/offers'} className="text-gray-800 text-[1.05rem] no-underline">Offers</Link>
          <Link to={'/drivingschools'} className="text-gray-800 text-[1.05rem] no-underline">Driving School</Link>
          <Link to={'/howitworks'} className="text-gray-800 text-[1.05rem] no-underline">How it works</Link>
          <Link to={'/contact'} className="text-gray-800 text-[1.05rem] no-underline">Contact</Link>
        </nav>
        
        {isLoggedIn ? (
          <div 
            className="flex items-center gap-2 relative cursor-pointer" 
            onClick={toggleDropdown} 
            ref={dropRef}
          >
            <img src={profile} alt="Profile" className="w-[35px] h-[35px] object-cover rounded-full" />
            <IoChevronDown className={`text-accent transition-transform duration-300 ${opendrop ? 'rotate-180' : ''}`} />
            
            {opendrop && (
              <div className="absolute top-[110%] right-0 bg-light shadow-primary-4 w-[150px] border border-stroke rounded-small-md py-2 px-5">
                <Link to={'/profile'} className="block text-primary no-underline text-[1.2rem] my-4 pb-2 border-b border-stroke">Profile</Link>
                <div className="flex items-center gap-2 text-primary cursor-pointer" onClick={handleLogout}>
                  <TbLogout className="text-xl" />
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Button
            type='primary'
            icon='icons/login.svg'
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
        )}
      </header>
      
      {/* Mobile Menu */}
      <div 
  className={`fixed top-0 left-0 w-[280px] h-full z-[999999999] bg-light shadow-xl transition-transform duration-300 ease-in-out -translate-x-full md:hidden ${
    open ? "translate-x-0" : ""
  }`}
>
  <div className="h-full flex flex-col ">
    {/* Header with close button */}
    <div className="flex justify-between items-center p-4 ">
      <Link to="/" onClick={() => setOpen(false)}>
        <img src={logo3} className="w-[70px]" alt="Mobile logo" />
      </Link>
      <IoMdClose
        className="text-2xl text-primary cursor-pointer hover:text-primary"
        onClick={() => setOpen(false)}
      />
    </div>

    {/* Menu items */}
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <Link
        to="/offers"
        className="block py-3 px-4 rounded-small-md text-primary hover:bg-cayan50 transition-colors"
        onClick={() => setOpen(false)}
      >
        Offers
      </Link>
      <Link
        to="/drivingschools"
        className="block py-3 px-4 rounded-small-md text-primary hover:bg-cayan50 transition-colors"
        onClick={() => setOpen(false)}
      >
        Driving School
      </Link>
      <Link
        to="/howitworks"
        className="block py-3 px-4 rounded-small-md text-primary hover:bg-cayan50 transition-colors"
        onClick={() => setOpen(false)}
      >
        How it works
      </Link>
      <Link
        to="/contact"
        className="block py-3 px-4 rounded-small-md text-primary hover:bg-cayan50 transition-colors"
        onClick={() => setOpen(false)}
      >
        Contact
      </Link>
    </div>

    {/* Auth section */}
    <div className="p-4">
      {isLoggedIn ? (
        <>
          <div className="flex items-center gap-3 mb-4 p-3 bg-cayan50 rounded-small-md">
            <img 
              src={profile} 
              alt="Profile" 
              className="w-8 h-8 rounded-full object-cover" 
            />
            <div>

              <p className="text-sm text-primary font-medium">View Profile</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center  gap-2 p-3 rounded-small-md text-error bg-red-50 transition-colors"
          >
            <TbLogout className="text-xl" />
            <span>Logout</span>
          </button>
        </>
      ) : (
        <Link
          to="/login"
          className="block w-full text-center py-3 px-4 rounded-lg bg-primary text-light hover:bg-primary-dark transition-colors"
          onClick={() => setOpen(false)}
        >
          Login
        </Link>
      )}
    </div>
  </div>
</div>
    </>
  );
};

export default Navbar;