import React from 'react';

export default function ScrollIndicator() {
  return (
    <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-10 animate-fade-in-delayed">
      {/* Welcome Text */}
      <div className="text-center mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400 font-light tracking-wide" 
           style={{ fontFamily: 'Roboto Mono, monospace' }}>
          Welcome to my portfolio
        </p>
      </div>
      
      {/* Scroll Indicator */}
      <div className="flex flex-col items-center">
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-500 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full mt-2 animate-bounce"></div>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 tracking-widest">SCROLL</p>
      </div>
    </div>
  );
}
