import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/PreviousWorkPage.css';

const PreviousWorkPage = () => {
  const [previousWorks, setPreviousWorks] = useState([]);

  useEffect(() => {
    fetch('/photos/previous-work')
      .then((res) => res.json())
      .then((data) => setPreviousWorks(data))
      .catch((err) => console.error('Error fetching works:', err));
  }, []);

  const createSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  return (
    <div className="previous-work-page">
      {previousWorks.map((work) => (
        <Link
          key={work.id}
          to={`/${createSlug(work.title)}`}
          className="previous-work-item"
        >
          <div className="work-image-container">
            <img
              src={`/uploads/${work.thumbnail}`}
              alt={work.title}
              className="work-still"
            />
            <div className="work-title">{work.title}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PreviousWorkPage;