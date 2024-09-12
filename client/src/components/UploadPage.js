import React, { useState } from 'react';
import '../styles/UploadPage.css';

const UploadPage = () => {
    const [title, setTitle] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [vimeoLink, setVimeoLink] = useState('');
    const [additionalStills, setAdditionalStills] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleUpload = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('file', thumbnail); // Assuming one file for thumbnail
        formData.append('vimeoLink', vimeoLink);
        formData.append('page', 'previous-work'); // Specify which page it belongs to

        // Upload files to the server
        fetch('/jessy', {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(data => {
                setSuccessMessage('Upload successful!');
                setTitle('');
                setThumbnail(null);
                setVimeoLink('');
                setAdditionalStills(null);
                // Optionally, refresh the previous works
            })
            .catch(err => {
                console.error('Upload error:', err);
                setSuccessMessage('Upload failed. Please try again.');
            });
    };

    return (
        <div className="upload-page">
            <h1>Upload New Work</h1>
            <form onSubmit={handleUpload}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="file"
                    onChange={(e) => setThumbnail(e.target.files[0])}
                    required
                />
                <input
                    type="text"
                    placeholder="Vimeo Link"
                    value={vimeoLink}
                    onChange={(e) => setVimeoLink(e.target.value)}
                    required
                />
                <input
                    type="file"
                    onChange={(e) => setAdditionalStills(e.target.files)}
                    multiple
                />
                <button type="submit">Upload</button>
            </form>
            {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
    );
};

export default UploadPage;