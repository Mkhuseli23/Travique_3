import React from 'react';
import './css/contact.css';

function Contact() {
  return (
    <div className="contact-background">
      <div className="contact-container">
        <h1>Contact Us</h1>
        <p>
          We'd love to hear from you! Whether you have a question, suggestion, or just want to say hi — drop us a message below.
        </p>

        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
