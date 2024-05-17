import React, { useState, useEffect } from 'react';
import './index.css';
import Header from './components/Header';
import Hero from './components/Hero';
import JobList from './components/JobList';
import SearchBar from './components/SearchBar';
import axios from 'axios';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobList, setJobList] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5001/scrape-jobs');
        console.log(response.data);
        setJobList(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobList.filter((job) =>
    job.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header />
      <Hero />
      <div className="bg-white w-full py-4 shadow-md relative z-10">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
        <JobList jobs={filteredJobs} />
      </div>
    </div>
  );
};

export default App;
