// components/UI/tooltip.jsx
import { useState } from 'react';

export const Tooltip = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute z-10 w-40 p-1 mt-2 text-[10px] text-b200 font-semibold bg-stroke rounded-large-md ">
          {content}
        </div>
      )}
    </div>
  );
};