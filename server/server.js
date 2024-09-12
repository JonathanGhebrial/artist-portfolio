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
        cb(null, 'uploads/'); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Use the original file name with a timestamp
    }
});

const upload = multer({ storage: storage });

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../client/dist')));

// Serve the uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Endpoint to handle file uploads at the /jessy route
app.post('/jessy', upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'stills', maxCount: 10 }
]), (req, res) => {
    const { title, vimeoLink } = req.body;
    const thumbnail = req.files['thumbnail'] ? req.files['thumbnail'][0].filename : null;
    const stills = req.files['stills'] ? req.files['stills'].map(file => file.filename) : [];

    if (!title || !vimeoLink || !thumbnail) {
        return res.status(400).send({ error: 'Title, Vimeo Link, and Thumbnail are required.' });
    }

    const newWork = {
        id: Date.now(),
        title,
        vimeoLink,
        thumbnail,
        stills
    };

    // Save to JSON file
    let previousWorks = [];
    if (fs.existsSync('previousWorks.json')) {
        previousWorks = JSON.parse(fs.readFileSync('previousWorks.json', 'utf8'));
    }
    previousWorks.push(newWork);
    fs.writeFileSync('previousWorks.json', JSON.stringify(previousWorks, null, 2));

    res.send({ message: 'Upload successful!', work: newWork });
});

// Endpoint to retrieve previous works
app.get('/photos/previous-work', (req, res) => {
    if (fs.existsSync('previousWorks.json')) {
        const previousWorks = JSON.parse(fs.readFileSync('previousWorks.json', 'utf8'));
        return res.json(previousWorks);
    } else {
        return res.json([]);
    }
});

// Endpoint to handle deletions
app.delete('/jessy/:id', (req, res) => {
    const { id } = req.params;

    if (fs.existsSync('previousWorks.json')) {
        let previousWorks = JSON.parse(fs.readFileSync('previousWorks.json', 'utf8'));
        previousWorks = previousWorks.filter(work => work.id != id);

        fs.writeFileSync('previousWorks.json', JSON.stringify(previousWorks, null, 2));

        return res.send({ message: 'Deletion successful!' });
    } else {
        return res.status(404).send({ error: 'Work not found.' });
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