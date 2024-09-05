const express = require('express');
const path = require('path');
const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// API endpoints can go here

// Handles any requests that don't match the API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 3000;  // Changed port to 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});