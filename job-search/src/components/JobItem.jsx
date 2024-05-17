import React from 'react';
import './JobItem.css';

const JobItem = ({ job }) => {
  return (
    <div className="job-item">
      <h2 className="job-title">{job}</h2>
    </div>
  );
};

export default JobItem;
