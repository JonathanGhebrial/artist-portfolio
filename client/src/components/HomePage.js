import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactForm from './ContactForm';  // Import the ContactForm component

const HomePage = () => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await axios.get('/photos/home');
                setPhotos(response.data);
            } catch (error) {
                console.error('Error fetching photos:', error);
            }
        };

        fetchPhotos();
    }, []);

    return (
        <div>
            <h2>Homepage Photos</h2>
            {photos.length > 0 ? (
                <div className="photo-gallery">
                    {photos.map((photo, index) => (
                        <img key={index} src={`/uploads/${photo}`} alt="Uploaded" />
                    ))}
                </div>
            ) : (
                <p>No photos uploaded yet.</p>
            )}
            
            {/* Adding the ContactForm below the photos */}
            <ContactForm />
        </div>
    );
};

export default HomePage;