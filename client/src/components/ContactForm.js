import React from 'react';
import '../styles/ContactForm.css'; // Create this CSS file for styling

const ContactForm = () => {
    return (
        <form className="contact-form">
            <div className="form-group">
                <div className="name-group">
                    <div>
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" name="firstName" required />
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" name="lastName" required />
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" required />
            </div>
            <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" required></textarea>
            </div>
            <button type="submit" className="submit-button">Submit</button>
        </form>
    );
}

export default ContactForm;