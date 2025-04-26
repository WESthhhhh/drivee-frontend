import { useState, useEffect } from 'react';
import SchoolSidebar from "../../schoolProfile/SideBar";
import Cover from "../../cards/cover";
import InfoUpdate from "../../userProfile/InfoUpdate";
import api from "../../../utils/axios";
import LoadingSpinner from '../../UI/loadingSpinner';
import VerifiedCard from '../../cards/verified';

export default function Home() {
  const [userData, setUserData] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [verificationLoading, setVerificationLoading] = useState(true);
  const [load, setLoad] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch user data
        const { data: user } = await api.get('/users/me', { withCredentials: true });
        setUserData(user);
  
        // 2. Only check verification if user is a SCHOOL
        if (user.role === 'SCHOOL') {
          try {
            const { data: verification } = await api.get('/verifications/status', { 
              withCredentials: true 
            });
            setVerificationStatus(verification);
          } catch (error) {
            if (error.response?.status === 404) {
              setVerificationStatus(null); // No verification exists
            } else {
              console.error('Verification check error:', error);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
        setVerificationLoading(false);
        setLoad(false); // Mark as loaded
      }
    };
  
    // Only fetch if load is true (initial load)
    if (load) {  
      fetchData();
    }
  }, [load]); 

  if (loading || (userData?.role === 'SCHOOL' && verificationLoading)) {
    return <LoadingSpinner />;
  }

  const shouldShowVerifiedCard = () => {
    if (userData?.role !== 'SCHOOL') return false;
    if (!verificationStatus) return true; // No verification exists
    if (verificationStatus.status === 'APPROVED') return false;
    if (verificationStatus.status === 'PENDING') return false;
    return true; // REJECTED or other status
  };

  return (
    <div className="flex">
      <SchoolSidebar userData={userData} />
      <div className="border border-stroke rounded-large-md flex-1 mt-7.5 px-5 py-4 space-y-5 pb-32">
        <Cover />
        {shouldShowVerifiedCard() && <VerifiedCard />}
        <InfoUpdate />
      </div>
    </div>
  );
}