import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import About from './About';
import HomePage from './HomePage';
import UploadPage from './UploadPage';
import PreviousWorkPage from './PreviousWorkPage';
import CVPage from './CVPage'; // Import the CVPage component

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<About />} />
                <Route path="/jessy" element={<UploadPage />} />
                <Route path="/previous-work" element={<PreviousWorkPage />} />
                <Route path="/cv" element={<CVPage />} /> {/* Add the CV page route */}
            </Routes>
        </Router>
    );
}

export default App;