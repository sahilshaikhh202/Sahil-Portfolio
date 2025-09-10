import React from 'react';

export default function TechConstellation() {
  const techIcons = [
    { name: 'React', symbol: '⚛️', delay: '0s' },
    { name: 'JavaScript', symbol: 'JS', delay: '0.5s' },
    { name: 'Node', symbol: '🟢', delay: '1s' },
    { name: 'Python', symbol: '🐍', delay: '1.5s' },
    { name: 'Git', symbol: '📦', delay: '2s' },
  ];

  return (
    <div className="fixed top-20 left-0 w-full h-32 pointer-events-none z-0 overflow-hidden">
      {techIcons.map((tech, index) => (
        <div
          key={tech.name}
          className="absolute text-2xl opacity-20 dark:opacity-30 animate-bounce"
          style={{
            left: `${20 + index * 15}%`,
            top: `${30 + (index % 2) * 40}%`,
            animationDelay: tech.delay,
            animationDuration: '3s',
          }}
        >
          {tech.symbol === 'JS' ? (
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent font-bold text-xl">
              {tech.symbol}
            </span>
          ) : (
            tech.symbol
          )}
        </div>
      ))}
      
      {/* Connecting lines */}
      <svg className="absolute top-0 left-0 w-full h-full opacity-10 dark:opacity-20">
        <path
          d="M 100 50 Q 200 30 300 50 T 500 50"
          stroke="url(#gradient)"
          strokeWidth="1"
          fill="none"
          className="animate-pulse"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
