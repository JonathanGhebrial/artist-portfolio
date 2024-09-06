import React, { useState } from 'react';
import axios from 'axios';

const UploadPage = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [page, setPage] = useState('home'); // Default to home page

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
        } catch (error) {
            console.error('Error uploading file:', error);
            setMessage('Error uploading file');
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
        </div>
    );
};

export default UploadPage;