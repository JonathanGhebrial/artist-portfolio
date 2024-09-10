import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/UploadPage.css';

const UploadPage = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [page, setPage] = useState('home'); // Default to home page
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await axios.get(`/photos/${page}`);
                setPhotos(response.data);
            } catch (error) {
                console.error('Error fetching photos:', error);
            }
        };

        fetchPhotos();
    }, [page]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handlePageChange = (e) => {
        setPage(e.target.value);
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage('Please select a file first');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('page', page);

        try {
            const response = await axios.post('/jessy', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessage(response.data.message || 'File uploaded successfully');
            setFile(null);
            fetchPhotos(); // Refresh photos list after upload
        } catch (error) {
            console.error('Error uploading file:', error);
            setMessage('Error uploading file');
        }
    };

    const handleDelete = async (filename) => {
        try {
            const response = await axios.delete('/jessy', {
                data: { filename, page },
            });
            setMessage(response.data.message || 'File deleted successfully');
            fetchPhotos(); // Refresh photos list after delete
        } catch (error) {
            console.error('Error deleting file:', error);
            setMessage('Error deleting file');
        }
    };

    const fetchPhotos = async () => {
        try {
            const response = await axios.get(`/photos/${page}`);
            setPhotos(response.data);
        } catch (error) {
            console.error('Error fetching photos:', error);
        }
    };

    return (
        <div>
            <h2>Upload a Photo</h2>
            <input type="file" onChange={handleFileChange} />
            <select value={page} onChange={handlePageChange}>
                <option value="home">Homepage</option>
                <option value="previous-work">Previous Work</option>
            </select>
            <button onClick={handleUpload}>Upload</button>
            {message && <p>{message}</p>}

            <h2>Delete a Photo</h2>
            <div className="photo-gallery">
                {photos.length > 0 ? (
                    photos.map((photo, index) => (
                        <div key={index} style={{ marginBottom: '10px' }}>
                            <img src={`/uploads/${photo}`} alt="Uploaded" style={{ width: '150px', marginRight: '10px' }} />
                            <button onClick={() => handleDelete(photo)}>Delete</button>
                        </div>
                    ))
                ) : (
                    <p>No photos uploaded yet.</p>
                )}
            </div>
        </div>
    );
};

export default UploadPage;