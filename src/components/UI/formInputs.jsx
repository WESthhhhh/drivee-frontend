import React from "react";
import { FiEye, FiEyeOff, FiLock, FiMail, FiFile, FiUser } from "react-icons/fi";

export const PrimaryInput = ({ 
    label, 
    placeholder, 
    type = "text", 
    icon = null, 
    error = null, 
    succes = null, 
    ...props  
  }) => {
      const getIcon = () => {
          switch(icon) {
              case 'user': return <FiUser className="w-4 h-4 text-gray-400" />;
              case 'lock': return <FiLock className="w-4 h-4 text-gray-400" />;
              case 'mail': return <FiMail className="w-4 h-4 text-gray-400" />;
              case 'file': return <FiFile className="w-4 h-4 text-gray-400" />;
              default: return null;
          }
      };
  
      return (
          <div className=" ">
              <label className="block text-sm font-medium mb-[12px] text-primary">{label}</label>
              <div className="relative">
                  <input
                      type={type}
                      placeholder={placeholder}
                      className={`w-full p-2 border ${error ? 'border-error' : succes ? 'border-success' : 'border-b50'} rounded-small-md focus:outline-none focus:ring-thin focus:ring-border-b50 focus:border-b75 text-[14px] ${icon ? 'pl-10' : ''}`}
                      {...props} 
                  />
                  {icon && (
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          {getIcon()}
                      </div>
                  )}
                  {error && (
                      <p className="text-[13px] text-error">{error}</p>
                  )}
                  {succes && (
                      <p className="text-[13px] text-success">{succes}</p>
                  )}
              </div>
          </div>
      );
  };

export const PasswordInput = ({ label, placeholder, error = null, succes = null, ...rest }) => {
    const [showPassword, setShowPassword] = React.useState(false);
    
    return (
        <div className=" ">
            <label className="block text-sm font-medium mb-[12px] text-primary">{label}</label>
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    className={`w-full p-2 border ${error ? 'border-error' : succes ? 'border-success' : 'border-b50'} rounded-small-md focus:outline-none focus:ring-thin focus:ring-border-b50 focus:border-b75 text-[14px] `} 
                    {...rest} 
                />
                
                {/* <button 
                    type="button" 
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button> */}
                {error && (
                    <p className="text-[13px] text-error">{error}</p>
                )}
                {succes && (
                    <p className="text-[13px] text-success">{succes}</p>
                )}
            </div>
        </div>
    );
};

export const EmailInput = ({ 
    label, 
    placeholder, 
    error = null, 
    succes = null,
    register 
  }) => {
    return (
      <div className=" ">
        <label className="block text-sm font-medium mb-[12px] text-primary">{label}</label>
        <div className="relative">
          <input
            type="email"
            placeholder={placeholder}
            className={`w-full p-2 border ${
              error ? 'border-error' : 
              succes ? 'border-success' : 'border-b50'
            } rounded-small-md focus:outline-none focus:ring-thin focus:ring-border-b50 focus:border-b75 text-[14px] `}
            {...register} 
          />
         
          {error && (
            <p className="text-[13px] text-error">{error}</p>
          )}
          {succes && (
            <p className="text-[13px] text-success">{succes}</p>
          )}
        </div>
      </div>
    );
  };

export const SecondaryInput = ({ label, placeholder, type = "text", icon = null }) => {
    const getIcon = () => {
        switch(icon) {
            case 'user': return <FiUser className="w-4 h-4 text-gray-400" />;
            case 'lock': return <FiLock className="w-4 h-4 text-gray-400" />;
            case 'mail': return <FiMail className="w-4 h-4 text-gray-400" />;
            case 'file': return <FiFile className="w-4 h-4 text-gray-400" />;
            default: return null;
        }
    };

    return (
        <div className=" ">
            <label className="block text-sm font-medium mb-[12px] text-primary">{label}</label>
            <div className="relative">
                <input
                    type={type}
                    placeholder={placeholder}
                    className={`w-full p-2 text-[14px] border border-border-b50 rounded-small-md focus:outline-none focus:ring-thin focus:ring-border-b50 focus:border-b75 ${icon ? 'pl-10' : ''}`}
                />
                {icon && (
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        {getIcon()}
                    </div>
                )}
            </div>
        </div>
    );
};

export const DisableInput = ({ label, placeholder, type = "text", icon = null }) => {
    const getIcon = () => {
        switch(icon) {
            case 'user': return <FiUser className="w-4 h-4 text-gray-400" />;
            case 'lock': return <FiLock className="w-4 h-4 text-gray-400" />;
            case 'mail': return <FiMail className="w-4 h-4 text-gray-400" />;
            case 'file': return <FiFile className="w-4 h-4 text-gray-400" />;
            default: return null;
        }
    };

    return (
        <div className=" ">
            <label className="block text-sm font-medium mb-[12px] text-inputtext">{label}</label>
            <div className="relative">
                <input
                    type={type}
                    placeholder={placeholder}
                    disabled
                    className={`w-full p-2 border-none text-[14px] rounded-small-md focus:outline-none bg-lightgrey ${icon ? 'pl-10' : ''}`}
                />
                {icon && (
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        {getIcon()}
                    </div>
                )}
            </div>
        </div>
    );
};

export const FileInput = ({ 
    label,
    onChange,
    error,
    accept,
    id = "file-upload",
    fileName
  }) => {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-primary">{label}</label>
        <div className={`relative flex items-center border rounded-small-md px-3 py-2 ${
          error ? 'border-error' : 'border-border-b50 focus-within:ring-thin focus-within:ring-border-b50 focus-within:border-b75'
        }`}>
          <label htmlFor={id} className="flex items-center cursor-pointer gap-3 w-full">
            <FiFile className={`w-4 h-4 ${
              error ? 'text-error' : 'text-gray-400'
            }`} />
            <span className={`text-sm ${
              error ? 'text-error' : 'text-inputtext'
            } truncate`}>
              {fileName || "Upload File"}
            </span>
          </label>
          <input
            id={id}
            type="file"
            className="hidden"
            onChange={onChange}
            accept={accept}
          />
        </div>
        {error && (
          <p className="text-sm text-error mt-1">
            {error}
          </p>
        )}
      </div>
    );
  };

export const TextArea = ({ label, placeholder }) => {
    return (
        <div className=" ">
            <label className="block text-sm font-medium mb-[12px] text-primary">{label}</label>
            <textarea
                placeholder={placeholder}
                className="w-full p-2 text-[14px] border border-border-b50 rounded-small-md h-24 focus:outline-none focus:ring-thin focus:ring-border-b50 focus:border-b75"
            />
        </div>
    );
};