import React from 'react';
import '../styles/About.css'; // Ensure this CSS file is created
import ContactForm from './ContactForm'; // Assuming you have a ContactForm component
import JessyPortrait from '../assets/jessyportrait.png'; // Assuming this is the correct path to your image

const About = () => {
    return (
        <div className="about-container">
            <img src={JessyPortrait} alt="Jessy Sherif" />
            <div className="about-content">
                <h1>About Jessy Sherif</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.</p>
                <div className="contact-form-container">
                    <ContactForm />
                </div>
            </div>
        </div>
    );
}

export default About;