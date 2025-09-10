import React from "react";

export default function About() {
  const coreSkills = ["Python", "JavaScript", "Node.js", "React", "PostgreSQL", "MongoDB"];

  return (
    <section className="container mx-auto py-20 px-6" id="about">
      {/* Heading → Gradient text (Space Grotesk) */}
      <h2 className="text-4xl font-bold mb-12 text-center" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          About Me
        </span>
      </h2>
      
      <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
        {/* Avatar/Icon → Gradient glow */}
        <div className="relative w-48 h-48 flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-lg opacity-60 animate-pulse"></div>
          <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center overflow-hidden shadow-xl">
            <img 
              src="https://www.svgrepo.com/show/453035/boy-with-glasses.svg" 
              alt="Mohd Sahil Shaikh" 
              className="w-full h-full object-cover brightness-0 invert"
            />
          </div>
        </div>
        
        <div className="flex-1">
          {/* Paragraphs → Inter with fade-in animation + highlighted keywords */}
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed opacity-0 animate-fade-in-delayed" style={{ fontFamily: 'Inter, sans-serif' }}>
            Hi! I'm <span className="text-blue-600 dark:text-blue-400 font-semibold">Mohd Sahil Shaikh</span>, a passionate <span className="text-purple-600 dark:text-purple-400 font-semibold">Full-Stack Developer</span> with experience in building <span className="text-blue-600 dark:text-blue-400 font-semibold">modern web applications</span>. I specialize in Python, Node.js, React, and creating seamless user experiences that make a real impact.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed opacity-0 animate-fade-in-delayed-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            I have a proven ability to <span className="text-green-600 dark:text-green-400 font-semibold">learn quickly</span>, take initiative, and execute tasks independently. I'm eager to take on new challenges, continue expanding my <span className="text-purple-600 dark:text-purple-400 font-semibold">technical expertise</span>, and make a meaningful contribution to innovative and impactful tech teams.
          </p>
          
          {/* Core Skills → Monospace (Roboto Mono), hover effects, staggered reveal */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Core Skills
              </span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {coreSkills.map((skill, index) => (
                <span 
                  key={skill}
                  className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-center font-medium hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300 hover:scale-105 transition-all duration-300 cursor-pointer opacity-0 animate-stagger-reveal border border-transparent hover:border-blue-300 dark:hover:border-blue-600"
                  style={{ 
                    fontFamily: 'Roboto Mono, monospace',
                    animationDelay: `${index * 0.1 + 1}s`
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
