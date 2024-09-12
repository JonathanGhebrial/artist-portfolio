import React from 'react';
import '../styles/HomePage.css';
import Footer from './Footer';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <div className="video-section">
        <div className="video-container">
          <iframe
            src="https://player.vimeo.com/video/959370566"
            className="video"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Jessy's Reel"
          ></iframe>
        </div>
      </div>
      <div className="content-section">
        <h1 className="homepage-title">Welcome to Jessy Sherif's Portfolio</h1>
        <p className="homepage-description">
          Explore the work of a passionate cinematographer who captures compelling imagery and brings every vision to life with professionalism and creativity.
        </p>
      </div>
    </div>
  );
};

export default HomePage;