import React from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import resumePDF from '../assets/Jonathan Ghebrial - Resume.pdf';

const CVPage = () => {
  return (
    <div className="cv-page">
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.min.js`}>
        <div className="pdf-viewer">
          <Viewer fileUrl={resumePDF} />
        </div>
      </Worker>
    </div>
  );
};

export default CVPage;