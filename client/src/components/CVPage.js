import React from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import resumePDF from '../assets/Jonathan Ghebrial - Resume.pdf';
import { version as pdfjsVersion } from 'pdfjs-dist';

const CVPage = () => {
    return (
        <div className="cv-page">
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}>
                <div style={{ height: '750px' }}>
                    <Viewer fileUrl={resumePDF} />
                </div>
            </Worker>
        </div>
    );
};

export default CVPage;