import React from "react";
import Layout from "./components/Layout";
import Hero from "./components/Hero";
import About from "./components/About";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import FloatingParticles from "./components/FloatingParticles";

function App() {
	return (
		<Layout>
			<FloatingParticles />
			<Hero />
			<About />
			<Projects />
			<TechStack />
			<Contact />
		</Layout>
	);
}

export default App;
