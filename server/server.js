const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Set up storage for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Use the original file name with a timestamp
    }
});

const upload = multer({ storage: storage });

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Serve the uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Endpoint to handle file uploads at the /jessy route
app.post('/jessy', upload.single('file'), (req, res) => {
    const { page } = req.body; // Get the page to display the photo on
    if (!page) {
        return res.status(400).send({ error: 'No page specified' });
    }
    const photoPath = req.file.filename;
    const photoData = { path: photoPath, page };
    fs.appendFileSync('photos.json', JSON.stringify(photoData) + '\n');
    res.send({ message: 'File uploaded successfully', photo: photoData });
});

// Endpoint to retrieve photos based on the page
app.get('/photos/:page', (req, res) => {
    const page = req.params.page;
    const photos = fs.readFileSync('photos.json', 'utf8')
        .split('\n')
        .filter(Boolean)
        .map(line => JSON.parse(line))
        .filter(photo => photo.page === page);
    res.json(photos.map(photo => photo.path));
});

// Handles any requests that don't match the API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});