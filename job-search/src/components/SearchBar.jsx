import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex justify-center mt-4">
      <input
        className="w-full max-w-md p-3 border border-gray-300 rounded"
        type="text"
        placeholder="Search for jobs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
