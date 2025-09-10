// EmailJS Configuration
// Follow these steps to set up EmailJS:

// 1. Go to https://www.emailjs.com/ and create a free account
// 2. Create an Email Service (Gmail, Outlook, etc.)
// 3. Create an Email Template
// 4. Get your Service ID, Template ID, and User ID
// 5. Replace the values in Contact.jsx

export const emailConfig = {
  serviceID: 'YOUR_SERVICE_ID',     // From EmailJS dashboard
  templateID: 'YOUR_TEMPLATE_ID',   // From EmailJS dashboard  
  userID: 'YOUR_USER_ID'            // From EmailJS dashboard
};

// Example template for EmailJS:
/*
Subject: New Portfolio Contact - {{from_name}}

Hello Sahil,

You have received a new message from your portfolio contact form:

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent from your portfolio website.
*/
