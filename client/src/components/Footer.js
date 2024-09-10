import React from 'react';
import '../styles/Footer.css';
import instagramIcon from '../assets/instagram.png';
import linkedinIcon from '../assets/linkedin.png';
import jessyLogo from '../assets/jessylogo.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-info">
          <p>Located:</p>
          <p>Los Angeles, CA</p>
          <p>Contact:</p>
          <p>Jessysherif2003@gmail.com</p>
        </div>
        <div className="footer-logo">
          <img src={jessyLogo} alt="Jessy Sherif Logo" />
        </div>
        <div className="footer-socials">
          <a href="https://www.instagram.com/jessy_sherif?igshid=OGQ5ZDc2ODk2ZA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
            <img src={instagramIcon} alt="Instagram" />
          </a>
          <a href="https://www.linkedin.com/in/jessy-ibrahim" target="_blank" rel="noopener noreferrer">
            <img src={linkedinIcon} alt="LinkedIn" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;