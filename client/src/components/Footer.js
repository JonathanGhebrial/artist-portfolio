import React from 'react';
import '../styles/Footer.css';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-description">
          <p>&copy; 2024 Jessy Sherif. All rights reserved.</p>
          <p>Director of Photography | Los Angeles, CA</p>
        </div>
        <div className="footer-socials">
          <a href="https://www.instagram.com/jessy_sherif?igshid=OGQ5ZDc2ODk2ZA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
            <img src="/assets/instagram.png" alt="Instagram" />
          </a>
          <a href="https://www.linkedin.com/in/jessy-ibrahim" target="_blank" rel="noopener noreferrer">
            <img src="/assets/linkedin.png" alt="LinkedIn" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;