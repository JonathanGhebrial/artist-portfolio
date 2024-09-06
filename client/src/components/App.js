import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import About from './About';
import HomePage from './HomePage';  // Import HomePage Component
import UploadPage from './UploadPage'; // Import UploadPage component
import PreviousWorkPage from './PreviousWorkPage'; // Import PreviousWorkPage component

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} /> {/* HomePage route */}
                <Route path="/about" element={<About />} />
                <Route path="/jessy" element={<UploadPage />} /> {/* UploadPage route */}
                <Route path="/previous-work" element={<PreviousWorkPage />} /> {/* PreviousWorkPage Component */}
            </Routes>
        </Router>
    );
}

export default App;