import React, { useState } from 'react';
import '../styles/ContactForm.css'; // Assuming you're using this CSS file

const ContactForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
    });

    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFeedbackMessage('');
        setError(false);

        fetch('/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === 'Email sent successfully') {
                    setFeedbackMessage('Message sent successfully!');
                } else {
                    setError(true);
                    setFeedbackMessage('Failed to send message. Please try again later.');
                }
            })
            .catch((err) => {
                console.error('Error sending message:', err);
                setError(true);
                setFeedbackMessage('Failed to send message. Please try again later.');
            });
    };

    return (
        <div className="contact-form">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                ></textarea>
                <button type="submit">Submit</button>
            </form>
            
            {feedbackMessage && (
                <p className={error ? 'error-message' : 'success-message'}>{feedbackMessage}</p>
            )}
        </div>
    );
};

export default ContactForm;