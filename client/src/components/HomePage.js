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
      <Footer />
    </div>
  );
};

export default HomePage;