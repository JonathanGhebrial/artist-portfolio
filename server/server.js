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

// Middleware to log every request
app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
});

// Set up storage for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('Saving file to uploads directory');
        cb(null, 'uploads/'); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
        const filename = `${Date.now()}-${file.originalname}`;
        console.log(`Saving file with name: ${filename}`);
        cb(null, filename); // Use the original file name with a timestamp
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        console.log(`Processing file: ${file.fieldname}`);
        cb(null, true);
    }
});

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../client/dist')));

// Serve the uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const videosFilePath = path.join(__dirname, 'videos.json');

// Endpoint to handle file uploads at the /jessy route
app.post('/jessy', upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'stills', maxCount: 10 }
]), (req, res) => {
    try {
        console.log('Upload request received.');
        console.log('Request body:', req.body);
        console.log('Files:', req.files);

        const { title, vimeoLink } = req.body;
        const thumbnail = req.files['thumbnail'] ? req.files['thumbnail'][0] : null;
        const stills = req.files['stills'] || [];

        if (!thumbnail) {
            console.error('No thumbnail provided');
            return res.status(400).json({ error: 'Thumbnail is required.' });
        }

        const newVideo = {
            id: Date.now(),
            title,
            thumbnail: thumbnail.filename,
            vimeoLink,
            stills: stills.map(file => file.filename)
        };

        let videos = [];
        if (fs.existsSync(videosFilePath)) {
            videos = JSON.parse(fs.readFileSync(videosFilePath, 'utf8'));
        }
        videos.push(newVideo);
        fs.writeFileSync(videosFilePath, JSON.stringify(videos, null, 2));

        console.log('New video data saved:', newVideo);
        res.json({ message: 'Upload successful!', video: newVideo });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).send('Upload failed. Please try again.');
    }
});

// Endpoint to delete a video
app.delete('/jessy/:id', (req, res) => {
    try {
        const videoId = parseInt(req.params.id);
        let videos = JSON.parse(fs.readFileSync(videosFilePath, 'utf8'));

        videos = videos.filter(video => video.id !== videoId);
        fs.writeFileSync(videosFilePath, JSON.stringify(videos, null, 2));

        res.json({ message: 'Video deleted successfully!' });
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).send('Delete failed. Please try again.');
    }
});

// Endpoint to retrieve videos based on the page
app.get('/photos/previous-work', (req, res) => {
    try {
        if (!fs.existsSync(videosFilePath)) {
            fs.writeFileSync(videosFilePath, JSON.stringify([]));
        }
        const videos = JSON.parse(fs.readFileSync(videosFilePath, 'utf8'));
        res.json(videos);
    } catch (err) {
        console.error('Error reading videos.json:', err);
        res.status(500).send('Server Error');
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
    const filePath = path.join(__dirname, '../client/dist/index.html');
    console.log(`Serving file from: ${filePath}`);
    
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error serving index.html:', err);
            res.status(500).send('An error occurred while serving the requested page.');
        }
    });
});

// Set up the port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});