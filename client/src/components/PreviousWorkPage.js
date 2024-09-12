import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/PreviousWorkPage.css';

const PreviousWorkPage = () => {
    const [previousWorks, setPreviousWorks] = useState([]);

    useEffect(() => {
        // Fetch works from the server
        fetch('/photos/previous-work')
            .then(res => res.json())
            .then(data => setPreviousWorks(data))
            .catch(err => console.error('Error fetching works:', err));
    }, []);

    return (
        <div className="previous-work-page">
            {previousWorks.map(work => (
                <Link key={work.id} to={`/work/${work.id}`} className="previous-work-item">
                    <img src={`/uploads/${work.path}`} alt={work.title} className="work-still" />
                    <div className="work-title">{work.title}</div>
                </Link>
            ))}
        </div>
    );
};

export default PreviousWorkPage;