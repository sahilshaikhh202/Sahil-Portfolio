import React from "react";

export default function Hero() {
	const handleContactScroll = () => {
		document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
	};

	return (
		<section className="min-h-screen flex flex-col justify-center items-center pt-24" id="hero">
			{/* Main Name with Space Grotesk (bold, gradient text) */}
			<h1 className="text-5xl md:text-7xl font-bold mb-6 text-center leading-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
				<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
					Mohd Sahil Shaikh
				</span>
			</h1>
      
			{/* Subtitle with Roboto Mono (typing animation) */}
			<h2 className="text-2xl md:text-3xl mb-8 text-center font-medium" style={{ fontFamily: 'Roboto Mono, monospace' }}>
				<span className="typing-animation text-blue-600 dark:text-blue-400">
					Full-Stack Developer
				</span>
			</h2>
      
			{/* Tagline with Open Sans (light gray, fade-in) */}
			<p className="max-w-2xl text-center text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed opacity-0 animate-fade-in font-light" style={{ fontFamily: 'Open Sans, sans-serif' }}>
				Passionate about building scalable web applications and delightful user experiences. Always learning, always shipping innovative solutions.
			</p>
			<div className="flex flex-col sm:flex-row gap-4">
				<button
					onClick={handleContactScroll}
					className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 font-medium"
				>
					<svg className="w-5 h-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
					</svg>
					Get In Touch
				</button>
        
				{/* Resume button with gradient design */}
				<a
					href="https://drive.google.com/file/d/1wX_rkgIs0W4AezahD9oTX5JIfNtb3AYi/view?usp=sharing"
					target="_blank"
					rel="noopener noreferrer"
					className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 font-medium text-center inline-flex items-center justify-center"
				>
					<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
					</svg>
					Resume
				</a>
        
				<a
					href="#projects"
					className="px-8 py-4 bg-gradient-to-r from-pink-600 to-blue-600 text-white rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 font-medium text-center inline-flex items-center justify-center"
				>
					<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
					</svg>
					View My Work
				</a>
			</div>
		</section>
	);
}
