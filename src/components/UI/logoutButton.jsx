import { TbLogout } from 'react-icons/tb';
import { useState } from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const LogoutButton = ({ 
  className = '', 
  iconClassName = '', 
  text = 'Logout', 
  variant = 'default',
  onLogoutSuccess 
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await axios.post('http://localhost:5000/users/logout', {}, {
        withCredentials: true
      });
      if (onLogoutSuccess) onLogoutSuccess();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonClasses = {
    default: `flex items-center gap-2 text-primary cursor-pointer ${className}`,
    danger: `flex items-center gap-2 text-error bg-red-50 hover:bg-red-100 p-2 rounded-md ${className}`
  };

  return (
    <div 
      className={`${buttonClasses[variant] || buttonClasses.default} ${isLoading ? 'opacity-75' : ''}`}
      onClick={handleLogout}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <ClipLoader 
            size={18} 
            color={variant === 'danger' ? '#EF4444' : '#3B82F6'} 
            cssOverride={{
              display: 'block',
              margin: '0 auto',
              borderWidth: '3px'
            }}
          />
          <span>Logging out...</span>
        </div>
      ) : (
        <>
          <TbLogout className={`text-xl ${iconClassName}`} />
          {text && <span>{text}</span>}
        </>
      )}
    </div>
  );
};

export default LogoutButton;