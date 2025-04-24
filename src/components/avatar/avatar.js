import React from 'react';

const Avatar = ({ userId, username, size = 40 }) => {
  // Generate consistent color based on userId or username
  const stringToColor = (string) => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const color = `hsl(${hash % 360}, 70%, 50%)`;
    return color;
  };

  return (
    <div 
      style={{
        backgroundColor: stringToColor(userId || username),
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: `${size / 2}px`
      }}
    >
      {username ? username.charAt(0).toUpperCase() : ''}
    </div>
  );
};

export default Avatar;