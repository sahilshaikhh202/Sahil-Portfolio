import React, { useState } from "react";

// FORMSPREE VERSION - Alternative to EmailJS
export default function ContactFormspree() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      alert("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      // Replace 'YOUR_FORM_ID' with your actual Formspree form ID
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      if (response.ok) {
        alert("Thank you for your message! I'll get back to you soon.");
        setForm({ name: "", email: "", message: "" });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Formspree error:', error);
      alert("Sorry, there was an error sending your message. Please try again or email me directly at mdsahilmsas2@gmail.com");
    } finally {
      setIsLoading(false);
    }
  };

  // Rest of your component JSX remains the same...
  return (
    <div>
      {/* Your existing JSX here */}
    </div>
  );
}

// Setup instructions for Formspree:
// 1. Go to https://formspree.io/
// 2. Create a free account  
// 3. Create a new form
// 4. Get your form endpoint URL
// 5. Replace 'YOUR_FORM_ID' with your actual form ID
