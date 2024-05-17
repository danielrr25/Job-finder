import React from 'react';
import JobItem from './JobItem';
import './JobList.css';

const JobList = ({ jobs }) => {
  return (
    <div className="job-list">
      {jobs.length > 0 ? (
        jobs.map((job, index) => <JobItem key={index} job={job} />)
      ) : (
        <p>No jobs found.</p>
      )}
    </div>
  );
};

export default JobList;
