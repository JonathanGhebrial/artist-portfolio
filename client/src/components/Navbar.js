import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import instagramIcon from '../assets/instagram.png';
import linkedinIcon from '../assets/linkedin.png';

const Navbar = () => {
    return (
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          <h1 className="navbar-title">JESSY SHERIF</h1>
          <h2 className="navbar-subtitle">DIRECTOR OF PHOTOGRAPHY</h2>
        </Link>
        <ul className="nav-tabs">
          <li><Link to="/previous-work">Previous Work</Link></li>
          <li><Link to="/cv">CV</Link></li>
          <li><Link to="/about">About & Contact</Link></li>
        </ul>
        <div className="social-icons">
          <a href="https://www.instagram.com/jessy_sherif?igshid=OGQ5ZDc2ODk2ZA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
            <img src={instagramIcon} alt="Instagram" className="social-icon" />
          </a>
          <a href="https://www.linkedin.com/in/jessy-ibrahim" target="_blank" rel="noopener noreferrer">
            <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
          </a>
        </div>
      </nav>
    );
  };
  
  export default Navbar;