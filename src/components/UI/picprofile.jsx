import { useEffect, useState } from 'react';
import api from '../../utils/axios'; 
import LoadingSpinner from '../UI/loadingSpinner';

export default function PicProfile() {
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
    <div className="-space-y-4">
      <div className="flex items-center gap-2 pl-6 relative">
        <div className="relative w-[60px] h-[60px] border-4 border-light rounded-full">
          <img 
           src="/images/avatar.jpg" 
            alt="Profile" 
            className="w-full h-full object-cover rounded-full"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/of-2.png";
            }}
          />
        </div>
        <div className="font-semibold text-[#0B247A]">
          <div>
            {userData?.firstName && userData?.lastName 
              ? `${userData.firstName} ${userData.lastName}`
              : userData?.email?.split('@')[0] || 'User'}
          </div>
          {userData?.role && (
          <div className={`
            px-2 py-1 w-fit rounded-md text-[10px] font-bold
            ${
              userData.role === 'SCHOOL' ? 'bg-b50 text-b200 ' :
              userData.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' :
              'bg-gray-100 text-primary'
            }
          `}>
            {userData.role === 'SCHOOL' ? 'Pro ' : 
            userData.role === 'ADMIN' ? 'Administrator' : 
            'Member'}
          </div>
        )}
        </div>
      </div>
    </div>
  );
}