import ReviewSwiper from '../cards/review';
import Cover from '../cards/cover';

import { useNavigate, Link } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();

  return (
    <div className=" w-full mx-auto flex justify-between items-center relative px-4 lg:px-0 mb-[50px]">
     <Cover/>
     <div className='flex gap-12'>
        <div>
            <h2>School Details</h2>

            {/* location */}
            <div className='flex items-ceter'>
               <img src="/icons/location.svg" alt="" /> 
               <div>
                <h4>Location:</h4>
                <p>123 Avenue Hassan II, Casablanca, Morocco</p>
               </div>
            </div>

            {/* working hours */}
            <div className='flex items-ceter'>
               <img src="/icons/time.svg" alt="" /> 
               <div>
                <h4>Working hours :</h4>
                <p>
                    Mon-Fri: 8AM - 6PM <br />
                    Sat: 9AM - 3PM
                </p>
               </div>
            </div>

            {/* phone */}
            <div className='flex items-ceter'>
               <img src="/icons/phone.svg" alt="" /> 
               <div>
                <h4>Phone :</h4>
                <p>+212 645789765</p>
               </div>
            </div>
        </div>
        <div>

        </div>
     </div>
    </div>
  );
};

export default Profile;