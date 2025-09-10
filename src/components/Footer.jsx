import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-16 mt-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            {/* Name with gradient text */}
            <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Mohd Sahil Shaikh
              </span>
            </h3>
            <p className="text-gray-400 text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
              Full-Stack Developer
            </p>
            <p className="text-gray-500 mt-2 max-w-md" style={{ fontFamily: 'Inter, sans-serif' }}>
              Building innovative solutions with modern technologies
            </p>
          </div>
          
          {/* Enhanced navigation links */}
          <div className="flex flex-wrap justify-center gap-8">
            <a href="#about" className="text-gray-400 hover:text-blue-400 transition-all duration-300 font-medium hover:scale-110 relative group" style={{ fontFamily: 'Inter, sans-serif' }}>
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#skills" className="text-gray-400 hover:text-blue-400 transition-all duration-300 font-medium hover:scale-110 relative group" style={{ fontFamily: 'Inter, sans-serif' }}>
              Skills
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#projects" className="text-gray-400 hover:text-blue-400 transition-all duration-300 font-medium hover:scale-110 relative group" style={{ fontFamily: 'Inter, sans-serif' }}>
              Projects
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#contact" className="text-gray-400 hover:text-blue-400 transition-all duration-300 font-medium hover:scale-110 relative group" style={{ fontFamily: 'Inter, sans-serif' }}>
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>
        </div>
        
        {/* Social links section */}
        <div className="flex justify-center space-x-6 mb-12">
          <a href="https://github.com/sahilshaikhh202" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-800/50 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group">
            <svg className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/mohd-sahil-shaikh-3664aa307" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-800/50 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group">
            <svg className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
        
        {/* Enhanced bottom section */}
        <div className="border-t border-gray-800/50 pt-8 text-center">
          <p className="text-gray-400 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            © {new Date().getFullYear()} Mohd Sahil Shaikh. Crafted using React & Tailwind CSS.
          </p>
          <p className="text-gray-500 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
            Designed for impact, built for performance.
          </p>
        </div>
      </div>
    </footer>
  );
}
