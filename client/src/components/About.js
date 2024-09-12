import React from 'react';
import '../styles/About.css'; // Ensure this CSS file is created
import ContactForm from './ContactForm'; // Assuming you have a ContactForm component
import JessyPortrait from '../assets/jessyportrait.png'; // Assuming this is the correct path to your image
import Footer from './Footer'; // Import the Footer component

const About = () => {
    return (
        <div className="about-page">
            <div className="about-container">
                <img src={JessyPortrait} alt="Jessy Sherif" className="portrait" />
                <div className="about-content">
                    <h1>About Jessy Sherif</h1>
                    <p>As a Cinematographer with a Master's from UCLA and a Bachelor's from UC San Diego, I bring both experience and education to the craft of visual storytelling. My background spans a variety of projects, from commercials to narrative films, always with a focus on capturing compelling imagery! I’m passionate about collaborating with teams to create visually stunning work, making the process fun and seamless while delivering top-notch results. Whether it's narrative storytelling, or other projects I aim to bring every vision to life with professionalism, positive attitude, all while making memories along the way!</p>
                    <div className="contact-form-container">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
