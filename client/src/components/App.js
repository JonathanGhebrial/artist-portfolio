import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import About from './About'; // Import the About component

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/about" element={<About />} />
          {/* Remove the Home route until you create a Home component */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;