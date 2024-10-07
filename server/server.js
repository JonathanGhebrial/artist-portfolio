const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config(); 

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Middleware to log every request
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

// Password check middleware
app.post('/jessy/password-check', (req, res) => {
    const { password } = req.body;
    if (password === process.env.JESSY_PASSWORD) {
        return res.json({ accessGranted: true });
    } else {
        return res.status(401).json({ accessGranted: false, message: 'Incorrect password' });
    }
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
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log(`Processing file: ${file.fieldname}`);
    cb(null, true);
  },
});


app.use(express.static(path.join(__dirname, '../client/dist')));

// Serve the uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const videosFilePath = path.join(__dirname, 'videos.json');

// Endpoint to handle new work uploads
app.post(
  '/jessy',
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'stills', maxCount: 10 },
  ]),
  (req, res) => {
    try {
      console.log('Upload request received.');
      const { title, vimeoLink } = req.body;
      const thumbnail = req.files['thumbnail']
        ? req.files['thumbnail'][0]
        : null;
      const stills = req.files['stills'] || [];

      if (!thumbnail) {
        return res.status(400).json({ error: 'Thumbnail is required.' });
      }

      const newVideo = {
        id: Date.now(),
        title,
        thumbnail: thumbnail.filename,
        vimeoLink,
        stills: stills.map((file) => file.filename),
      };

      let videos = [];
      if (fs.existsSync(videosFilePath)) {
        videos = JSON.parse(fs.readFileSync(videosFilePath, 'utf8'));
      }
      videos.push(newVideo);
      fs.writeFileSync(videosFilePath, JSON.stringify(videos, null, 2));

      res.json({ message: 'Upload successful!', video: newVideo });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).send('Upload failed. Please try again.');
    }
  }
);

// Endpoint to update an existing video
app.put(
  '/jessy/:id',
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'stills', maxCount: 10 },
  ]),
  (req, res) => {
    try {
      const videoId = parseInt(req.params.id);
      let videos = JSON.parse(fs.readFileSync(videosFilePath, 'utf8'));
      const videoIndex = videos.findIndex((video) => video.id === videoId);

      if (videoIndex === -1) {
        return res.status(404).json({ message: 'Video not found.' });
      }

      const { title, vimeoLink } = req.body;
      const thumbnail = req.files['thumbnail']
        ? req.files['thumbnail'][0]
        : null;
      const stills = req.files['stills'] || [];

      if (title) videos[videoIndex].title = title;
      if (vimeoLink) videos[videoIndex].vimeoLink = vimeoLink;
      if (thumbnail) videos[videoIndex].thumbnail = thumbnail.filename;
      if (stills.length > 0) {
        videos[videoIndex].stills.push(...stills.map((file) => file.filename));
      }

      fs.writeFileSync(videosFilePath, JSON.stringify(videos, null, 2));

      res.json({
        message: 'Video updated successfully!',
        video: videos[videoIndex],
      });
    } catch (error) {
      console.error('Update error:', error);
      res.status(500).send('Update failed. Please try again.');
    }
  }
);

// Endpoint to delete a still from a video
app.delete('/jessy/:id/stills/:still', (req, res) => {
  try {
    const videoId = parseInt(req.params.id);
    const stillToDelete = req.params.still;

    let videos = JSON.parse(fs.readFileSync(videosFilePath, 'utf8'));
    const video = videos.find((v) => v.id === videoId);

    if (!video) {
      return res.status(404).json({ message: 'Video not found.' });
    }

    video.stills = video.stills.filter((still) => still !== stillToDelete);
    fs.writeFileSync(videosFilePath, JSON.stringify(videos, null, 2));

    res.json({ message: 'Still deleted successfully!' });
  } catch (error) {
    console.error('Error deleting still:', error);
    res.status(500).send('Delete still failed. Please try again.');
  }
});

// Endpoint to delete a video
app.delete('/jessy/:id', (req, res) => {
  try {
    const videoId = parseInt(req.params.id);
    let videos = JSON.parse(fs.readFileSync(videosFilePath, 'utf8'));

    videos = videos.filter((video) => video.id !== videoId);
    fs.writeFileSync(videosFilePath, JSON.stringify(videos, null, 2));

    res.json({ message: 'Video deleted successfully!' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).send('Delete failed. Please try again.');
  }
});

// Endpoint to retrieve all videos
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

// Nodemailer setup (for contact form)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS,
  },
});

// Endpoint to handle contact form submissions
app.post('/send-email', (req, res) => {
  const { firstName, lastName, email, subject, message } = req.body;

  console.log('Email request received:');
  console.log('From:', email);
  console.log('To:', process.env.EMAIL_USER);
  console.log('Subject:', subject);
  console.log('Message:', message);

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER, 
    subject: `Contact Form Submission: ${subject}`,
    text: `You have received a new message from ${firstName} ${lastName} (${email}):\n\n${message}`,
  };

  // Sending the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res
        .status(500)
        .send({ message: 'Failed to send email. Please try again later.' });
    }

    console.log('Email sent successfully:', info.response);
    res.send({ message: 'Email sent successfully' });
  });
});


app.get('*', (req, res) => {
  const filePath = path.join(__dirname, '../client/dist/index.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Error serving index.html:', err);
      res
        .status(500)
        .send('An error occurred while serving the requested page.');
    }
  });
});

// Set up the port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});