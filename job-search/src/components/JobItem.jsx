import React from 'react';

const JobItem = ({ job }) => {
  return (
    <div className="flex justify-between items-center border-b py-4 px-6 bg-white shadow-md rounded-lg mb-4">
      <div>
        <h2 className="text-xl text-blue-600">{job.title}</h2>
        <p>{job.company}</p>
        <p>{job.location}</p>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Apply</button>
    </div>
  );
};

export default JobItem;
