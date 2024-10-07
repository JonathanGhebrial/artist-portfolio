import React, { useState, useEffect } from 'react';
import '../styles/UploadPage.css';

const UploadPage = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [vimeoLink, setVimeoLink] = useState('');
  const [additionalStills, setAdditionalStills] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetch('/photos/previous-work')
        .then((res) => res.json())
        .then((data) => setVideos(data))
        .catch((err) => console.error('Error fetching videos:', err));
    }
  }, [isAuthenticated]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    fetch('/jessy/password-check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.accessGranted) {
          setIsAuthenticated(true);
        } else {
          setErrorMessage('Incorrect password. Please try again.');
        }
      })
      .catch((err) => console.error('Error verifying password:', err));
  };

  const resetForm = () => {
    setTitle('');
    setThumbnail(null);
    setVimeoLink('');
    setAdditionalStills([]);
    setSelectedVideo(null);
  };

  const handleUpload = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('thumbnail', thumbnail);
    formData.append('vimeoLink', vimeoLink);
    for (let i = 0; i < additionalStills.length; i++) {
      formData.append('stills', additionalStills[i]);
    }

    const url = selectedVideo ? `/jessy/${selectedVideo.id}` : '/jessy';
    const method = selectedVideo ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (
          data.message === 'Upload successful!' ||
          data.message === 'Video updated successfully!'
        ) {
          setSuccessMessage(
            selectedVideo
              ? 'Update successful!'
              : 'New work added successfully!'
          );
          setVideos((prevVideos) =>
            selectedVideo
              ? prevVideos.map((vid) =>
                  vid.id === selectedVideo.id ? data.video : vid
                )
              : [...prevVideos, data.video]
          );
          resetForm(); // Reset form fields
        } else {
          setSuccessMessage('Update failed. Please try again.');
        }
      })
      .catch((err) => {
        console.error('Upload error:', err);
        setSuccessMessage('Update failed. Please try again.');
      });
  };

  const handleEdit = (video) => {
    setSelectedVideo(video);
    setTitle(video.title);
    setVimeoLink(video.vimeoLink);
  };

  const handleDeleteVideo = (videoId) => {
    fetch(`/jessy/${videoId}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => {
        setVideos((prevVideos) =>
          prevVideos.filter((vid) => vid.id !== videoId)
        );
        resetForm();
        setSuccessMessage('Video deleted successfully!');
      })
      .catch((err) => {
        console.error('Error deleting video:', err);
        setSuccessMessage('Failed to delete video. Please try again.');
      });
  };

  const handleDeleteStill = (videoId, still) => {
    fetch(`/jessy/${videoId}/stills/${still}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => {
        setVideos((prevVideos) =>
          prevVideos.map((vid) =>
            vid.id === videoId
              ? { ...vid, stills: vid.stills.filter((s) => s !== still) }
              : vid
          )
        );
        setSelectedVideo((prev) => ({
          ...prev,
          stills: prev.stills.filter((s) => s !== still),
        }));
        setSuccessMessage('Still deleted successfully!');
      })
      .catch((err) => {
        console.error('Error deleting still:', err);
        setSuccessMessage('Failed to delete still. Please try again.');
      });
  };

  if (!isAuthenticated) {
    return (
      <div className="password-protection">
        <h2>Please enter the password to manage previous work</h2>
        <form onSubmit={handlePasswordSubmit}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    );
  }

  return (
    <div className="upload-page">
      <h1>Manage Previous Work</h1>
      <div className="video-list">
        {videos.map((video) => (
          <div key={video.id} className="video-item">
            <h2>{video.title}</h2>
            <img
              src={`/uploads/${video.thumbnail}`}
              alt="Thumbnail"
              width="100"
            />
            <button onClick={() => handleEdit(video)}>Edit</button>
            <button onClick={() => handleDeleteVideo(video.id)}>
              Delete Group
            </button>
          </div>
        ))}
      </div>

      <h2>{selectedVideo ? 'Edit Work' : 'Add New Work'}</h2>
      <form onSubmit={handleUpload}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="thumbnail">Upload Thumbnail:</label>
        <input
          type="file"
          id="thumbnail"
          onChange={(e) => setThumbnail(e.target.files[0])}
          required={!selectedVideo} // Thumbnail required only for new uploads
        />

        <label htmlFor="vimeoLink">Vimeo Link:</label>
        <input
          type="text"
          id="vimeoLink"
          placeholder="Vimeo Link"
          value={vimeoLink}
          onChange={(e) => setVimeoLink(e.target.value)}
          required
        />

        <label htmlFor="stills">Upload Stills:</label>
        <input
          type="file"
          id="stills"
          onChange={(e) => setAdditionalStills(e.target.files)}
          multiple
        />

        {selectedVideo && (
          <>
            <h3>Existing Stills</h3>
            <div className="stills-list">
              {selectedVideo.stills.map((still, index) => (
                <div key={index} className="still-item">
                  <img
                    src={`/uploads/${still}`}
                    alt={`Still ${index + 1}`}
                    width="100"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteStill(selectedVideo.id, still)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        <button type="submit">{selectedVideo ? 'Update' : 'Add Work'}</button>
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default UploadPage;
