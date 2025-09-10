import React, { useState } from "react";
import emailjs from '@emailjs/browser';

const socials = [
	{ 
		name: "GitHub", 
		link: "https://github.com/sahilshaikhh202", 
		icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
	},
	{ 
		name: "LinkedIn", 
		link: "https://www.linkedin.com/in/mohd-sahil-shaikh-3664aa307", 
		icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
	},
];

export default function Contact() {
	const [form, setForm] = useState({ name: "", email: "", message: "" });
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
    
		// Simple form validation
		if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
			alert("Please fill in all fields");
			return;
		}

		setIsLoading(true);

    try {
      // EmailJS configuration
      const serviceID = 'service_rscmbmq'; // Replace with your EmailJS service ID
      const templateID = 'template_kt9uwio'; // Replace with your EmailJS template ID  
      const userID = '1wxDQcVO0YPJG77_6'; // Replace with your EmailJS user ID

			const templateParams = {
				from_name: form.name,
				from_email: form.email,
				message: form.message,
				to_name: 'Sahil', // Your name
			};

			await emailjs.send(serviceID, templateID, templateParams, userID);
      
			alert("Thank you for your message! I'll get back to you soon.");
			setForm({ name: "", email: "", message: "" });
		} catch (error) {
			console.error('EmailJS error:', error);
			alert("Sorry, there was an error sending your message. Please try again or email me directly at mdsahilmsas2@gmail.com");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<section className="container mx-auto py-20 px-6" id="contact">
			<div className="max-w-4xl mx-auto">
				{/* Heading → Gradient text (Space Grotesk) */}
				<h2 className="text-4xl font-bold mb-4 text-center" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
					<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
						Let's Work Together
					</span>
				</h2>
				<p className="text-lg text-gray-600 dark:text-gray-400 mb-12 text-center max-w-2xl mx-auto opacity-0 animate-fade-in" style={{ fontFamily: 'Inter, sans-serif' }}>
					Have a project in mind or just want to chat about technology? I'd love to hear from you.
				</p>
        
				<div className="grid md:grid-cols-2 gap-12 items-start">
					{/* Contact Info with animations */}
					<div className="space-y-8 opacity-0 animate-stagger-reveal" style={{ animationDelay: '0.5s' }}>
						<div>
							<h3 className="text-xl font-semibold mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
								<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
									Get In Touch
								</span>
							</h3>
							<div className="space-y-4">
								<div className="flex items-center space-x-3 group">
									<div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
										<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
										</svg>
									</div>
									<a href="mailto:mdsahilmsas2@gmail.com" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
										mdsahilmsas2@gmail.com
									</a>
								</div>
                
								<div className="flex items-center space-x-3 group">
									<div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
										<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
										</svg>
									</div>
									<span className="text-gray-700 dark:text-gray-300 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Mumbai, India</span>
								</div>
							</div>
						</div>

						<div>
							<h3 className="text-xl font-semibold mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
								<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
									Follow Me
								</span>
							</h3>
							<div className="flex space-x-4">
								{socials.map((social, index) => (
									<a
										key={social.name}
										href={social.link}
										target="_blank"
										rel="noopener noreferrer"
										className="w-14 h-14 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center group hover:scale-110 hover:-translate-y-1 border border-gray-200 dark:border-gray-700 opacity-0 animate-stagger-reveal"
										style={{ animationDelay: `${index * 0.1 + 1}s` }}
										aria-label={social.name}
									>
										<svg className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
											<path d={social.icon} />
										</svg>
									</a>
								))}
							</div>
						</div>
					</div>

					{/* Contact Form with enhanced styling */}
					<div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 opacity-0 animate-stagger-reveal" style={{ animationDelay: '0.7s' }}>
						<form className="space-y-6" onSubmit={handleSubmit}>
							<div>
								<label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
									Your Name
								</label>
								<input
									type="text"
									id="name"
									name="name"
									placeholder="John Doe"
									value={form.name}
									onChange={handleChange}
									required
									className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white dark:hover:bg-gray-600"
									style={{ fontFamily: 'Inter, sans-serif' }}
								/>
							</div>
              
							<div>
								<label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
									Your Email
								</label>
								<input
									type="email"
									id="email"
									name="email"
									placeholder="john@example.com"
									value={form.email}
									onChange={handleChange}
									required
									className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white dark:hover:bg-gray-600"
									style={{ fontFamily: 'Inter, sans-serif' }}
								/>
							</div>
              
							<div>
								<label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
									Your Message
								</label>
								<textarea
									id="message"
									name="message"
									placeholder="Tell me about your project..."
									value={form.message}
									onChange={handleChange}
									required
									rows={5}
									className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none hover:bg-white dark:hover:bg-gray-600"
									style={{ fontFamily: 'Inter, sans-serif' }}
								/>
							</div>
              
							{/* Button → Gradient background with hover scale */}
							<button
								type="submit"
								disabled={isLoading}
								className={`w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 font-medium ${
									isLoading ? 'opacity-50 cursor-not-allowed' : ''
								}`}
								style={{ fontFamily: 'Inter, sans-serif' }}
							>
								{isLoading ? 'Sending...' : 'Send Message'}
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
