import UserSidebar from "../../userProfile/SideBar"
import Cover from "../../cards/cover";
import ReviewsUser from "../../userProfile/Reviews";
import api from "../../../utils/axios";
import LoadingSpinner from '../../UI/loadingSpinner';
import { useState, useEffect } from 'react';

export default function Home() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await api.get('/users/me', {
          withCredentials: true
        });
        setUserData(data);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
  
    if (load) {  
      fetchUserData();
    } 
  }, []);

  if (loading) {
      return (
        <div className="-space-y-4">
          <div className="flex justify-center items-center h-[100px]">
            <LoadingSpinner /> 
          </div>
        </div>
      );
    }
  return (
    <div className="flex">
      <UserSidebar userData={userData}/>
      <div className="border border-stroke rounded-large-md flex-1 mt-7.5 px-5 pt-4 pb-52 space-y-5 mb-12">
        <Cover />
        <ReviewsUser />
      </div>
    </div>
  );
}