import React, { useState } from 'react';

const MarketPlace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex justify-center">
      <div className="w-full max-w-5xl">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">🌱 Aearthex Marketplace</h1>
          <p className="text-sm text-gray-500">Explore and support trusted carbon offset projects</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center mb-6">
          <input
            type="text"
            placeholder="🔍 Search for a project..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full sm:w-2/3 px-5 py-3 bg-white rounded-full text-sm shadow-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />

           <button
            onClick={toggleFilter}
            className="px-5 py-2 bg-green-100 text-green-700 text-sm rounded-full font-medium hover:bg-green-200 transition"
          >
            {filterOpen ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {filterOpen && (
          <div className="bg-white rounded-xl shadow-md px-6 py-5 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Category</label>
                <select className="w-full bg-gray-100 px-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="">All Categories</option>
                  <option value="energy">Energy</option>
                  <option value="reforestation">Reforestation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Place Name</label>
                <select className="w-full bg-gray-100 px-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="">All Places</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="gujarat">Gujarat</option>
                  <option value="amazon">Amazon Forest</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Vintage</label>
                <select className="w-full bg-gray-100 px-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="">Any Year</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {searchTerm && (
          <div className="text-sm text-gray-600 mb-2">
            Showing results for: <span className="font-medium text-gray-800">{searchTerm}</span>
          </div>
        )}

        <div className="text-center text-gray-400 text-sm mt-10">
          No projects to display.
        </div>
      </div>
    </div>
  );
};

export default MarketPlace;
