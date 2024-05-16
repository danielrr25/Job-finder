// import React from 'react';
// import JobItem from './JobItem';

// const JobList = ({ jobs }) => {
//   return (
//     <div className="max-w-4xl mx-auto mt-6">
//       {jobs.length > 0 ? (
//         jobs.map((job) => <JobItem key={job.id} job={job} />)
//       ) : (
//         <p className="text-center text-gray-500">No jobs found.</p>
//       )}
//     </div>
//   );
// };

// export default JobList;
import React from 'react';

const JobList = ({ jobs }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Job Listings</h2>
      <ul>
        {jobs.map((job, index) => (
          <li key={index} className="bg-white p-4 mb-2 shadow-md rounded">
            {job}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;
