import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PreviousWorkPage = () => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await axios.get('/photos/previous-work');
                setPhotos(response.data);
            } catch (error) {
                console.error('Error fetching photos:', error);
            }
        };

        fetchPhotos();
    }, []);

    return (
        <div>
            <h2>Previous Work Photos</h2>
            {photos.length > 0 ? (
                <div className="photo-gallery">
                    {photos.map((photo, index) => (
                        <img key={index} src={`/uploads/${photo}`} alt="Uploaded" />
                    ))}
                </div>
            ) : (
                <p>No photos uploaded yet.</p>
            )}
        </div>
    );
};

export default PreviousWorkPage;