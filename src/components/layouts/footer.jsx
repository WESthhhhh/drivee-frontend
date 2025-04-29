import { Link } from 'react-router-dom';
import logo from '/logo/Logolight.svg';
import logosm from '/logo/Logolightsm.svg';
export default function Footer() {
    return (
      <footer className="text-light  text-center items-center p-[70px]  bg-[url('../images/footer.png')] bg-cover bg-center ">
       <div className='max-w-8xl mx-auto space-y-[50px]'>
        <Link to={'/'} className="flex items-center justify-center">
          <img src={logo} className="hidden md:block" alt="Drive logo" />
          <img src={logosm} className="block md:hidden w-[100px]" alt="Mobile logo" />
        </Link>
        <nav className="flex flex-col md:flex-row justify-center text-center items-center gap-12">
          <Link to={'/offers'} className="text-light text-[14px] no-underline md:text-[16px]">Offers</Link>
          <Link to={'/drivingschool'} className="text-light text-[14px] no-underline md:text-[16px]">Driving School</Link>
          <Link to={'/howitworks'} className="text-light text-[14px] no-underline md:text-[16px]">How it works</Link>
          <Link to={'/contact'} className="text-light text-[14px] no-underline md:text-[16px]">Contact</Link>
        </nav>
        <p>© {new Date().getFullYear()} Drivee. All rights reserved.</p>
        </div> 
      </footer>
);
}