import React from "react";
import Layout from "./components/Layout";
import Hero from "./components/Hero";
import About from "./components/About";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import FloatingParticles from "./components/FloatingParticles";
import Divider from "./components/Divider";

function App() {
	return (
		<Layout>
			<FloatingParticles />
			<Hero />
			<Divider size="lg" opacity="light" className="max-w-4xl mx-auto" />
			<About />
			<Divider size="md" opacity="normal" className="max-w-3xl mx-auto" />
			<Projects />
			<Divider size="md" opacity="normal" className="max-w-3xl mx-auto" />
			<TechStack />
			<Divider size="lg" opacity="light" className="max-w-4xl mx-auto" />
			<Contact />
		</Layout>
	);
}

export default App;
