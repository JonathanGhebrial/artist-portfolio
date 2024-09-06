const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Custom middleware to log requests
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

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
app.use(express.static(path.join(__dirname, 'client/dist')));

// Serve the uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Endpoint to handle file uploads at the /jessy route
app.post('/jessy', upload.single('file'), (req, res) => {
    console.log('File upload request received');
    const { page } = req.body; // Get the page to display the photo on
    if (!page) {
        console.error('No page specified in file upload');
        return res.status(400).send({ error: 'No page specified' });
    }
    const photoPath = req.file.filename;
    const photoData = { path: photoPath, page };
    fs.appendFileSync('photos.json', JSON.stringify(photoData) + '\n');
    res.send({ message: 'File uploaded successfully', photo: photoData });
});

// Endpoint to retrieve photos based on the page
app.get('/photos/:page', (req, res) => {
    console.log(`Fetching photos for page: ${req.params.page}`);
    const page = req.params.page;
    try {
        const photos = fs.readFileSync('photos.json', 'utf8')
            .split('\n')
            .filter(Boolean)
            .map(line => JSON.parse(line))
            .filter(photo => photo.page === page);
        res.json(photos.map(photo => photo.path));
    } catch (err) {
        console.error('Error fetching photos:', err);
        res.status(500).send({ error: 'Failed to fetch photos' });
    }
});

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Use environment variables
        pass: process.env.EMAIL_PASS,
    },
});

// Endpoint to handle contact form submissions
app.post('/send-email', (req, res) => {
    console.log('Contact form submission received');
    const { firstName, lastName, email, subject, message } = req.body;

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER, // Jessy's email
        subject: `Contact Form Submission: ${subject}`,
        text: `You have received a new message from ${firstName} ${lastName} (${email}):\n\n${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send({ error: 'Failed to send email' });
        }
        res.send({ message: 'Email sent successfully', info });
    });
});

// Handles any requests that don't match the API routes
app.get('*', (req, res) => {
    console.log(`Serving index.html for route: ${req.url}`);
    res.sendFile(path.join(__dirname, 'client/dist/index.html'), (err) => {
        if (err) {
            console.error('Error serving index.html:', err);
            res.status(500).send({ error: 'Failed to load the requested page' });
        }
    });
});

// Set up the port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});