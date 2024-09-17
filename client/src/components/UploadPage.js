import React, { useState } from 'react';
import '../styles/UploadPage.css';

const UploadPage = () => {
    const [title, setTitle] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [vimeoLink, setVimeoLink] = useState('');
    const [additionalStills, setAdditionalStills] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    const handleUpload = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('thumbnail', thumbnail);
        formData.append('vimeoLink', vimeoLink);
        for (let i = 0; i < additionalStills.length; i++) {
            formData.append('stills', additionalStills[i]);
        }

        fetch('/jessy', {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(data => {
                if (data.message === 'Upload successful!') {
                    setSuccessMessage('Upload successful!');
                    // Clear the form
                    setTitle('');
                    setThumbnail(null);
                    setVimeoLink('');
                    setAdditionalStills([]);
                } else {
                    setSuccessMessage('Upload failed. Please try again.');
                }
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
                    onChange={(e) => setTitle(e.target.value)}                    required
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