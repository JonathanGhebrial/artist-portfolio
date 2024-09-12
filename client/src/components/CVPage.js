import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import resumePDF from '../assets/Jonathan Ghebrial - Resume.pdf';

const CVPage = () => {
  return (
    <div className="cv-page">
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
        <div className="pdf-viewer">
          <Viewer fileUrl={resumePDF} defaultScale={1.5} />
        </div>
      </Worker>
    </div>
  );
};

export default CVPage;