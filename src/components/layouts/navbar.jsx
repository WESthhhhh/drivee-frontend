import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import { IoChevronDown } from 'react-icons/io5';
import { HiMenuAlt1 } from "react-icons/hi";
import Button from '../UI/button';
import LogoutButton from '../UI/logoutButton';
import logo from '/logo/Logo.svg';
import logo2 from '/logo/Logosm.svg';
import logo3 from '/logo/Logolightsm.svg';
import profile from '../../assets/avatar.png';
import api from '../../utils/axios';

const Navbar = () => {
  const navigate = useNavigate();
  const [opendrop, setOpendrop] = useState(false);
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [userData, setUserData] = useState(null);

  const navRef = useRef(null);
  const dropRef = useRef(null);

 
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Check authentication status
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const { data } = await api.get('/users/me', { 
          withCredentials: true
        });
        setIsLoggedIn(true);
        setUserData(data.user); 
      } catch (error) {
        setIsLoggedIn(false);
        setUserData(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();

    const intervalId = setInterval(checkAuthStatus, 300000);
    return () => clearInterval(intervalId);
  }, []);

  
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [open]);

  
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

  const toggleDropdown = (e) => {
    e.stopPropagation(); 
    setOpendrop(prev => !prev);
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleSuccessfulLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    setOpendrop(false);
    setOpen(false);
    navigate('/'); 
  };

  if (isLoading) {
    return <div className="h-[80px]"></div>;
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
        className={`w-full max-w-7xl fixed left-1/2 transform -translate-x-1/2 bg-light px-5 py-3 shadow-primary-4 rounded-b-large-md z-[9999999] flex justify-between items-center transition-all duration-300 ${
          scrolled ? 'top-0' : 'top-[20px]'
        }`}
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
          <NavLink 
            to={'/offers'} 
            className={({ isActive }) => 
              `text-[1.05rem] no-underline transition-colors duration-300 ${
                isActive 
                  ? 'text-primary font-semibold' 
                  : 'text-text hover:text-primary'
              }`
            }
          >
            Offers
          </NavLink>
          <NavLink 
            to={'/drivingschools'} 
            className={({ isActive }) => 
              `text-[1.05rem] no-underline transition-colors duration-300 ${
                isActive 
                  ? 'text-primary font-semibold' 
                  : 'text-text hover:text-primary'
              }`
            }
          >
            Driving School
          </NavLink>
          <NavLink 
            to={'/howitworks'} 
            className={({ isActive }) => 
              `text-[1.05rem] no-underline transition-colors duration-300 ${
                isActive 
                  ? 'text-primary font-semibold' 
                  : 'text-text hover:text-primary'
              }`
            }
          >
            How it works
          </NavLink>
          <NavLink 
            to={'/contact'} 
            className={({ isActive }) => 
              `text-[1.05rem] no-underline transition-colors duration-300 ${
                isActive 
                  ? 'text-primary font-semibold' 
                  : 'text-text hover:text-primary'
              }`
            }
          >
            Contact
          </NavLink>
        </nav>
       
        
        
        {isLoggedIn ? (
          <div 
            className="flex items-center gap-2 relative cursor-pointer" 
            onClick={toggleDropdown} 
            ref={dropRef}
          >
            <img 
              src={userData?.profilePicture || profile} 
              alt="Profile" 
              className="w-[35px] h-[35px] object-cover rounded-full" 
            />
            <IoChevronDown className={`text-accent transition-transform duration-300 ${opendrop ? 'rotate-180' : ''}`} />
            
            
            {opendrop && (
              <div className="absolute top-[110%] right-0 bg-light shadow-primary-4 w-[200px] border border-stroke rounded-small-md py-2 px-5">
                <div className="flex items-center gap-3 mb-3 pb-3 border-b border-stroke">
                  <img 
                    src={userData?.profilePicture || profile} 
                    alt="Profile" 
                    className="w-10 h-10 rounded-full object-cover" 
                  />
                  <div>
                    <p className="text-sm font-semibold text-primary">{userData?.name || 'User'}</p>
                    <p className="text-xs text-gray-500">{userData?.email || ''}</p>
                  </div>
                </div>
                <Link 
                  to={'/profile'} 
                  className="block text-primary no-underline text-[1rem] py-2 hover:bg-gray-50 rounded-small-md px-2"
                >
                  My Profile
                </Link>
                <LogoutButton 
                  onLogoutSuccess={handleSuccessfulLogout}
                  className="w-full mt-2 text-left text-primary hover:bg-gray-50 rounded-small-md px-2 py-2"
                  iconClassName="text-lg"
                  text="Log Out"
                />
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Button
              type='primary'
              icon='icons/login.svg'
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          </div>
        )}
      </header>

     
      <div className={`transition-all duration-300 ${scrolled ? 'h-[80px]' : 'h-[100px]'}`}></div>
      
      
      <div 
        className={`fixed top-0 left-0 w-[280px] h-full z-[999999999] bg-light shadow-xl transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="h-full flex flex-col">
          <div className="flex justify-between items-center p-4">
            <Link to="/" onClick={() => setOpen(false)}>
              <img src={logo3} className="w-[70px]" alt="Mobile logo" />
            </Link>
            <IoMdClose
              className="text-2xl text-primary cursor-pointer hover:text-primary"
              onClick={() => setOpen(false)}
            />
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <NavLink
              to="/offers"
              className={({ isActive }) => 
                `block py-3 px-4 rounded-small-md transition-colors duration-300 ${
                  isActive 
                    ? 'text-primary font-semibold bg-cayan50' 
                    : 'text-primary hover:bg-cayan50'
                }`
              }
              onClick={() => setOpen(false)}
            >
              Offers
            </NavLink>
            <NavLink
              to="/drivingschools"
              className={({ isActive }) => 
                `block py-3 px-4 rounded-small-md transition-colors duration-300 ${
                  isActive 
                    ? 'text-primary font-semibold bg-cayan50' 
                    : 'text-primary hover:bg-cayan50'
                }`
              }
              onClick={() => setOpen(false)}
            >
              Driving School
            </NavLink>
            <NavLink
              to="/howitworks"
              className={({ isActive }) => 
                `block py-3 px-4 rounded-small-md transition-colors duration-300 ${
                  isActive 
                    ? 'text-primary font-semibold bg-cayan50' 
                    : 'text-primary hover:bg-cayan50'
                }`
              }
              onClick={() => setOpen(false)}
            >
              How it works
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) => 
                `block py-3 px-4 rounded-small-md transition-colors duration-300 ${
                  isActive 
                    ? 'text-primary font-semibold bg-cayan50' 
                    : 'text-primary hover:bg-cayan50'
                }`
              }
              onClick={() => setOpen(false)}
            >
              Contact
            </NavLink>
          </div>

          <div className="p-4">
            {isLoggedIn ? (
              <>
                <div className="flex items-center gap-3 mb-4 p-3 bg-cayan50 rounded-small-md">
                  <img 
                    src={userData?.profilePicture || profile} 
                    alt="Profile" 
                    className="w-10 h-10 rounded-full object-cover" 
                  />
                  <div>
                    <p className="text-sm font-semibold text-primary">{userData?.name || 'User'}</p>
                    <p className="text-xs text-gray-500">{userData?.email || ''}</p>
                  </div>
                </div>
                <Link
                  to="/profile"
                  className="block w-full text-center py-3 px-4 rounded-lg bg-gray-100 text-primary hover:bg-gray-200 transition-colors mb-2"
                  onClick={() => setOpen(false)}
                >
                  My Profile
                </Link>
                <LogoutButton 
                  onLogoutSuccess={handleSuccessfulLogout}
                  variant="danger"
                  className="w-full p-3"
                />
              </>
            ) : (
              <>
                <Button
                  type='primary'
                  className="w-full mb-2"
                  onClick={() => {
                    navigate('/login');
                    setOpen(false);
                  }}
                >
                  Login
                </Button>
                {/* <Button
                  type='secondary'
                  className="w-full"
                  onClick={() => {
                    navigate('/register');
                    setOpen(false);
                  }}
                >
                  Sign Up
                </Button> */}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;