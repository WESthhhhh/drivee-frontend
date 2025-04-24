import { TbLogout } from 'react-icons/tb';
import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import api from '../../utils/axios';

const LogoutButton = ({ 
  className = '', 
  iconClassName = '', 
  text = 'Logout', 
  variant = 'default', // 'default' or 'danger'
  onLogoutSuccess 
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await api.post('/users/logout', {}, {
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

  // Consolidated button classes with better variant handling
  const getButtonClasses = () => {
    const baseClasses = `flex items-center gap-2 cursor-pointer transition-colors ${className}`;
    
    switch(variant) {
      case 'danger':
        return `${baseClasses} text-error hover:text-error-dark bg-error-light hover:bg-error-lighter p-2 rounded-md`;
      default:
        return `${baseClasses} text-primary hover:text-primary-dark bg-primary-light hover:bg-primary-lighter p-2 rounded-md`;
    }
  };

  return (
    <button 
      className={getButtonClasses()}
      onClick={handleLogout}
      disabled={isLoading}
      type="button"
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
          <TbLogout className={`text-md ${iconClassName}`} />
          {text && <span>{text}</span>}
        </>
      )}
    </button>
  );
};

export default LogoutButton;