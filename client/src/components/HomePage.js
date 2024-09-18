import React from 'react';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <div className="main-content">
        <div className="video-container">
          <iframe
            src="https://player.vimeo.com/video/959370566"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Jessy's Reel"
          ></iframe>
        </div>
        <h1>Welcome to Jessy Sherif's Portfolio</h1>
        <p>Explore the work of a passionate cinematographer who captures compelling imagery and brings every vision to life with professionalism and creativity.</p>
      </div>
    </div>
  );
};

export default HomePage;