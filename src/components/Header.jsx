import React, { useState } from "react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Header({ darkMode, toggleDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-800">
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo with gradient text */}
        <div className="font-bold text-2xl" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Sahil
          </span>
        </div>
        
        {/* Desktop Navigation with enhanced styling */}
        <ul className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-medium relative group px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          {/* Enhanced dark mode toggle */}
          {/* <button
            aria-label="Toggle dark mode"
            onClick={toggleDarkMode}
            className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300"
          >
            {darkMode ? "🌙" : "☀️"}
          </button> */}

          {/* Enhanced mobile menu button */}
          <button
            className="md:hidden p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-xl md:hidden border-t border-gray-200 dark:border-gray-800 rounded-b-2xl">
            <ul className="flex flex-col py-6">
              {navLinks.map((link, index) => (
                <li key={link.name} className="opacity-0 animate-stagger-reveal" style={{ animationDelay: `${index * 0.1}s` }}>
                  <a
                    href={link.href}
                    className="block px-6 py-3 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 font-medium mx-3 rounded-xl"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
