import React from 'react';

interface IconProps {
  className?: string;
}

export const D20Icon: React.FC<IconProps> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5M2 7v10l10 5 10-5V7" />
    <path d="M12 22V12" />
    <path d="M2 17l10-5" />
    <path d="M22 17l-10-5" />
  </svg>
);