import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("theme:dark");
    return stored ? stored === "true" : false; // Default to light theme
  });

  useEffect(() => {
    // Defensive cleanup: ensure no stale 'dark' class lingering on mount
    document.documentElement.classList.remove("dark");
    document.body.classList.remove("dark");
    
    // Remove any body background color to let our Layout component handle it
    document.body.style.backgroundColor = '';
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor = '#111827'; // gray-900
      console.log("Dark mode enabled");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.backgroundColor = '#fafaf9'; // stone-50
      console.log("Dark mode disabled");
    }
    // Log current root classes for debugging
    console.log("<html> classes:", document.documentElement.className);
    console.log("Body background:", document.body.style.backgroundColor);
    // Persist preference
    localStorage.setItem("theme:dark", String(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <div className="flex flex-col min-h-screen bg-stone-50 dark:bg-gray-900 transition-colors">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </div>
  );
}
