import React from "react";

const skillCategories = [
  {
    title: "Frontend",
    icon: "💻",
    skills: [
      { name: "HTML/CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },
    ]
  },
  {
    title: "Backend",
    icon: "🔧",
    skills: [
      { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Flask", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
      { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "SQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    ]
  },
  {
    title: "Tools",
    icon: "🛠️",
    skills: [
      { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "VS Code", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      { name: "Postman", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
    ]
  }
];

export default function TechStack() {
  return (
    <section className="container mx-auto py-20 px-6" id="skills">
      {/* Heading → Gradient text (Space Grotesk) */}
      <h2 className="text-4xl font-bold mb-4 text-center" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Skills
        </span>
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 text-center max-w-2xl mx-auto opacity-0 animate-fade-in" style={{ fontFamily: 'Inter, sans-serif' }}>
        Technologies I work with to bring ideas to life
      </p>
      
      {/* Cards with staggered fade-in animation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {skillCategories.map((category, index) => (
          <div 
            key={category.title} 
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-200 dark:border-gray-700 opacity-0 animate-stagger-reveal"
            style={{ animationDelay: `${index * 0.2 + 0.5}s` }}
          >
            {/* Category header with gradient icon background */}
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <span className="text-2xl">{category.icon}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {category.title}
                </span>
              </h3>
            </div>
            
            {/* Skills with hover effects and improved styling */}
            <div className="space-y-3">
              {category.skills.map((skill, skillIndex) => (
                <div 
                  key={skill.name} 
                  className="flex items-center p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:scale-105 transition-all duration-300 group cursor-pointer border border-transparent hover:border-blue-200 dark:hover:border-blue-700"
                  style={{ 
                    animationDelay: `${index * 0.2 + skillIndex * 0.1 + 1}s`
                  }}
                >
                  <div className="w-10 h-10 mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <img 
                      src={skill.logo} 
                      alt={skill.name} 
                      className="w-full h-full object-contain filter group-hover:brightness-110"
                    />
                  </div>
                  <span className="text-gray-800 dark:text-gray-200 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
