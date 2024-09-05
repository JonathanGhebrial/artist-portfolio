import React from 'react';
import '../styles/About.css'; // Ensure you create this CSS file for styling

const About = () => {
    return (
        <div className="about-container">
            <h1>About Jessy Sherif</h1>
            <p>Located: Los Angeles, CA</p>
            <p>Contact: <a href="mailto:Jessysherif2003@gmail.com">Jessysherif2003@gmail.com</a></p>
            {/* Add more information about Jessy here as needed */}
        </div>
    );
}

export default About;