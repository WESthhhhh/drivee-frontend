import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import { IoChevronDown } from 'react-icons/io5';
import { BiMenu } from 'react-icons/bi';
import { TbLogout } from 'react-icons/tb';

import logo from '/logo/Logo.svg';
import logo2 from '/logo/Logosm.svg';
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

  useEffect(() => {
    window.onscroll = () => {
      setOpen(false)
    }
  })

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
      <header 
        ref={navRef}
        className="w-full max-w-[1200px] fixed top-[50px] left-1/2 transform -translate-x-1/2 bg-white p-5 shadow-lg rounded-[20px] z-[9999999] flex justify-between items-center"
      >
        <BiMenu 
          className="hidden md:block text-4xl text-black cursor-pointer" 
          onClick={toggleMenu} 
        />
        
        <Link to={'/'} className="flex items-center">
          <img src={logo} className="hidden md:block" alt="Drive logo" />
          <img src={logo2} className="block md:hidden w-[100px]" alt="Mobile logo" />
        </Link>
        
        <nav className="hidden md:flex items-center gap-12">
          <Link to={'/offers'} className="text-gray-800 text-[1.05rem] no-underline">Offers</Link>
          <Link to={'/drivingschool'} className="text-gray-800 text-[1.05rem] no-underline">Driving School</Link>
          <Link to={'/howitworks'} className="text-gray-800 text-[1.05rem] no-underline">How it works</Link>
          <Link to={'/contact'} className="text-gray-800 text-[1.05rem] no-underline">Contact</Link>
        </nav>
        
        <button className="hidden md:flex items-center gap-2 bg-[#0b247a] text-white cursor-pointer px-4 py-2.5 rounded-[10px] text-base">
          Logout <TbLogout className="text-[1.1rem] block" />
        </button>
        
        <div 
          className="hidden md:flex items-center gap-2 relative cursor-pointer" 
          onClick={toggleDropdown} 
          ref={dropRef}
        >
          <img src={profile} alt="Profile" className="w-[50px] h-[50px] object-cover" />
          <IoChevronDown className="text-[#a5f1f8]" />
          
          {opendrop && (
            <div className="absolute top-[110%] right-0 bg-white shadow-lg w-[200px] py-2.5 px-5">
              <Link to={'/profile'} className="block text-black no-underline text-[1.2rem] my-4 pb-2 border-b border-gray-400">Profile</Link>
              <button className="flex items-center w-full">
                Logout <TbLogout className="text-[1.1rem] block ml-2" />
              </button>
            </div>
          )}
        </div>
      </header>
      
      {/* Mobile Menu */}
      <div 
        className={`fixed top-0 left-0 w-[300px] h-full z-[9999999999999999] bg-white border-r-2 border-[#a5f1f8] p-[100px_20px] transition-transform duration-300 ease-in-out -translate-x-full md:hidden ${open ? 'translate-x-0' : ''}`}
      >
        <Link to={'/offers'} className="block mt-6 text-black no-underline pb-4 border-b-2 border-[#a5f1f8]">Offers</Link>
        <Link to={'/drivingschool'} className="block mt-6 text-black no-underline pb-4 border-b-2 border-[#a5f1f8]">Driving School</Link>
        <Link to={'/howitworks'} className="block mt-6 text-black no-underline pb-4 border-b-2 border-[#a5f1f8]">How it works</Link>
        <Link to={'/contact'} className="block mt-6 text-black no-underline pb-4 border-b-2 border-[#a5f1f8]">Contact</Link>
        
        <IoMdClose 
          className="absolute top-[50px] right-5 text-[1.8rem] text-[#0b247a] cursor-pointer" 
          onClick={() => setOpen(false)} 
        />
      </div>
    </>
  );
};

export default Navbar;