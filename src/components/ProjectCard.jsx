import React from "react";

export default function ProjectCard({ title, description, techStack, link, image }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 group border border-gray-200 dark:border-gray-700">
      {/* Animations → Image zoom on hover */}
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
          {description}
        </p>
        
        {/* Tech tags → Pill badges with hover color change */}
        <div className="flex flex-wrap gap-2 mb-6">
          {techStack.map((tech) => (
            <span 
              key={tech} 
              className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-300 cursor-pointer border border-transparent hover:border-blue-300 dark:hover:border-blue-600"
              style={{ fontFamily: 'Roboto Mono, monospace' }}
            >
              {tech}
            </span>
          ))}
        </div>
        
        {/* Buttons → Gradient background with hover scale */}
        <div className="flex items-center justify-between">
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:scale-105 hover:shadow-lg transition-all duration-300 font-medium"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            View Project
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
