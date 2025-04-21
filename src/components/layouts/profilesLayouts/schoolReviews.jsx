import SchoolSidebar from "../../schoolProfile/SideBar"
import Reviews from "../../schoolProfile/Reviews"
import Picprofile from "../../UI/picprofile";
import api from "../../../utils/axios";
import LoadingSpinner from '../../UI/LoadingSpinner';
import { useState, useEffect } from 'react';

export default function Home() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await api.get('/users/me', { 
          withCredentials: true 
        });
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
      return (
        <div className="-space-y-4">
          <div className="relative w-full h-[140px] top-3">
            <img src="/images/cover.svg" alt="" className="rounded-small-md" />
          </div>
          <div className="flex justify-center items-center h-[100px]">
            {/* <LoadingSpinner />  */}
          </div>
        </div>
      );
    }
  return (
    <div className="flex">
      <SchoolSidebar userData={userData}/>
      <div className="border border-stroke rounded-large-md flex-1  p-10 space-y-5 mb-12">
        <Picprofile/>
        <Reviews />
      </div>
    </div>
  );
}
