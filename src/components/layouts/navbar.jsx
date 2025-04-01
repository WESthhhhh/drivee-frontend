import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import { IoChevronDown } from 'react-icons/io5';
import { BiMenu } from 'react-icons/bi';
import { TbLogout } from 'react-icons/tb';
import Button from '../UI/button';

import logo from '/logo/Logo.svg';
import logo2 from '/logo/Logosm.svg';
import logo3 from '/logo/Logolightsm.svg';
import profile from '../../assets/avatar.png';

const Navbar = () => {
  const [opendrop, setOpendrop] = useState(false);
  const [open, setOpen] = useState(false);

  const navRef = useRef(null);
  const dropRef = useRef(null);

  const toggleDropdown = (e) => {
    e.stopPropagation(); 
    setOpendrop((prev) => !prev);
  };

  // Prevent scrolling when menu is open
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

  return (
    <>
      {/* Backdrop overlay - shows when menu is open */}
      {open && (
        <div 
          className="fixed inset-0 bg-b500 bg-opacity-30 z-[999999998] md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Blur effect for main content */}
      <div className={`fixed inset-0 backdrop-blur-sm z-[999999997] pointer-events-none transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}></div>

      <header 
        ref={navRef}
        className="w-full max-w-[1200px] fixed top-[50px] left-1/2 transform -translate-x-1/2 bg-light px-5 py-3 shadow-primary-4 rounded-large-md z-[9999999] flex justify-between items-center"
      >
        <BiMenu 
          className="block md:hidden text-4xl text-text cursor-pointer" 
          onClick={toggleMenu} 
        />
        
        <Link to={'/'} className="flex items-center">
          <img src={logo} className="hidden md:block md:w-[100px] md:h-[36px]" alt="Drive logo" />
          <img src={logo2} className="block md:hidden w-[80px]" alt="Mobile logo" />
        </Link>
        
        <nav className="hidden md:flex items-center gap-12">
          <Link to={'/offers'} className="text-gray-800 text-[1.05rem] no-underline">Offers</Link>
          <Link to={'/drivingschool'} className="text-gray-800 text-[1.05rem] no-underline">Driving School</Link>
          <Link to={'/howitworks'} className="text-gray-800 text-[1.05rem] no-underline">How it works</Link>
          <Link to={'/contact'} className="text-gray-800 text-[1.05rem] no-underline">Contact</Link>
        </nav>
        
        <Button
          type='primary'
          icon='icons/login.svg'
        >
          Login
        </Button>

        {/* Dropdoowwwnnnn */}
        {/* <div 
          className="flex items-center gap-2 relative cursor-pointer" 
          onClick={toggleDropdown} 
          ref={dropRef}
        >
          <img src={profile} alt="Profile" className="w-[50px] h-[50px] object-cover" />
          <IoChevronDown className="text-accent" />
          
          {opendrop && (
            <div className="absolute top-[110%] right-0 bg-light shadow-primary-4 w-[200px] rounded-small-md py-2.5 px-5">
              <Link to={'/profile'} className="block text-text no-underline text-[1.2rem] my-4 pb-2 border-b border-b50">Profile</Link>
              <Button type='primary' icon='icons/login.svg'>
                Login
              </Button>
            </div>
          )}
        </div> */}
      </header>
      
      {/* Mobile Menu */}
      <div 
        className={`space-y-8 fixed top-0 left-0 w-[300px] h-full z-[999999999] bg-primary rounded-r-large-md p-[100px_20px] transition-transform duration-300 ease-in-out -translate-x-full md:hidden ${open ? 'translate-x-0' : ''}`}
      >
        <Link to={'/'} className="block">
          <img src={logo3} className="w-[80px]" alt="Mobile logo" />
        </Link>
        <Link to={'/offers'} className="block text-light no-underline text-lg">Offers</Link>
        <Link to={'/drivingschool'} className="block text-light no-underline text-lg">Driving School</Link>
        <Link to={'/howitworks'} className="block text-light no-underline text-lg">How it works</Link>
        <Link to={'/contact'} className="block text-light no-underline text-lg">Contact</Link>
        
        <IoMdClose 
          className="absolute top-[10px] right-5 text-[1.8rem] text-light cursor-pointer" 
          onClick={() => setOpen(false)} 
        />
      </div>
    </>
  );
};

export default Navbar;