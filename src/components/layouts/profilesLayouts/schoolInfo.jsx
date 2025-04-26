import { useState, useEffect } from 'react';
import SchoolSidebar from "../../schoolProfile/SideBar";
import Picprofile from "../../UI/picprofile";
import Cover from "../../cards/cover";
import InfoUpdate from "../../userProfile/InfoUpdate";
import api from "../../../utils/axios";
import LoadingSpinner from '../../UI/loadingSpinner';
import VerifiedCard from '../../cards/verified';
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

  const showVerifiedCard = userData?.role === 'school' && !userData?.verified;
  return (
    <div className="flex">
      <SchoolSidebar userData={userData} />
      <div className="border border-stroke rounded-large-md flex-1 mt-7.5 px-5 py-4 space-y-5 pb-32">
        <Cover />
        {showVerifiedCard && <VerifiedCard/>}
        <InfoUpdate />
      </div>
    </div>
  );
}