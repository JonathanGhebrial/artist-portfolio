import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/VideoDetailPage.css';

const previousWorks = [
    { id: 1, title: 'Tangerine', videoUrl: 'vimeo_video_url', stills: ['path_to_still_1', 'path_to_still_2'] },
    // Add more works here
];

const VideoDetailPage = () => {
    const { id } = useParams();
    const work = previousWorks.find(work => work.id === parseInt(id));

    if (!work) return <div>Work not found</div>;

    return (
        <div className="video-detail-page">
            <iframe
                src={`https://player.vimeo.com/video/${work.videoUrl}`}
                width="640"
                height="360"
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
                title={work.title}
            ></iframe>
            <div className="stills-gallery">
                {work.stills.map((still, index) => (
                    <img key={index} src={still} alt={`${work.title} still ${index + 1}`} className="still-image" />
                ))}
            </div>
        </div>
    );
};

export default VideoDetailPage;