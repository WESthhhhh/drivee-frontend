import ReviewSwiper from '../../cards/review';
import PicProfile from '../../UI/picprofile';
import OfferCard from '../../cards/profileOffers';
import ProfileReviews from "../../cards/profileReviews";
import { useNavigate, Link } from 'react-router-dom';
import { PiCarProfile } from 'react-icons/pi';

const Profile = () => {
    const navigate = useNavigate();

  return (
    <div className=" max-w-7xl w-[90%] mx-auto mt-10 mb-20">
     <img 
        src="/images/home-ellipse.png" 
        className="absolute top-0 right-0 w-auto h-auto -z-10" 
        alt="background circle" 
      />
      <img 
        src="/images/home-ellipse.png" 
        className="absolute top-1/5 left-0 transform rotate-180 w-auto h-auto -z-10" 
        alt="background circle" 
      />
      <img 
        src="/images/home-elli-t.png" 
        className="absolute left-[13%] top-1/5 w-auto h-auto -z-10" 
        alt="small decorative element" 
      />
      <img 
        src="/images/home-elli-b.png" 
        className="absolute right-[2%] top-1/2 w-auto h-auto -z-10" 
        alt="small decorative element" 
      /> 
     <div className='flex gap-10'>
      {/* Side Section */}
        <div className=''>
        <PicProfile/>
            <h2 className='text-b200 text-[25px] font-bold mt-12'>School Details</h2>

            {/* location */}
            <div className='space-y-6'>

               <div className='flex items-ceter gap-3 mt-5'>
                  <img src="/icons/Location.svg" alt="" /> 
                  <div>
                     <h4 className='font-bold text-primary mb-1'>Location:</h4>
                     <p className='text-inputtext'>123 Avenue Hassan II, <br /> Casablanca,  Morocco</p>
                  </div>
               </div>

               {/* working hours */}
               <div className='flex items-ceter gap-3'>
                  <img src="/icons/time.svg" alt="" /> 
                  <div>
                     <h4 className='font-bold text-primary mb-1'>Working hours :</h4>
                     <p className='text-inputtext'>
                        Mon-Fri: 8AM - 6PM <br />
                        Sat: 9AM - 3PM
                     </p>
                  </div>
               </div>

               {/* phone */}
               <div className='flex items-ceter gap-3'>
                  <img src="/icons/phone.svg" alt="" /> 
                  <div>
                  <h4 className='font-bold text-primary mb-1'>Phone :</h4>
                  <p className='text-inputtext'>+212 645789765</p>
                  </div>
               </div>

            </div>

        </div>

        <div className='border-r  border-stroke'>

        </div>
        <div>
            {/* Offers */}
            <div>
                  <h2 className='text-b200 text-[25px] font-bold  mb-[24px]'>Available Offers</h2>
                  <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                     <OfferCard/>
                     <OfferCard/>
                  </div>
            </div>

            {/* reviews */}
            <div className='mt-10'>
            <h2 className='text-b200 text-[25px] font-bold  mb-[24px]'>Reviews</h2>
                  <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                     <div className='w-[400px]'>
                        <ProfileReviews/>
                     </div>
                     <div className='w-[400px]'>
                        <ProfileReviews/>
                     </div>
                     
                  </div>
            </div>

        </div>
     </div>
    </div>
  );
};

export default Profile;