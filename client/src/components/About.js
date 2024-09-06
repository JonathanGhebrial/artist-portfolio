import React from 'react';
import '../styles/About.css';
import jessyPortrait from '../assets/jessyportrait.png'; // Make sure this path is correct

const About = () => {
    return (
        <div className="about-container">
            <h1>About Jessy Sherif</h1>
            <img src={jessyPortrait} alt="Jessy Sherif" className="portrait" />
            <div className="summary">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Etiam at justo eu nisi congue cursus. In eget libero a tortor vestibulum egestas. Aliquam erat volutpat. Donec at lacus a ligula fermentum consectetur at non erat. Donec et odio nec leo hendrerit interdum. Nullam at diam vel mi venenatis bibendum in a urna.</p>
            </div>
            <p>Located: Los Angeles, CA</p>
            <p>Contact: <a href="mailto:Jessysherif2003@gmail.com">Jessysherif2003@gmail.com</a></p>
        </div>
    );
}

export default About;