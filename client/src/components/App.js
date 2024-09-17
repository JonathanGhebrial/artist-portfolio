import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import About from './About';
import HomePage from './HomePage';
import UploadPage from './UploadPage';
import PreviousWorkPage from './PreviousWorkPage';
import CVPage from './CVPage';
import VideoDetailPage from './VideoDetailPage';  // Import the VideoDetailPage
import Footer from './Footer';

function App() {
    const location = useLocation();

    // Determine if the footer should be displayed
    const showFooter = location.pathname === '/' || location.pathname === '/about';

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<About />} />
                <Route path="/jessy" element={<UploadPage />} />
                <Route path="/previous-work" element={<PreviousWorkPage />} />
                <Route path="/cv" element={<CVPage />} />
                <Route path="/:slug" element={<VideoDetailPage />} />  {/* Dynamic Route */}
            </Routes>
            {showFooter && <Footer />}
        </>
    );
}

export default function AppWithRouter() {
    return (
        <Router>
            <App />
        </Router>
    );
}