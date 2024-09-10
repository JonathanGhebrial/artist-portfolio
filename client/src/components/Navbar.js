import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';
import instagramIcon from '../assets/instagram.png';
import linkedinIcon from '../assets/linkedin.png';
import jessyLogo from '../assets/jessylogo.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <NavLink to="/" className="navbar-logo">
          <img src={jessyLogo} alt="Jessy Sherif Logo" className="navbar-logo-img" />
        </NavLink>
      </div>
      <ul className="nav-links">
        <li>
          <NavLink
            to="/previous-work"
            className="nav-link"
            activeClassName="active-link"
          >
            Previous Work
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cv"
            className="nav-link"
            activeClassName="active-link"
          >
            CV
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className="nav-link"
            activeClassName="active-link"
          >
            About & Contact
          </NavLink>
        </li>
      </ul>
      <div className="social-icons">
        <a href="https://www.instagram.com/jessy_sherif" target="_blank" rel="noopener noreferrer">
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