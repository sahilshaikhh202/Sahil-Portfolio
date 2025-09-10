import React from 'react';

const Divider = ({ 
  orientation = 'horizontal', 
  className = '', 
  size = 'md',
  opacity = 'normal' 
}) => {
  const sizeClasses = {
    sm: orientation === 'horizontal' ? 'h-px my-6' : 'w-px mx-6',
    md: orientation === 'horizontal' ? 'h-0.5 my-8' : 'w-0.5 mx-8', 
    lg: orientation === 'horizontal' ? 'h-1 my-12' : 'w-1 mx-12'
  };

  const opacityClasses = {
    light: 'opacity-30',
    normal: 'opacity-50',
    strong: 'opacity-70'
  };

  const baseClasses = orientation === 'horizontal'
    ? 'w-full'
    : 'h-full min-h-[100px]';

  return (
    <div className={`relative ${baseClasses} ${className}`}>
      {/* Main divider line with gradient */}
      <div 
        className={`
          ${sizeClasses[size]}
          ${opacityClasses[opacity]}
          bg-gradient-to-r from-transparent via-gray-300 to-transparent
          dark:bg-gradient-to-r dark:from-transparent dark:via-gray-600 dark:to-transparent
          ${orientation === 'vertical' ? 'bg-gradient-to-b from-transparent via-gray-300 to-transparent dark:bg-gradient-to-b dark:from-transparent dark:via-gray-600 dark:to-transparent' : ''}
        `}
      />
      
      {/* Soft shadow effect */}
      <div 
        className={`
          absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          ${orientation === 'horizontal' ? 'w-3/4 h-2' : 'w-2 h-3/4'}
          bg-gradient-to-r from-transparent via-gray-200/20 to-transparent
          dark:bg-gradient-to-r dark:from-transparent dark:via-gray-700/20 dark:to-transparent
          ${orientation === 'vertical' ? 'bg-gradient-to-b from-transparent via-gray-200/20 to-transparent dark:bg-gradient-to-b dark:from-transparent dark:via-gray-700/20 dark:to-transparent' : ''}
          blur-sm ${opacityClasses[opacity]}
        `}
      />
      
      {/* Subtle glow effect */}
      <div 
        className={`
          absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          ${orientation === 'horizontal' ? 'w-1/2 h-4' : 'w-4 h-1/2'}
          bg-gradient-to-r from-transparent via-blue-100/10 to-transparent
          dark:bg-gradient-to-r dark:from-transparent dark:via-blue-900/10 dark:to-transparent
          ${orientation === 'vertical' ? 'bg-gradient-to-b from-transparent via-blue-100/10 to-transparent dark:bg-gradient-to-b dark:from-transparent dark:via-blue-900/10 dark:to-transparent' : ''}
          blur-md ${opacityClasses[opacity]}
        `}
      />
    </div>
  );
};

export default Divider;
