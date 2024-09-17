import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/VideoDetailPage.css';

const VideoDetailPage = () => {
    const { slug } = useParams();  // Get the slug from the URL
    const [video, setVideo] = useState(null);

    useEffect(() => {
        fetch('/photos/previous-work')
            .then((res) => res.json())
            .then((data) => {
                const foundVideo = data.find(
                    (video) => video.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === slug
                );
                setVideo(foundVideo);
            })
            .catch((err) => console.error('Error fetching video data:', err));
    }, [slug]);

    if (!video) {
        return <div>Loading...</div>;
    }

    return (
        <div className="video-detail-page">
            <h1 className="video-title">{video.title}</h1>
            <div className="video-container">
                <iframe 
                    src={video.vimeoLink} 
                    className="video-iframe"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    title={video.title}
                />
            </div>
            <div className="stills-container">
                {video.stills.map((still, index) => (
                    <div key={index} className="still-wrapper">
                        <img src={`/uploads/${still}`} alt={`Still ${index + 1}`} className="still-image" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VideoDetailPage;