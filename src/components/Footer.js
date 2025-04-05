// components/Footer.js
import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      {/* Little Lemon Chicago Section (Image & Text) */}
      <div className="footer-section footer-section-logo"> {/* Added specific class for logo section */}
        <div className="footer-image">
          <img id="footer-logo" src="/images/footer-logo.png" alt="Little Lemon Footer Logo" />
        </div>
      </div>

      {/* Doormat Navigation */}
      <div className="footer-section">
        <h4>Navigation</h4>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/menu">Menu</a></li>
          <li><a href="/reservations">Reservations</a></li>
          <li><a href="/order-online">Order Online</a></li>
          <li><a href="/login">Login</a></li> {/* Added Login based on mockup */}
        </ul>
      </div>

      {/* Contact */}
      <div className="footer-section">
        <h4>Contact</h4>
        <p>Address</p>
        <p>Phone number</p>
        <p>Email</p>
      </div>

      {/* Social Media Links */}
      <div className="footer-section">
        <h4>Social Media Links</h4>
        <p>Address</p>
        <p>Phone number</p>
        <p>Email</p>
      </div>
    </footer>
  );
}

export default Footer;
