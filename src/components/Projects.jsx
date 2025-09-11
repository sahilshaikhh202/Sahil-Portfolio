import React from "react";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "MedNova",
    description: "Full-stack platform connecting doctors and students in a digital learning space. Doctors create lectures, upload notes; students engage with content; admins handle verification and moderation.",
    techStack: ["React 19", "Vite", "CSS", "React Query", "React Router DOM", "Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "Bcrypt"],
    link: "https://med-nova-sable.vercel.app/", 
    image: "https://i.ibb.co/DD6g1vDf/image.png",
  },
  {
    title: "PenVault",
    description: "Social writing platform for authors to publish stories and engage with readers.",
    techStack: ["Python", "Flask", "Flask-SQLAlchemy", "PostgreSQL", "HTML", "CSS", "JavaScript", "Bootstrap", "Quill.js", "Supabase", "Railway"],
    link: "https://penvault.co",
    image: "https://i.ibb.co/G40Sjpxn/image.png",
  },
  {
    title: "Flicksify",
    description: "Media library app for tracking movies, shows, anime, manga, and novels. Users organize collections, track progress, explore genres, and filter/search with advanced options.",
    techStack: ["Python", "Flask", "PostgreSQL", "SQLAlchemy", "Bootstrap", "JavaScript", "Razorpay API", "Font Awesome"],
    link: "https://github.com/sahilshaikhh202/Flicksify",
    image: "https://i.ibb.co/5hH1xM7d/image.png",
  },
];

export default function Projects() {
  return (
    <section className="container mx-auto py-20 px-6" id="projects">
      {/* Heading → Gradient text (Space Grotesk) */}
      <h2 className="text-4xl font-bold mb-4 text-center" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Projects
        </span>
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 text-center max-w-2xl mx-auto opacity-0 animate-fade-in" style={{ fontFamily: 'Inter, sans-serif' }}>
        Some of my recent work that showcases my skills and passion for development
      </p>
      
      {/* Cards with staggered fade-in animation */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <div 
            key={project.title}
            className="opacity-0 animate-stagger-reveal"
            style={{ animationDelay: `${index * 0.2 + 0.5}s` }}
          >
            <ProjectCard {...project} />
          </div>
        ))}
      </div>
      
      {/* Buttons → Gradient background with hover scale */}
      <div className="text-center mt-12 opacity-0 animate-fade-in-delayed-3">
        <a
          href="https://github.com/sahilshaikhh202"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:scale-105 hover:shadow-lg transition-all duration-300 font-medium"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          View More on GitHub
          <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </a>
      </div>
    </section>
  );
}
